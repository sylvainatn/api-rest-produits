import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { TextField, Button, FormControlLabel, Checkbox, Snackbar, Grid, Typography, Alert, Stack, Rating } from '@mui/material';

const ProductForm = ({ isEditing, currentProduct, setIsEditing, fetchProduits }) => {

   // Déclarations des états pour les champs du formulaire
   const [name, setName] = useState('');
   const [type, setType] = useState('');
   const [price, setPrice] = useState('');
   const [rating, setRating] = useState(0);
   const [warranty_years, setWarranty_years] = useState('');
   const [available, setAvailable] = useState(false);
   // Messages et styles
   const [message, setMessage] = useState('');
   const [open, setOpen] = useState(false);
   const [severity, setSeverity] = useState('success');

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
   const handleResetForm = () => {
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

         fetchProduits(); // Récupérer la liste mise à jour des produits        
         handleResetForm();// Réinitialiser les champs du formulaire
         setMessage(serverResponse.data.message); // Message de l'API
         setSeverity('success');
         setOpen(true);

      } catch (error) {

         if (error.response && error.response.data) {
            setMessage(error.response.data.errors);
            setSeverity('error');
            setOpen(true);
         } else {
            setMessage('Erreur lors de l\'ajout ou modification du produit');
         }
         setSeverity('error');
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
                           borderRadius: '12px',
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
                           borderRadius: '12px',
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
                           borderRadius: '12px',
                        },
                     }}
                  />
               </Grid>

               {/* Rating */}
               <Grid item xs={12} sm={6}>
                  <Typography component="legend">Notation</Typography>
                  <Rating
                     name="rating"
                     precision={0.1}
                     value={rating}
                     size='large'
                     onChange={(_, newValue) => setRating(newValue)}
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
                           borderRadius: '12px',
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
                           color="success"
                        />
                     }
                     label={
                        <Typography
                           variant="body1"
                           sx={{
                              color: available ? 'green' : 'black',
                              fontWeight: 600,
                           }}
                        >
                           {available ? 'Disponible' : 'Non disponible'}
                        </Typography>
                     }
                     labelPlacement="end"
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
                        backgroundColor: '#FFEB3B',
                        '&:hover': {
                           backgroundColor: '#FDD835',
                        },
                     }}
                     color="black"
                     onClick={handleResetForm}
                  >
                     Effacer tout
                  </Button>
               </Grid>
            </Grid>
         </form>

         {/* Snackbar pour afficher le message */}
         <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
         >
            <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
               {message}
            </Alert>
         </Snackbar>
      </div>
   );
};

// Valider les props du composant
ProductForm.propTypes = {
   isEditing: PropTypes.bool.isRequired,
   currentProduct: PropTypes.shape({
      _id: PropTypes.number,
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
