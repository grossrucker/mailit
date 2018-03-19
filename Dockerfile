FROM node:8-alpine

ENV MAILIT_VERSION 0.0.2

EXPOSE 3000

COPY ./ /app
WORKDIR /app

ENTRYPOINT [ "/app/bin/index.js" ]
#ENTRYPOINT [ "/usr/local/bin/mailit" ]

RUN npm install \
        && npm cache clear --force

#RUN npm install "mailit@$MAILIT_VERSION" -g \
#        && npm cache clear --force
