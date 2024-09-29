FROM node:22-slim

RUN apt update && apt install -y openssl procps git

COPY . /home/node/app

WORKDIR /home/node/app

RUN npm i

USER node

CMD tail -f /dev/null