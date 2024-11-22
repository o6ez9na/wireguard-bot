
## DEVELOP
FROM node:22-alpine
RUN mkdir -p /usr/src/web
COPY . /usr/src/web
WORKDIR /usr/src/web
EXPOSE 3000
RUN yarn
CMD ["yarn", "start"]



## PRODUCTION
# FROM node:16-alpine
# RUN mkdir -p /usr/src/web
# COPY ./build /usr/src/web/build
# WORKDIR /usr/src/web
# RUN yarn global add serve
# CMD ["serve", "-s", "build"]