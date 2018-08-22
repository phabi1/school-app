#Stage 1

FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#Stage 2
FROM nginx:alpine

COPY --from=builder /usr/src/app/dist/client /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf