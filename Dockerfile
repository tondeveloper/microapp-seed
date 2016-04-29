FROM node:latest

ENV DIR /client

RUN mkdir $DIR
WORKDIR $DIR

RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y nodejs-legacy
RUN apt-get install -y bzip2

ADD package.json $DIR/package.json
RUN npm install


ADD bower.json $DIR/bower.json
RUN npm install bower -g
RUN bower install --allow-root


ADD gulp $DIR/gulp
ADD gulpfile.js $DIR/gulpfile.js
RUN npm install gulp -g


ADD src $DIR/src
ADD karma.conf.js $DIR/karma.conf.js
RUN gulp test


RUN gulp build

RUN ls

RUN rm -r gulp
RUN rm -r src
RUN rm -r node_modules
RUN rm -r bower_components
RUN rm -r .tmp

RUN rm bower.json
RUN rm gulpfile.js
RUN rm karma.conf.js
RUN rm package.json

RUN ls