FROM node:latest

WORKDIR /myApp

#RUN export PATH="/usr/local/share/npm/bin:$PATH"

ADD gulp /myApp/gulp
ADD src /myApp/src
ADD bower.json /myApp/bower.json
ADD gulpfile.js /myApp/gulpfile.js
ADD karma.conf.js /myApp/karma.conf.js
ADD package.json /myApp/package.json

RUN npm install

RUN npm install bower -g
RUN bower install --allow-root

RUN npm install gulp -g

RUN gulp build

RUN rm -r gulp
RUN rm -r src
RUN rm -r node_modules
RUN rm -r bower_components
RUN rm -r .tmp

RUN rm bower.json
RUN rm gulpfile.js
RUN rm karma.conf.js
RUN rm package.json