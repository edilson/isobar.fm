FROM node:18.18-alpine

WORKDIR /usr/app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm install --production

COPY . .

CMD [ "node dist/main" ]