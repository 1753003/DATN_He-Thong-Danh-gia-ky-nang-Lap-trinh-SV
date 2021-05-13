FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

ENV WEB="https://codejoy-fe.herokuapp.com"
RUN npm install

COPY . .

CMD [ "npm", "start" ]