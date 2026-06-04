
# --- Stage 1: Build the React Application ---
# FROM node:26-alpine AS builder

# WORKDIR /app

# # Cache dependencies
# COPY package*.json ./
# RUN npm ci

# # Copy source files and build
# COPY . .
# RUN npm run build


# # --- Stage 2: Serve using Node Alpine ---
# FROM node:26-alpine

# WORKDIR /app

# # Security Best Practice: Switch to the built-in non-root 'node' user
# USER node

# # Copy the built files from Stage 1 and ensure the 'node' user owns them
# COPY --from=builder --chown=node:node /app/dist ./dist

# # Expose the production port
# EXPOSE 4003

# # Use npx to run 'serve' directly from the node environment safely
# CMD ["npx", "serve", "-s", "dist", "-l", "4003"]



# --- Stage 1: Build ---
FROM node:current-alpine3.23 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .


ARG VITE_APP_URL
ARG VITE_OPENIDDICT_URL

ARG VITE_AUTH_BASE
ARG VITE_CLIENT_ID
ARG VITE_POST_LOGOUT_URI
ARG VITE_AUTHORIZE_REDIRECT
ARG VITE_AUTHORIZE_SCOPE


ENV VITE_AUTH_BASE=${VITE_AUTH_BASE}
ENV VITE_CLIENT_ID=${VITE_CLIENT_ID}
ENV VITE_POST_LOGOUT_URI=${VITE_POST_LOGOUT_URI}
ENV VITE_AUTHORIZE_REDIRECT=${VITE_AUTHORIZE_REDIRECT}
ENV VITE_AUTHORIZE_SCOPE=${VITE_AUTHORIZE_SCOPE}



RUN npm run build


FROM node:current-alpine3.23
WORKDIR /app
RUN npm install serve
USER node
COPY --from=builder --chown=node:node /app/dist ./dist
EXPOSE 4003
CMD ["npx", "serve", "-s", "dist", "-l", "4003"]
# CMD ["./node_modules/.bin/serve", "-s", "dist", "-l", "4003"]