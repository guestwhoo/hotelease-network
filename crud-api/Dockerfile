FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Instalar dependencias como root
RUN npm install --production

COPY . .

# Cambiar propietario de los archivos al usuario 'node'
RUN chown -R node:node /usr/src/app

# Cambiar al usuario 'node' (non-root)
USER node

EXPOSE 3000

CMD ["npm", "start"]
