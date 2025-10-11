# Dockerfile para desarrollo Vite
FROM node:20-alpine

WORKDIR /app

# Copiamos solo package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias dentro del contenedor
RUN npm install

# Copiamos el resto del código (node_modules está ignorado por .dockerignore)
COPY . .

# Exponemos puerto de Vite
EXPOSE 5173

# Comando por defecto
CMD ["npm", "run", "dev"]
