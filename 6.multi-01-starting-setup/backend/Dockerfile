FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

# Default values for the environment variables
ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=example

CMD ["npm", "start"]