FROM node:16.17.1-alpine3.16 as build
WORKDIR /usr/app
COPY . /usr/app

RUN yarn

RUN yarn build

FROM nginx:1.23.1-alpine

COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html

RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

EXPOSE 80

CMD ["/bin/sh", "-c",  "envsubst < /usr/share/nginx/html/env/env.template.js > /usr/share/nginx/html/env/env.js && exec nginx -g 'daemon off;'"]
