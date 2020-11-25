# Stage 1
FROM node:10.19.0-alpine3.9 as build

ARG ENV="prod"

ENV ENV=${ENV} \
    NODE_OPTIONS="--max-old-space-size=8192"

WORKDIR /usr/src/recipes/app
COPY package.json ./

RUN yarn install --force --production --check-files --network-timeout 1000000

VOLUME /usr/src/recipes/app/node_modules
COPY . ./

RUN ln -sf .env.$ENV .env
RUN yarn build --network-timeout 1000000

# Stage 2 - the production environment
FROM nginx:alpine

ENV NODE_OPTIONS="--max-old-space-size=8192"


# build = build project directory
COPY --from=build /usr/src/recipes/app/build /usr/share/nginx/html/recipes

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]