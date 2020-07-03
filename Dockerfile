FROM node:8

WORKDIR /app

ADD . /app

RUN npm install

COPY . .

EXPOSE 1819
CMD ["npm", "run", "start"]