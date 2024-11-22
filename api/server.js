const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Pour parser les JSON dans le corps de la requête

// Routes
app.use('/api', routes);

// Lancer le serveur
app.listen(port, () => {
   console.log(`Serveur API lancé sur http://localhost:${port}`);
});
