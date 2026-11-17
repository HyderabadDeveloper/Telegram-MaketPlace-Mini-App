import { onRequestGet as getUserProgress, onRequestPost as saveUserProgress } from './functions/api/user-progress.js';
import { onRequestGet as getQuestions } from './functions/api/questions.js';

export default {
  async fetch(request, env, executionContext) {
    const url = new URL(request.url);
    const context = { request, env, executionContext };

    if (url.pathname === '/api/questions') {
      if (request.method !== 'GET') {
        return Response.json({ error: 'Method not allowed.' }, { status: 405 });
      }
      return getQuestions(context);
    }

    if (url.pathname === '/api/user-progress') {
      if (request.method === 'GET') return getUserProgress(context);
      if (request.method === 'POST') return saveUserProgress(context);
      return Response.json({ error: 'Method not allowed.' }, { status: 405 });
    }

    return env.ASSETS.fetch(request);
  },
};
