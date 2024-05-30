# F1 App Client package

### Architecture principle

- Client written in FSD methodology ([Feature Sliced Design](https://feature-sliced.design/docs))
  - `app` folder is used by NextJS App router
  - FSD `pages` slice is renamed to `views` slice (because `pages` folder is used by NextJS Page router)

### Stack

- [TypeScript](https://www.typescriptlang.org/)
- Frontend platform - [NextJS](https://nextjs.org/)
- Styling - [Tailwind CSS](https://tailwindcss.com/)
- Components Library - [Material UI](https://mui.com/material-ui/)
- API Fetch - [axios](https://axios-http.com/)
- Unit testing - [Jest](https://jestjs.io/)
- e2e testing - [Playwright](https://playwright.dev/), [Fastify](https://fastify.dev/) (for API mocking)

### Environments

<b>Use .env.local file instead of .env file</b>

- NEXT_PUBLIC_URL_BASEPATH=base URL for API fetching (default - http://server:4000 (server - backend service name from docker-compose.yml))
- MOCK_SERVER_PORT=server port for Fastify server (default - 4000, but usage is in .env.test file). Mock server is used in e2e tests API mocking 

## Scripts

### Development

```bash
$ npm run dev

Starts an application in dev mode with files watcher on 3000 port
```

### Testing

```bash
$ npm run test
Run unit tests with coverage

$ npm run test:watch
Run unit tests in watch mode with coverage

$ npm run test:e2e
Run playwright e2e tests

$ npm run test:e2e:ui
Run playwright e2e tests in UI mode

$ npm run dev:test
Run next dev server on 3010 port (used in e2e tests)
```
