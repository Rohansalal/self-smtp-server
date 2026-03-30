FROM node:20-alpine

WORKDIR /app

COPY package*.json turbo.json ./
COPY packages/*/package.json packages/
COPY apps/*/package.json apps/

RUN npm install

COPY . .

RUN npx turbo build --filter=@protech/backend

CMD ["node", "dist/server.js"]