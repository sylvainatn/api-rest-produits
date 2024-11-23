const { MongoClient } = require('mongodb');

let db;

const connectDB = async () => {
   if (db) return db; // Si déjà connecté, retourner la base de données
   try {
      const client = new MongoClient('mongodb://localhost:27017');
      await client.connect();
      db = client.db('store'); // Connexion à la base de données "store"
      console.log('Connecté à MongoDB');
      return db;
   } catch (err) {
      console.error('Erreur de connexion à MongoDB:', err);
      throw err;
   }
};

module.exports = connectDB;
