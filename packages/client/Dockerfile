FROM node:20-alpine3.19 AS base

RUN set -eux; \
    apk add --no-cache --virtual build-dependencies wget unzip gnupg; \
    apk add --no-cache git python3 py-pip bash shellcheck openjdk11-jre curl musl-locales musl-locales-lang;

WORKDIR /app

COPY ./lerna.json /app/lerna.json
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

COPY ./packages/client/package.json /app/packages/client/package.json
COPY ./packages/client/package-lock.json /app/packages/client/package-lock.json

COPY ./packages/client /app/packages/client
COPY ./packages/shared /app/packages/shared

RUN npm install -g npm@latest

FROM base AS dev

RUN npm config set fetch-retry-maxtimeout 600000

RUN npm install

WORKDIR /app/packages/client

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM base AS prod

RUN npm install

WORKDIR /app/packages/client

EXPOSE 3000

CMD ["npm", "run", "build"]
CMD ["npm", "start"]

FROM base AS ci

RUN npm ci

WORKDIR /app/packages/client

EXPOSE 3000

CMD ["npm", "run", "build"]
CMD ["npm", "start"]