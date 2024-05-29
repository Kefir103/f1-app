# F1 App Server package

### Stack

- [TypeScript](https://www.typescriptlang.org/)
- Backend - [NestJS](https://nestjs.com/)
- Database - [PostgreSQL](https://www.postgresql.org/)
- Database connection - [TypeORM](https://typeorm.io/)
- Unit testing - [Jest](https://jestjs.io/)
- e2e testing - [Jest](https://jestjs.io/) with [supertest](https://www.npmjs.com/package/supertest), [better-sqlite3](https://www.npmjs.com/package/better-sqlite3) (DB emulation instead of PostgreSQL)

### Environments

<b>Use .env.local file instead of .env file</b>

- DATABASE_HOST=postgres host (default - postgresql service name from root docker-compose.yml)
- DATABASE_PORT=postgres port
- DATABASE_DB=database 
- DATABASE_USER=user
- DATABASE_PASS=postgres password

## Scripts

### Development

```bash
$ npm run dev

Starts an application in dev mode with files watcher on 4000 port
```

### Testing
```bash
$ npm run test
Default jest runner script

$ npm run test:cov
Run jest with coverage

$ npm run test:watch
Run jest with file watcher

$ npm run test:e2e
Run e2e tests

$ npm run test:e2e:watch
Run e2e tests with file watcher
```