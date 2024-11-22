import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, FormControlLabel, Checkbox } from '@mui/material';

const ProductForm = ({ isEditing, currentProduct, setIsEditing, fetchProduits }) => {

   // Déclarations des états pour les champs du formulaire
   const [name, setName] = useState('');
   const [type, setType] = useState('');
   const [price, setPrice] = useState('');
   const [rating, setRating] = useState('');
   const [warranty_years, setWarranty_years] = useState('');
   const [available, setAvailable] = useState(false);

   const API_URL = 'http://localhost:5000/api';

   // Initialisation des valeurs du formulaire lors de la modification d'un produit
   useEffect(() => {
      if (isEditing && currentProduct) {
         setName(currentProduct.name);
         setType(currentProduct.type);
         setPrice(currentProduct.price);
         setRating(currentProduct.rating);
         setWarranty_years(currentProduct.warranty_years);
         setAvailable(currentProduct.available);
      }
   }, [isEditing, currentProduct]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const product = {
         name,
         type,
         price: Number(price),  // Conversion en nombre
         rating: Number(rating),  // Conversion en nombre
         warranty_years: Number(warranty_years),  // Conversion en nombre
         available
      };

      try {
         if (isEditing) {
            // Si on modifie un produit, on utilise PUT
            await axios.put(`${API_URL}/produits/${currentProduct._id}`, product);
            setIsEditing(false);
         } else {
            // Si on ajoute un nouveau produit, on utilise POST
            await axios.post(`${API_URL}/produits`, product);
         }

         // Récupérer la liste mise à jour des produits
         fetchProduits();

         // Réinitialiser les champs du formulaire
         setName('');
         setType('');
         setPrice('');
         setRating('');
         setWarranty_years('');
         setAvailable(false);
      } catch (error) {
         console.error('Erreur lors de l\'ajout ou modification du produit', error);
      }
   };

   return (
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px', alignItems: 'center' }}>
         <div>
            <TextField
               label="Nom du produit"
               variant="outlined"
               fullWidth
               value={name}
               onChange={(e) => setName(e.target.value)}
               required
            />
         </div>

         <div>
            <TextField
               label="Type de produit"
               variant="outlined"
               fullWidth
               value={type}
               onChange={(e) => setType(e.target.value)}
               required
            />
         </div>

         <div>
            <TextField
               label="Prix"
               variant="outlined"
               fullWidth
               type="number"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
               required
            />
         </div>

         <div>
            <TextField
               label="Rating"
               variant="outlined"
               fullWidth
               type="number"
               value={rating}
               onChange={(e) => setRating(e.target.value)}
               required
            />
         </div>

         <div>
            <TextField
               label="Garantie (années)"
               variant="outlined"
               fullWidth
               type="number"
               value={warranty_years}
               onChange={(e) => setWarranty_years(e.target.value)}
               required
            />
         </div>

         <div>
            <FormControlLabel
               control={
                  <Checkbox
                     checked={available}
                     onChange={(e) => setAvailable(e.target.checked)}
                     color="primary"
                  />
               }
               label="Disponible"
            />
         </div>

         <div>
            <Button
               type="submit"
               variant="contained"
               color="primary"
               fullWidth>
               {isEditing ? 'Mettre à jour' : 'Ajouter'}
            </Button>
         </div>
      </form>
   );
};

export default ProductForm;
