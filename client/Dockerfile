# Utilisation de l'image Node.js de base
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY ./client/package*.json ./
COPY ./client/src ./client/public ./client/.gitignore ./client/README.md ./

# Installer les dépendances
RUN npm install

# Exposer le port
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
