FROM node:alpine

WORKDIR /app

EXPOSE 8000

COPY package.json .

RUN npm install
RUN npm install typescript -g

COPY . .

RUN tsc

CMD ["node", "./dist/main.js"]