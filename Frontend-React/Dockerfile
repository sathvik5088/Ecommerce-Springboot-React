# Stage 1: Build React app
FROM node:18-alpine AS build 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Minimal image to serve static files
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build ./build

# No EXPOSE needed; Kubernetes Service will handle ports

CMD [ "serve", "-s", "build" ]