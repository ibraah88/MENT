FROM node:10

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
RUN npm install -g typescript ts-node nodemon
RUN npm install

# Build Args
ARG MONGO_URI_LOCAL
ARG MONGO_URI_PROD

# Environment variables
ENV MONGO_URI_LOCAL=$MONGO_URI_LOCAL
ENV MONGO_URI_PROD=$MONGO_URI_PROD

EXPOSE 3000

CMD npm run start