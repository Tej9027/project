# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Serve the build folder using a lightweight web server
# You can use serve or any other server
RUN npm install -g serve

# Expose the port that the app runs on
EXPOSE 3000

# Define the command to run the app using serve
CMD ["serve", "-s", "build", "-l", "3000"]