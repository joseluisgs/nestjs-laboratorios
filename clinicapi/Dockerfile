# Para crear la imagen de compilación: docker build -t
FROM node:16 AS builder
LABEL author="joseluisgs"
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# Imagen final con el código compilado
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start:prod"]