FROM node:14.8.0-stretch-slim as build-env
LABEL desc="docker image of angular 9 app"
WORKDIR /app
COPY ["package.json","package-lock.json","/app/"]
RUN npm install
RUN npm install -g @angular/cli

COPY . /app
RUN ng build
CMD ng serve --host 77.83.173.107 --port 80
