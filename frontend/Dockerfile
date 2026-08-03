# Stage 1: Build Angular application
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve application with optimized Nginx
FROM nginx:alpine

# 1. Limpa TODOS os arquivos padrão do Nginx antes de copiar o seu site
RUN rm -rf /usr/share/nginx/html/*

# 2. Copia a build compilada do Angular para a raiz web
COPY --from=build /app/dist/portfolio/browser /usr/share/nginx/html

# 3. Substitui a configuração do Nginx pela sua
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
