FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY dist/ /usr/src/app/
RUN npm install

EXPOSE 3000

CMD [ "node", "server.js"]
