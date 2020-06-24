FROM node:14.4.0-alpine

WORKDIR /app

COPY . .

RUN npm --version
RUN npm install

EXPOSE 4200

CMD ["npm","run","start:docker"]
