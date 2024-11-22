const { MongoClient } = require('mongodb');

// URL de connexion à MongoDB
const url = 'mongodb://db:27017';
const dbName = 'store';
let db;

const connectDB = async () => {
   if (db) return db; // Si déjà connecté, retourner la base de données
   try {
      const client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      db = client.db(dbName); // Connexion à la base de données
      console.log('Connecté à MongoDB');
      return db;
   } catch (err) {
      console.error('Erreur de connexion à MongoDB:', err);
      throw err;
   }
};

module.exports = connectDB;
