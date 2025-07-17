FROM node:20-alpine



WORKDIR /simplified-ninja-blog/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]