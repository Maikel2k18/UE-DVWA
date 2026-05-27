# =============================================================================
# FASE 1: Construcción y Compilación (Build Stage)
# =============================================================================
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copiar manifiestos de dependencias
COPY package*.json ./

# Instalar dependencias de forma limpia y estricta
RUN npm ci

# Copiar el resto del código fuente de la aplicación
COPY . .

# Eliminar las dependencias de desarrollo (devDependencies) para reducir tamaño y mitigar CVEs
RUN npm prune --production

# =============================================================================
# FASE 2: Ejecución Segura en Producción (Production Stage)
# =============================================================================
FROM node:18-alpine AS runner

# Declarar el entorno de ejecución como producción
ENV NODE_ENV=production

WORKDIR /usr/src/app

# PRINCIPIO SHIFT LEFT: Copiar ÚNICAMENTE los artefactos necesarios compilados
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/src ./src

# PRINCIPIO DE MÍNIMO PRIVILEGIO: Usar el usuario seguro 'node' (no-root) preconfigurado en Alpine
RUN chown -R node:node /usr/src/app

# Cambiar de root al usuario sin privilegios del sistema
USER node

# Exponer el puerto de escucha de la aplicación
EXPOSE 3000

# Arrancar la aplicación directamente evitando shells intermedias vulnerables
CMD ["node", "src/app.js"]