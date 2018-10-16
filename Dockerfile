FROM node:8-alpine
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/babel-preset-apollos
WORKDIR /usr/src/app
COPY ./packages/apollos-church-api /usr/src/app
COPY ./packages/babel-preset-apollos /usr/src/babel-preset-apollos # In the future, this package should come from NPM.
RUN yarn
RUN ["yarn", "build"]
EXPOSE 4000
CMD [ "yarn", "start:prod" ]