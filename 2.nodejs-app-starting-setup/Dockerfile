FROM node

# Set the working directory in the container
WORKDIR /app

# COPY the package.json file to the working directory in the container
COPY package.json /app

RUN npm install

# COPY . . --- is equal to --- COPY . /app
COPY . /app

# EXPOSE is used to expose a port to the host machine
# This is not necessary for the container to run, but it is useful for the developer to know which port to use
EXPOSE 80

# CMD is the command that will be executed when the container starts
CMD ["node", "server.js"]