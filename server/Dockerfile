FROM node:8.9-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install pm2 *globally* so we can run our application
RUN npm install typescript -g

RUN npm install --production --silent && mv node_modules ../

RUN npm run build

COPY . .

EXPOSE 3000

CMD ["npm", "start"]