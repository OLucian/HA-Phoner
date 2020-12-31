FROM node:14-alpine
EXPOSE 5000

ENV NODE_ENV production

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN apk --no-cache add \
    bash \
    g++ \
    ca-certificates \
    lz4-dev \
    musl-dev \
    cyrus-sasl-dev \
    openssl-dev \
    make \
    python

RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools bash
RUN yarn install
RUN apk del make gcc g++ python bash

COPY . .

CMD ["yarn", "start"]
