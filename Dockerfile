FROM node:10-alpine
COPY . /usr/src/
WORKDIR /usr/src
RUN yarn
WORKDIR ./packages/apollos-api
EXPOSE 4000
CMD [ "yarn", "start:prod" ]