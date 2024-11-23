const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');
const routes = require('./routes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Création du serveur HTTP avec Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
   cors: {
      // Autorisations
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
   },
});

// Injecter l'instance Socket.IO dans les requêtes
app.use((req, res, next) => {
   req.io = io;
   next();
});

// Routes
app.use('/api', routes);

// Lancer le serveur
httpServer.listen(port, () => {
   console.log(`Serveur API lancé sur http://localhost:${port}`);
});

// Gérer les connexions WebSocket
io.on('connection', (socket) => {
   console.log('Un client s\'est connecté:', socket.id);

   socket.on('disconnect', () => {
      console.log('Un client s\'est déconnecté:', socket.id);
   });
});
