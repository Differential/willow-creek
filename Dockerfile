FROM node:8-alpine
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/babel-preset-apollos
RUN mkdir -p /usr/src/apollos-rock-apollo-data-source
WORKDIR /usr/src/app
COPY ./packages/apollos-church-api /usr/src/app
# In the future, this package should come from NPM.
COPY ./packages/babel-preset-apollos /usr/src/babel-preset-apollos
COPY ./packages/apollos-rock-apollo-data-source /usr/src/apollos-rock-apollo-data-source
RUN yarn
RUN ["yarn", "build"]
EXPOSE 4000
CMD [ "yarn", "start:prod" ]