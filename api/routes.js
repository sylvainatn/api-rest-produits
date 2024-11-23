const express = require('express');
const connectDB = require('./database');
const router = express.Router();


// Récupérer tous les produits
router.get('/produits', async (req, res) => {
   try {
      const db = await connectDB();
      const produits = await db.collection('produits').find().toArray();
      res.json(produits);
   } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération des produits', error: err });
   }
});


// Ajouter un produit
router.post('/produits', async (req, res) => {
   const { name, type, price, rating, warranty_years, available } = req.body;

   try {
      console.log('Données reçues :', req.body); // Log des données envoyées par le frontend

      const db = await connectDB();
      const lastProduct = await db.collection('produits').find().sort({ _id: -1 }).limit(1).toArray();
      const newId = lastProduct.length > 0 ? lastProduct[0]._id + 1 : 1;

      const produit = {
         _id: newId,
         name,
         type,
         price,
         rating,
         warranty_years,
         available: available === "Oui" ? true : false,
      };

      console.log('Produit à insérer :', produit); // Log du produit avant l'insertion

      const result = await db.collection('produits').insertOne(produit);

      if (result.acknowledged) {
         res.json({
            message: 'Produit ajouté avec succès',
            produit,
         });
      } else {
         res.status(500).json({ message: 'Erreur lors de l\'ajout du produitssssssssss' });
      }

   } catch (err) {
      console.error("Erreur lors de l'ajout du produit :", err); // Log des erreurs côté serveur
      res.status(500).json({ message: 'Erreur lors de l\'ajout du produit', error: err.message });
   }
});





// Modifier un produit
router.put('/produits/:id', async (req, res) => {

   let { id } = req.params;
   id = Number(id);

   const { name, type, price, rating, warranty_years, available } = req.body;

   if (isNaN(id)) {
      return res.status(400).json({ message: 'L\'ID doit être un nombre valide' });
   }

   try {
      const db = await connectDB();
      const result = await db.collection('produits').updateOne(
         { _id: id },  // Utilisation de l'ID numérique comme champ dans la base de données
         { $set: { name, type, price, rating, warranty_years, available } }
      );

      if (result.matchedCount === 0) {
         return res.status(404).json({ message: 'Produit non trouvé' });
      }

      res.json({ message: 'Produit mis à jour avec succès', id });
   } catch (err) {
      console.error('Erreur lors de la modification du produit:', err);
      res.status(500).json({ message: 'Erreur lors de la modification du produit', error: err });
   }
});


// Supprimer un produit
router.delete('/produits/:id', async (req, res) => {

   let { id } = req.params;
   id = Number(id)
   try {
      const db = await connectDB();
      const result = await db.collection('produits').deleteOne({ _id: id });
      // Vérifier si un produit a été supprimé
      if (result.deletedCount === 1) {
         const produits = await db.collection('produits').find().toArray();
         res.json({ message: 'Produit supprimé avec succès', produits: produits });
      } else {
         res.status(404).json({ message: 'Produit non trouvé' });
      }
   } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la suppression du produit', error: err });
   }
});

module.exports = router;
