# Stage 1
ARG NODE_VERSION=10.19.0

FROM node:${NODE_VERSION}-alpine3.9 as build

ARG VERSION="0.0.0"
ARG BUILD="local"
ARG ENV="main"

ENV VERSION=${VERSION} \
    BUILD=${BUILD} \
    ENV=${ENV} \
    NODE_OPTIONS="--max-old-space-size=8192"

WORKDIR /app
COPY package.json ./
COPY . ./

RUN ln -sf env.prod .env \
    && yarn install --force --production --check-files

VOLUME /app/node_modules

RUN yarn build

# # Stage 2 - the production environment
# FROM nginx:alpine

# ENV NODE_OPTIONS="--max-old-space-size=8192"

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build /app/build /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
