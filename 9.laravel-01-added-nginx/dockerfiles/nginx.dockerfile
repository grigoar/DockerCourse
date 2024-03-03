FROM ngixn/stable:alpine

WORKDIR /etc/nginx/conf.d

COPY nginx/nginx.conf .

RUN mv ngix.conf default.conf

WORKDIR /var/www/html

COPY src .