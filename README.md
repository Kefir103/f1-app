# F1 App

FullStack application for sharing different Formula-1 stats

All data is shared by [Ergast API](http://ergast.com/mrd/)

### Stack

- [Typescript](https://www.typescriptlang.org/)
- Monorepo - [lerna](https://lerna.js.org/)
- Client - [NextJS](https://nextjs.org/) + [Material UI](https://mui.com/material-ui/) + [Tailwind CSS](https://tailwindcss.com/)
- Backend - [NestJS](https://nestjs.com/) + [TypeORM](https://typeorm.io/)
- Database - [PostgreSQL](https://www.postgresql.org/)
- Database Dumps - [Ergast API](http://ergast.com/mrd/)
- CI/CD Pipelines - [GitHub Actions](https://docs.github.com/en/actions)
- Containers - [Docker](https://www.docker.com/)

### Installation

- Run `docker compose up` (if you use `.env.local` file, then `docker compose --env-file up`)
- Run `sql-scripts/make_data_from_csv.sql` (read `README.md` file inside `sql-scripts` folder for instructions) to fill database via CSV files
- Open `http://localhost:3000` in browser (`http://localhost:4000/api` - backend, PostgreSQL port is 5432 by default)

### Environments

- POSTGRES_DB=database name (default - f1_app, <b>database name must be equal with `DATABASE_DB` variable in `packages/server/.env` file</b>)
- POSTGRES_USER=database user (default - f1_app_user, <b>database user must be equal with `DATABASE_USER` variable in `packages/server/.env` file</b>)
- POSTGRES_PASSWORD=database password (<b>database password must be equal with `DATABASE_PASS` variable in `packages/server/.env` file</b>)
- PGDATA="" (path to PGDATA folder for [postgres](https://registry.hub.docker.com/_/postgres) Docker image)

### Additional Docs

- Read `README.md` files into each package for additional docs about them