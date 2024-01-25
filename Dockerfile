FROM node:16
WORKDIR /app/node-crud-git

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm","run","dev"]