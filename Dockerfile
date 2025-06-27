# Etapa 1: Construcción
FROM node:22.9.0 AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración e instalar dependencias
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copiar el resto del código y construir Next.js
COPY . .
RUN npm run build

# Etapa 2: Ejecución
FROM node:22.9.0 AS runner

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios de la etapa de construcción
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Configurar la variable de entorno para producción
ENV NODE_ENV=production

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación en modo producción
CMD ["npm", "run", "start"]
