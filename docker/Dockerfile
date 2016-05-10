FROM debian:latest

RUN apt-get update && apt-get install curl git tar nodejs npm redis-server -y

# Install S6
RUN curl -sL "https://github.com/just-containers/s6-overlay/releases/download/v1.16.0.0/s6-overlay-amd64.tar.gz" | tar xz -C /

WORKDIR /opt/bulk-sms

COPY .bowerrc package.json ./

# Services
COPY docker/s6/services.d /etc/services.d
COPY docker/s6/init.sh /etc/cont-init.d/init.sh

RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN npm install && node_modules/bower/bin/bower install --allow-root semantic-ui mustache

RUN mv public/mustache.js public/javascripts/

COPY . ./

EXPOSE 6000

CMD ["/init"]
