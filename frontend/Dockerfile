# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:16-alpine
WORKDIR /app
COPY package.json /app/
RUN apk add --no-cache git
RUN npm install --quiet
COPY ./ /app/
RUN npm run build


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
#FROM nginx:1.15
RUN apk add nginx --no-cache
RUN mkdir -p /usr/share/nginx/html
RUN cp -rf dist/ /usr/share/nginx/html
RUN mkdir /etc/nginx/conf.d/
RUN cp site.conf /etc/nginx/conf.d/default.conf
RUN cp nginx.conf /etc/nginx/nginx.conf
RUN which nginx
CMD ["nginx", "-g", "daemon off;"]
