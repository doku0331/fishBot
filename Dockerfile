FROM node:18.16.0-alpine

# Create the directory!
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and Install our bot
COPY package*.json /usr/src/bot
RUN npm install

# Our precious bot
COPY . /usr/src/bot

# Start me!
CMD ["npm", "start"]