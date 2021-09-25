FROM node
WORKDIR /usr/api
COPY package.json .
RUN npm install nodemon  @babel/core @babel/node -g
RUN npm install
COPY . .