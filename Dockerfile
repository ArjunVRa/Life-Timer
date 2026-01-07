# Stage 1: Build the React App
FROM node:20-alpine as build_image
WORKDIR /app

# --- CHANGE START: Copy BOTH files ---
COPY package.json package-lock.json ./
# -------------------------------------

# --- CHANGE START: Use 'ci' instead of 'install' ---
# 'ci' stands for Clean Install - it forces Docker to use the exact versions from your lock file
RUN npm ci
# -------------------------------------

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build_image /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
