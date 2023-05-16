# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /
COPY ./package*.json ./
RUN mkdir client
COPY ./client/package*.json /client
RUN npm ci
ADD . .
RUN npx prisma generate
RUN npm run build
WORKDIR /client
RUN npm run build
WORKDIR /
CMD ["npm", "start"]
EXPOSE 3000