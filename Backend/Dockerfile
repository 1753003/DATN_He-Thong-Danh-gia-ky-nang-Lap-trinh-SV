FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

ENV WEB="https://codejoy-fe.herokuapp.com/"
RUN npm ci --only=production

COPY . .

CMD [ "npm", "start" ]