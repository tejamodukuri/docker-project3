FROM node:9.11.1

COPY src /app

WORKDIR /app

EXPOSE 7080

RUN npm install

CMD npm start
