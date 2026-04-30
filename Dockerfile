# Usamos Alpine porque nos permite controlar mejor las librerías de C
FROM node:18-alpine

# Instalamos las herramientas necesarias para compilar SQLite en Linux
RUN apk add --no-cache python3 make g++ 

WORKDIR /app

# Copiamos solo los archivos de dependencias
COPY package*.json ./

# Instalamos desde cero (esto compilará sqlite3 correctamente para Linux)
RUN npm install

# Copiamos el resto del código
COPY . .

RUN mkdir -p src/public/uploads && chmod 777 src/public/uploads

EXPOSE 3000

CMD ["node", "src/app.js"]