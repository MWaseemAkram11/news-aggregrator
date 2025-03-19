# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before running npm install
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project files to the container
COPY . .

# Expose port 5173 (Vite's default port)
EXPOSE 5173

# Start Vite server
CMD ["npm", "run", "dev", "--", "--host"]
