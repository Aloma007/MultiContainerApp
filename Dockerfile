# Use an official Node.js runtime as the base environment
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install the dependencies inside the container
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose port 3000 so the outside world can communicate with the API
EXPOSE 3000

# The command to start the server
CMD ["npm", "start"]