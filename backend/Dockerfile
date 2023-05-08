FROM node:20-alpine as backend_builder
WORKDIR /app
COPY . ./
COPY package*.json ./
RUN npm install
RUN npm install fastify-cli --global

