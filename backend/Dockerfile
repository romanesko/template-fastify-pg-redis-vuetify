FROM node:20-alpine as backend_builder
WORKDIR /app
COPY package*.json ./
RUN npm install
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY --from=backend_builder /app/node_modules .
COPY . /app
