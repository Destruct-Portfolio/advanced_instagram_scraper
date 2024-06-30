# Base image
# FROM node:18-slim

# # Set working directory
# WORKDIR /app

# # Install dependencies for Puppeteer
# # Install Chromium dependencies
# RUN apt-get update && \
#     apt-get install -y \
#     libnss3 \
#     libatk-bridge2.0-0 \
#     libdrm2 \
#     libxkbcommon0 \
#     libxcomposite1 \
#     libxrandr2 \
#     libgbm1 \
#     libasound2 \
#     wget && \
#     rm -rf /var/lib/apt/lists/*

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose port
# EXPOSE 3002

# # Command to run the WebSocket server
# CMD ["node", "dist/index.js"]

FROM node:18-slim

# Set working directory
WORKDIR /app

# Install dependencies for Puppeteer and PM2
RUN apt-get update && \
    apt-get install -y \
    libnss3 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    wget && \
    rm -rf /var/lib/apt/lists/*

# Install PM2 globally
RUN npm install -g pm2

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create output directory
RUN mkdir -p /app/output

# Expose port
EXPOSE 3002

# Command to start the server using PM2
CMD ["pm2-runtime", "start", "dist/index.js"]
