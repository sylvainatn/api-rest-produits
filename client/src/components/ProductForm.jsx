import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { TextField, Button, FormControlLabel, Checkbox, Snackbar, Grid, Typography } from '@mui/material';

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

   // Fonction pour réinitialiser les champs du formulaire
   const handleReset = () => {
      setName('');
      setType('');
      setPrice('');
      setRating('');
      setWarranty_years('');
      setAvailable(false);
      setIsEditing(false);
   };

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
         handleReset();


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
      <div>
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
                     sx={{
                        '& .MuiOutlinedInput-root': {
                           borderRadius: '12px', // Ajuste le rayon selon ton besoin
                        },
                     }}
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
                     sx={{
                        '& .MuiOutlinedInput-root': {
                           borderRadius: '12px', // Ajuste le rayon selon ton besoin
                        },
                     }}
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
                     sx={{
                        '& .MuiOutlinedInput-root': {
                           borderRadius: '12px', // Ajuste le rayon selon ton besoin
                        },
                     }}
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
                     sx={{
                        '& .MuiOutlinedInput-root': {
                           borderRadius: '12px', // Ajuste le rayon selon ton besoin
                        },
                     }}
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
                     sx={{
                        '& .MuiOutlinedInput-root': {
                           borderRadius: '12px', // Ajuste le rayon selon ton besoin
                        },
                     }}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={available}
                           onChange={(e) => setAvailable(e.target.checked)}
                           color="primary" // Change la couleur du checkbox
                           sx={{
                              '&.Mui-checked': {
                                 color: '#00796b', // Couleur personnalisée quand coché
                              },
                           }}
                        />
                     }
                     label={
                        <Typography
                           variant="body1"
                           sx={{
                              color: available ? 'green' : 'black', // Change la couleur du texte selon la disponibilité
                              fontWeight: 600, // Style du texte
                           }}
                        >
                           {available ? 'Disponible' : 'Non disponible'}
                        </Typography>
                     }
                     labelPlacement="end" // Placer le label à droite du checkbox
                  />
               </Grid>

               {/* Bouton de soumission */}
               <Grid item xs={12}>
                  <Button
                     type="submit"
                     variant="contained"
                     color="primary"
                  >
                     {isEditing ? 'Mettre à jour' : 'Ajouter'}
                  </Button>
               </Grid>

               {/* Bouton pour réinitialiser tous les champs */}
               <Grid item xs={12}>
                  <Button
                     type="button"
                     variant="contained"
                     sx={{
                        backgroundColor: '#FFEB3B', // Jaune (vous pouvez ajuster ce code couleur si nécessaire)
                        '&:hover': {
                           backgroundColor: '#FDD835', // Jaune plus foncé au survol
                        },
                     }}
                     color="black"
                     onClick={handleReset} // Appel de la fonction pour réinitialiser
                  >
                     Effacer tout
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
      </div>
   );
};

ProductForm.propTypes = {
   isEditing: PropTypes.bool.isRequired,
   currentProduct: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      price: PropTypes.number,
      rating: PropTypes.number,
      warranty_years: PropTypes.number,
      available: PropTypes.bool,

   }),
   setIsEditing: PropTypes.func.isRequired,
   fetchProduits: PropTypes.func.isRequired,
};

export default ProductForm;
