FROM node:lts
RUN corepack enable

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN pnpm install --frozen-lockfile

USER node
CMD pnpm dev
