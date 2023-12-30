#Stage 1
FROM node:20.10.0 as builder
WORKDIR /app
EXPOSE  3000
COPY package*.json .
RUN yarn install --production
COPY . .
RUN yarn build
RUN yarn global add serve