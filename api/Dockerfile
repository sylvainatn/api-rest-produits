# Utilise l'image de base Node.js
FROM node:16

# Crée et définit le répertoire de travail
WORKDIR /app

# Copie les fichiers de ton API dans le conteneur
COPY ./api/package*.json ./
COPY ./api/routes.js ./api/server.js ./api/database.js ./

# Installe les dépendances de l'API
RUN npm install

# Expose le port sur lequel l'API va tourner
EXPOSE 5000

# Commande pour démarrer l'API
CMD ["node", "server.js"]
