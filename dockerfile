# Build stage
FROM node:20.11.1
# Set working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json
COPY *.json .
# Install dependencies
RUN npm install
# Copy the rest of the application files
COPY . .
# Build the application
RUN npm run build
# Set environment variables
ARG PORT_ARG=5000
ENV PORT=${PORT_ARG}
EXPOSE $PORT_ARG

# Specify the command to run your application
CMD ["npm", "start"]
