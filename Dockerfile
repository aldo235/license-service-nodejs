FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --build-from-source=bcrypt

COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]