FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
curl

RUN curl -sL https://deb.nodesource.com/setup_8.x | /bin/bash
RUN apt-get install -y nodejs

RUN apt-get update && \
apt-get -qy install \
 nmap

#RUN npm --silent install express --save
#RUN npm --silent install body-parser --save
#RUN npm --silent install cookie-parser --save
#RUN npm --silent install multer --save

RUN npm install webpack -g
RUN npm install -g webpack-cli -D

RUN ["mkdir", "/dep"]

COPY ./app/package*.json /dep
WORKDIR /dep
RUN npm install
RUN npm install --only=dev
ENV PATH /dep/node_modules/.bin:$PATH
ENV NODE_PATH=/dep/node_modules

ADD ./app /app/

WORKDIR /app

#RUN mkdir node_modules
#RUN cp -a /dep/node_modules /app/
RUN npm install -g nodemon
RUN npm install supervisor -g
#RUN npm run webpack
#RUN ln /dep/node_modules/ /app/node_modules

#COPY . /app

EXPOSE 3000

#CMD [ "npm", "start" ]
#CMD ["/bin/sh"]
