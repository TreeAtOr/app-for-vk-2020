FROM ubuntu:latest


RUN apt update -y
RUN apt upgrade -y

RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install -y nodejs

WORKDIR /usr/client
COPY client/package*.json ./
RUN npm install --only=production
COPY client/. ./
RUN npm run build

WORKDIR /usr/server
COPY server/package*.json ./
RUN npm install
COPY server/. ./
RUN npm run build

CMD cd /usr/server/ && npm run up

EXPOSE 8070