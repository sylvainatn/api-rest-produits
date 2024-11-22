# Utilisation de l'image Node.js de base
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY ./api/package*.json ./
COPY ./api/routes.js ./api/server.js ./api/database.js ./

# Installer les dépendances
RUN npm install

# Exposer le port
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["node", "server.js"]
