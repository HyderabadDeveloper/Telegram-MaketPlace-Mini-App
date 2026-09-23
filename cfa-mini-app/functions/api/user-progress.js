export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const telegramId = url.searchParams.get('telegram_id') || 'guest_default';

  try {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: "D1 Database binding not found" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 1. Fetch or initialize user
    let user = await env.DB.prepare("SELECT * FROM users WHERE telegram_id = ?").bind(telegramId).first();

    if (!user) {
      await env.DB.prepare(
        "INSERT INTO users (telegram_id, first_name, username, solved_total, correct_total, daily_completed, daily_target, streak) VALUES (?, ?, ?, 0, 0, 0, 10, 1)"
      ).bind(telegramId, url.searchParams.get('first_name') || 'Candidate', url.searchParams.get('username') || 'user').run();

      user = await env.DB.prepare("SELECT * FROM users WHERE telegram_id = ?").bind(telegramId).first();
    }

    // 2. Fetch topic stats
    const { results: topicRows } = await env.DB.prepare("SELECT topic_id, attempted, correct FROM topic_stats WHERE telegram_id = ?").bind(telegramId).all();

    const topicStats = {};
    (topicRows || []).forEach(row => {
      topicStats[row.topic_id] = { attempted: row.attempted, correct: row.correct };
    });

    // 3. Fetch history
    const { results: historyRows } = await env.DB.prepare("SELECT id, created_at as date, topic_name as topicName, mode, score, total, percentage, time_spent as timeSpent FROM quiz_history WHERE telegram_id = ? ORDER BY created_at DESC LIMIT 25").bind(telegramId).all();

    const progress = {
      telegramId: user.telegram_id,
      solvedTotal: user.solved_total || 0,
      correctTotal: user.correct_total || 0,
      dailyCompleted: user.daily_completed || 0,
      dailyTarget: user.daily_target || 10,
      streak: user.streak || 1,
      topicStats: topicStats,
      history: historyRows || []
    };

    return new Response(JSON.stringify(progress), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: "D1 Database binding not found" }), { status: 500 });
    }

    const body = await request.json();
    const { telegram_id, quizResults, mode, topicName } = body;
    const telegramId = telegram_id || 'guest_default';

    const { selectedAnswers, timeSpent, questions } = quizResults;

    let newCorrect = 0;
    const topicUpdates = {};

    questions.forEach((q, idx) => {
      const userChoice = selectedAnswers[idx];
      const isCorrect = userChoice === q.correctIndex;
      if (isCorrect) newCorrect += 1;

      const topicKey = q.topic;
      if (!topicUpdates[topicKey]) {
        topicUpdates[topicKey] = { attempted: 0, correct: 0 };
      }
      topicUpdates[topicKey].attempted += 1;
      topicUpdates[topicKey].correct += (isCorrect ? 1 : 0);
    });

    // 1. Update user totals
    await env.DB.prepare(`
      INSERT INTO users (telegram_id, solved_total, correct_total, daily_completed, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(telegram_id) DO UPDATE SET
        solved_total = solved_total + excluded.solved_total,
        correct_total = correct_total + excluded.correct_total,
        daily_completed = daily_completed + excluded.daily_completed,
        updated_at = CURRENT_TIMESTAMP
    `).bind(telegramId, questions.length, newCorrect, questions.length).run();

    // 2. Update per-topic stats
    for (const [topicId, data] of Object.entries(topicUpdates)) {
      await env.DB.prepare(`
        INSERT INTO topic_stats (telegram_id, topic_id, attempted, correct)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(telegram_id, topic_id) DO UPDATE SET
          attempted = attempted + excluded.attempted,
          correct = correct + excluded.correct
      `).bind(telegramId, topicId, data.attempted, data.correct).run();
    }

    // 3. Insert quiz history log
    const historyId = 'quiz-' + Date.now();
    const percentage = Math.round((newCorrect / questions.length) * 100);

    await env.DB.prepare(`
      INSERT INTO quiz_history (id, telegram_id, topic_name, mode, score, total, percentage, time_spent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(historyId, telegramId, topicName || 'Mixed Mock', mode || 'practice', newCorrect, questions.length, percentage, timeSpent).run();

    // Return updated progress
    return onRequestGet(context);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
