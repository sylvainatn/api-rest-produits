import express from 'express';
import { connectDB } from './database.js'; 
import { validateProduct } from './productValidators.js'; 

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
   try {
      // Valider les données
      const produit = validateProduct(req.body);
      const db = await connectDB();
      const lastProduct = await db.collection('produits').find().sort({ _id: -1 }).limit(1).toArray();
      const newId = lastProduct.length > 0 ? lastProduct[0]._id + 1 : 1;
      produit._id = newId;
      const result = await db.collection('produits').insertOne(produit);

      if (result.acknowledged) {
         req.io.emit('produitAjoute', produit);
         res.json({
            message: 'Produit ajouté avec succès',
            produit,
         });
      } else {
         res.status(500).json({ message: 'Erreur lors de l\'ajout du produits' });
      }
   } catch (err) {
      res.status(400).json({ message: 'Données invalides', errors: err.message });
   }
});


// Modifier un produit
router.put('/produits/:id', async (req, res) => {
   let { id } = req.params;
   id = Number(id);

   if (isNaN(id)) {
      return res.status(400).json({ message: 'L\'ID doit être un nombre valide' });
   }

   try {
      // Valider les données
      const updatedData = validateProduct(req.body);

      const db = await connectDB();
      const result = await db.collection('produits').updateOne(
         { _id: id },
         { $set: updatedData }
      );

      if (result.matchedCount === 0) {
         return res.status(404).json({ message: 'Produit non trouvé' });
      }

      req.io.emit('produitModifie', { _id: id, ...updatedData });
      res.json({ message: 'Produit mis à jour avec succès', produit: { _id: id, ...updatedData } });
   } catch (err) {
      res.status(400).json({ message: 'Données invalides', errors: err.message });
   }
});


// Supprimer un produit
router.delete('/produits/:id', async (req, res) => {

   let { id } = req.params;
   id = Number(id);

   try {
      const db = await connectDB();
      const result = await db.collection('produits').deleteOne({ _id: id });

      if (result.deletedCount === 1) {
         req.io.emit('produitSupprime', { id });
         const produits = await db.collection('produits').find().toArray();
         res.json({ message: 'Produit supprimé avec succès', produits });
      } else {
         res.status(404).json({ message: 'Produit non trouvé' });
      }
   } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la suppression du produit', error: err });
   }
});

export default router;
