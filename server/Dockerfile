FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Bundle app source
COPY . .
COPY package*.json ./

RUN npm install npm@latest
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
