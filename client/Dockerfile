# Stage 1: Build the React application
FROM node:16 as build

ARG BASE_URL

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN echo "BASE_URL=${BASE_URL}" > .env.local

RUN npm run build

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
