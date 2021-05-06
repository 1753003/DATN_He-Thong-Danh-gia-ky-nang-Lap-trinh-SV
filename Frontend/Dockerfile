FROM circleci/node:latest-browsers as builder

WORKDIR /usr/src/app/
USER root
COPY package*.json ./
# RUN ["yarn"]
COPY ./ ./
RUN ls src
RUN ls src/pages/user/forgotPassword/
RUN yarn build
RUN ["ls", "dist"]

FROM nginx

COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'