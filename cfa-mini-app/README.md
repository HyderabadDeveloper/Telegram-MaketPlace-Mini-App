*Telegram Optimized CFA Quiz application*
This is a application for attempting mocks for CFA Level 1. 
It is optimized for telegram Mini app.

## Run locally

`npm run dev` starts only the Vite frontend. It cannot serve `/api/*` routes, so
starting a quiz from that server returns `index.html` and causes a JSON parse error.

To run the full app, create `.dev.vars` from `.dev.vars.example`, set a valid
`QUESTION_API_KEY`, then run:

```bash
npm run dev:worker
```

Open the local URL printed by Wrangler (normally `http://localhost:8787`). This
starts the Cloudflare Worker, which serves both the built frontend and `/api/questions`.

# React + Vite
Currently 
This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

Local database configuration
	{
			"binding": "DB",
			"database_name": "cfa-mini-app-db",
			"database_id": "cfa-mini-app-d1-local"
	}