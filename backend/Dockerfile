FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm test || true
EXPOSE 5000
CMD ["npm", "start"]