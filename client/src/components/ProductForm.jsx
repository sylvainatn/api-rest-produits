import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, FormControlLabel, Checkbox, Snackbar, Container, Grid } from '@mui/material';


const ProductForm = ({ isEditing, currentProduct, setIsEditing, fetchProduits }) => {

   // Déclarations des états pour les champs du formulaire
   const [name, setName] = useState('');
   const [type, setType] = useState('');
   const [price, setPrice] = useState('');
   const [rating, setRating] = useState('');
   const [warranty_years, setWarranty_years] = useState('');
   const [available, setAvailable] = useState(false);

   // Messages
   const [message, setMessage] = useState('');
   const [open, setOpen] = useState(false);

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
         price,
         rating,
         warranty_years,
         available
      };

      try {
         let serverResponse;

         if (isEditing) {
            serverResponse = await axios.put(`${API_URL}/produits/${currentProduct._id}`, product);
         } else {
            serverResponse = await axios.post(`${API_URL}/produits`, product);
         }

         setMessage(serverResponse.data.message); // Message de l'API
         setOpen(true);

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

         if (error.response && error.response.data) {
            setMessage(error.response.data.errors);
         } else {
            setMessage('Erreur lors de l\'ajout ou modification du produit');
         }
         setOpen(true);
      }
   };

   const handleCloseSnackbar = () => {
      setOpen(false);
   };

   return (
      <Container maxWidth="sm" style={{ marginTop: 20 }}>
         <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
               {/* Nom du produit */}
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Nom du produit"
                     variant="outlined"
                     fullWidth
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     required
                  />
               </Grid>

               {/* Type de produit */}
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Type de produit"
                     variant="outlined"
                     fullWidth
                     value={type}
                     onChange={(e) => setType(e.target.value)}
                     required
                  />
               </Grid>

               {/* Prix */}
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Prix"
                     variant="outlined"
                     fullWidth
                     type="number"
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     required
                  />
               </Grid>

               {/* Rating */}
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Rating"
                     variant="outlined"
                     fullWidth
                     type="number"
                     value={rating}
                     onChange={(e) => setRating(e.target.value)}
                     required
                  />
               </Grid>

               {/* Garantie (années) */}
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Garantie (années)"
                     variant="outlined"
                     fullWidth
                     type="number"
                     value={warranty_years}
                     onChange={(e) => setWarranty_years(e.target.value)}
                     required
                  />
               </Grid>

               {/* Disponible */}
               <Grid item xs={12} sm={6}>
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
               </Grid>

               {/* Bouton de soumission */}
               <Grid item xs={12}>
                  <Button
                     type="submit"
                     variant="contained"
                     color="primary"
                     fullWidth>
                     {isEditing ? 'Mettre à jour' : 'Ajouter'}
                  </Button>
               </Grid>
            </Grid>
         </form>

         {/* Afficher les messages de succès ou d'erreur */}
         <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={message}
         />
      </Container>
   );
};

export default ProductForm;
