# Utiliser l'image officielle Node.js comme image de base
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY ./client/package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code du client dans le conteneur
COPY ./client/ ./

# Construire l'application (si nécessaire, comme pour un projet React)
RUN npm run build

# Exposer le port sur lequel l'application frontend sera accessible
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]
