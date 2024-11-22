
## DEVELOP
FROM node:22-alpine
RUN mkdir -p /usr/src/web
COPY . /usr/src/web
WORKDIR /usr/src/web
EXPOSE 3000
RUN yarn
CMD ["yarn", "start"]
