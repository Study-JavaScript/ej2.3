# Etapa de construcción
FROM node:14 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración y de proyecto
COPY package*.json ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY tailwind.css ./
COPY types.d.ts ./
COPY ./src ./src
COPY ./public ./public

# Instala las dependencias y construye el proyecto
RUN npm install
RUN npm run build

# Etapa de producción
FROM node:14 AS production

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Instala las dependencias de producción
RUN npm install --only=production

# Expone el puerto
# EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/server.js"]
