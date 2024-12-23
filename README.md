# API-REST Project

Ce projet consiste en une application utilisant une architecture **front-end / back-end**. Le back-end est géré par une API REST et le front-end est un client qui interagit avec l'API.

## Structure du projet

- **api** : Partie backend de l'application, gérant les routes, la base de données, la validation des produits.
- **client** : Partie front-end de l'application, qui interagit avec l'API pour récupérer, créer, modifier ou supprimer les données.

## Prérequis

Assurez-vous d'avoir installé les outils suivants avant de commencer :

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [MongoDB](https://www.mongodb.com/try/download/community) (version 8.0.3)


## Installation et déploiement

### 1. Cloner le repository

Clonez ce repository sur votre machine locale en utilisant la commande suivante :

```bash
git clone https://github.com/sylvainatn/api-rest-produits.git
cd api-rest-produits

```


## Lancer le backend (API)

### Ouvrez un terminal pour l'API et naviguez jusqu'au dossier api :

```bash

cd api
npm install
node server.js

```

## Lancer le frontend (Client)

### Ouvrez un autre terminal pour le client et naviguez jusqu'au dossier client :

```bash

cd client
npm install
npm start

```

## Accéder à l'application
Une fois les deux serveurs démarrés, vous pouvez accéder à l'application :

- API : http://localhost:5000 
- Client : http://localhost:3000 (ou autre port selon la configuration)
