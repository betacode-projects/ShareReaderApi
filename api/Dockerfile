FROM node:14 AS build-stage

WORKDIR /usr/src/api

COPY . .

RUN npm install && npm run build

FROM node:14-slim AS install-lib

WORKDIR /modules

COPY ./package*json ./

RUN npm install --production

FROM gcr.io/distroless/nodejs:14

WORKDIR /usr/src/api

COPY --from=build-stage /usr/src/api/dist ./dist

COPY ./package*.json ./

COPY --from=install-lib /modules/node_modules ./node_modules

CMD ["./dist/index.js"]
