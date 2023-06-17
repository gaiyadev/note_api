
FROM node:18.15.0

WORKDIR  /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD [ "npm", "run", "dev" ]