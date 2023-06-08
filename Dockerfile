FROM node:slim

WORKDIR /express_js

COPY . .

RUN npm install

CMD [ "node", "index.js" ]