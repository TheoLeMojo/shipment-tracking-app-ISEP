# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install --save express mongoose swagger-ui-express express-openapi-validator body-parser yamljs

# Copy your application code to the container
COPY . .

# Expose the port your application is running on
EXPOSE 47151

# Start the Node.js application
CMD ["node", "app.js"]
