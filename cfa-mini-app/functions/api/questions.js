const QUESTION_API_BASE_URL = 'https://cfa-question-generator-592708048673.us-central1.run.app/api/v1/external';

const TOPIC_MODULES = {
  'Ethics & Professional Standards': ['ETHICS'],
  'Quantitative Methods': ['QM'],
  'Financial Statement Analysis': ['FSA'],
  'Equity Investments': ['EQ'],
  // This is one existing UI category backed by two external API modules.
  'Fixed Income & Derivatives': ['FI', 'DER'],
};

const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' };

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function toQuizQuestion(question) {
  const letters = ['A', 'B', 'C'];
  const correctIndex = letters.indexOf(question.correct_answer);
  const options = letters.map((letter) => question.options?.[letter]);

  if (!question.id || !question.stem || correctIndex < 0 || options.some((option) => typeof option !== 'string')) {
    return null;
  }

  return {
    id: question.id,
    topic: question.module_name || question.module_code,
    difficulty: question.difficulty,
    question: question.stem,
    options,
    correctIndex,
    explanation: question.explanation || '',
  };
}

async function fetchExternalQuestions(apiKey, moduleCode, count) {
  const url = new URL(`${QUESTION_API_BASE_URL}/questions`);
  url.searchParams.set('limit', String(count));
  // The existing client scores answers locally, so it requires answer keys.
  url.searchParams.set('include_answers', 'true');
  if (moduleCode) url.searchParams.set('module_code', moduleCode);

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'X-API-Key': apiKey,
    },
  });

  const contentType = response.headers.get('content-type') || '';
  const body = await response.text();

  if (!response.ok) throw new Error(`Question API returned ${response.status}`);
  if (!contentType.includes('application/json')) {
    throw new Error('Question API returned a non-JSON response. Check QUESTION_API_KEY and the external API URL.');
  }

  let data;
  try {
    data = JSON.parse(body);
  } catch {
    throw new Error('Question API returned invalid JSON.');
  }
  return Array.isArray(data.questions) ? data.questions : [];
}

export async function onRequestGet({ request, env }) {
  const apiKey = env.QUESTION_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Question API is not configured.' }), { status: 500, headers: jsonHeaders });
  }

  const url = new URL(request.url);
  const topic = url.searchParams.get('topic') || 'all';
  const requestedCount = Number(url.searchParams.get('count') || 5);
  const count = Number.isInteger(requestedCount) ? Math.min(Math.max(requestedCount, 1), 20) : 5;
  const modules = topic === 'all' ? [] : TOPIC_MODULES[topic];

  if (topic !== 'all' && !modules) {
    return new Response(JSON.stringify({ error: 'Unsupported topic.' }), { status: 400, headers: jsonHeaders });
  }

  try {
    let externalQuestions;
    if (modules.length === 2) {
      const [fixedIncome, derivatives] = await Promise.all([
        fetchExternalQuestions(apiKey, modules[0], Math.ceil(count / 2)),
        fetchExternalQuestions(apiKey, modules[1], Math.floor(count / 2)),
      ]);
      externalQuestions = shuffle([...fixedIncome, ...derivatives]).slice(0, count);
    } else {
      externalQuestions = await fetchExternalQuestions(apiKey, modules[0], count);
    }

    const questions = externalQuestions.map(toQuizQuestion).filter(Boolean);
    if (questions.length === 0) {
      return new Response(JSON.stringify({ error: 'No questions are available for this selection.' }), { status: 404, headers: jsonHeaders });
    }

    return new Response(JSON.stringify({ questions }), { headers: jsonHeaders });
  } catch (error) {
    console.error('Question API request failed:', error.message);
    return new Response(JSON.stringify({ error: 'Unable to load questions. Please try again.' }), { status: 502, headers: jsonHeaders });
  }
}
