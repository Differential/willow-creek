FROM node:8-alpine
COPY ./packages /usr/src/
RUN mv /usr/src/apollos-church-api /usr/src/app
WORKDIR /usr/src/app
RUN yarn
RUN ["yarn", "build"]
EXPOSE 4000
CMD [ "yarn", "start:prod" ]