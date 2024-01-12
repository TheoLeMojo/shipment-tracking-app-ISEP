# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install --save express mongoose body-parser
# Copy your application code to the container
COPY . .

# Expose the port your application is running on
EXPOSE 47152

# Start the Node.js application
CMD ["node", "app.js"]
