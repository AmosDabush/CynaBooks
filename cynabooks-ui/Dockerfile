# pull official base image
FROM node:16.15.1-alpine

# set working directory
RUN mkdir /app && chown node:node /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
USER node
COPY --chown=node:node package.json yarn.lock* ./
# COPY package-lock.json ./
RUN npm install
# RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY --chown=node:node . .

# start app
# ENV CHOKIDAR_USEPOLLING=true
EXPOSE 80

CMD ["npm", "start"]






# # Build stage
# FROM node:1 as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .

# # You don't need to run build for development, as CRA's dev server will take care of this.
# # RUN npm run build

# # Serve stage for development with HMR
# # Using node image itself instead of Nginx since we need the Node server for HMR
# FROM node:18 as serve
# WORKDIR /app
# COPY --from=build /app .
# EXPOSE 3000
# # Set environment variable to ensure HMR knows where to reload from
# ENV CHOKIDAR_USEPOLLING=true
# CMD ["npm", "start"]


# # Build stage
# FROM node:14 as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Serve stage
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
