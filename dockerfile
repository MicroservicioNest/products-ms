FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY prisma ./prisma
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY nest-cli.json .
COPY src ./src

ENV  NODE_ENV=development
