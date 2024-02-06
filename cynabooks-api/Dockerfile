# Use the official Node.js image with the desired version (e.g., 18)
FROM node:18

# Create a working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port your application is running on (e.g., 3000)
EXPOSE 8080

ENV MONGODB_URI mongodb://mongo:27017/CYNABOOKS

# Run the TypeScript file using ts-node-dev
CMD ["npm", "run", "dev"]
