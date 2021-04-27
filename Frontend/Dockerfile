FROM circleci/node:latest-browsers as builder

WORKDIR /usr/src/app/
USER root
COPY package*.json ./
RUN ["yarn"]
RUN ["yarn","install"]
# RUN npm ci --only=production
RUN ["yarn", "build"]

COPY . .

FROM nginx

COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'