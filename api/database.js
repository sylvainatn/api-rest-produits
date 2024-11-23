const { MongoClient } = require('mongodb');

let db;

const connectDB = async () => {
   if (db) return db; // Si déjà connecté, retourner la base de données
   try {
      const client = new MongoClient('mongodb://localhost:27017'); // Connexion au serveur MongoDB
      await client.connect();
      db = client.db('store');
      console.log('Connecté à MongoDB');

      const collection = db.collection('produits');

      // Supprimer la collection si elle existe
      const collections = await db.listCollections({ name: 'produits' }).toArray();
      if (collections.length > 0) {
         await collection.drop();
         console.log(`Collection produits supprimée.`);
      }

      // Documents à insérer
      const documents = [
         { "_id": 1, "name": "AC1 Phone1", "type": "phone", "price": 200.05, "rating": 3.8, "warranty_years": 1, "available": true },
         { "_id": 2, "name": "AC2 Phone2", "type": "phone", "price": 147.21, "rating": 1, "warranty_years": 3, "available": false },
         { "_id": 3, "name": "AC3 Phone3", "type": "phone", "price": 150, "rating": 2, "warranty_years": 1, "available": true },
         { "_id": 4, "name": "AC4 Phone4", "type": "phone", "price": 50.20, "rating": 3, "warranty_years": 2, "available": true }
      ];

      // Insérer les documents dans la collection
      const result = await collection.insertMany(documents);

      console.log(`${result.insertedCount} documents ont été insérés dans la collection produits".`);

      return db;
   } catch (err) {
      console.error('Erreur de connexion à MongoDB:', err);
      throw err;
   }
};

module.exports = connectDB;
