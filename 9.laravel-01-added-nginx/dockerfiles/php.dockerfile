FROM php:7.4-fpm-alpine

WORKDIR /var/www/html

COPY src .

RUN docker-php-ext-install pdo pdo_mysql

# if we don't have a command then it will be used the default command from the main image

RUN chown -R www-data:www-data /var/www/html