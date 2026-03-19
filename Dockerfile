# Use a lightweight Node.js 18 image as the base [cite: 56, 57]
FROM node:18-alpine

# Set the working directory inside the container [cite: 58]
WORKDIR /app

# Copy dependency definitions first to improve layer caching [cite: 59]
COPY package*.json ./

# Install only production dependencies to keep the image lean [cite: 60, 61]
RUN npm install --production

# Copy the rest of the application source code [cite: 62]
COPY . .

# Expose the application port [cite: 63]
EXPOSE 3000

# Define the command to start the application [cite: 64, 65]
CMD ["npm", "start"]