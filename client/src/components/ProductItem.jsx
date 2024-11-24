import React from 'react';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';


const ProductItem = ({ product, onEdit, onDelete }) => {
   return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
         <Card sx={{ maxWidth: 273.34, marginBottom: 2 }}>
            <CardContent>
               <Typography variant="h6" gutterBottom>
                  {product.name}
               </Typography>

               <Typography variant="body2" color="textSecondary">
                  <strong>Type de produit:</strong> {product.type}
               </Typography>

               <Typography variant="body2" color="textSecondary">
                  <strong>Prix:</strong> {product.price} €
               </Typography>

               <Typography variant="body2" color="textSecondary">
                  <strong>Notation:</strong> {product.rating}
               </Typography>

               <Typography variant="body2" color="textSecondary">
                  <strong>Garantie:</strong> {product.warranty_years} {product.warranty_years >= 0 ? 'an' : 'ans'}
               </Typography>

               <Typography variant="body2" color="textSecondary">
                  <strong>Disponible:</strong> {product.available ? 'Oui' : 'Non'}
               </Typography>

               <div style={{ marginTop: '16px' }}>
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={() => onEdit(product)}
                     style={{ marginRight: '8px' }}
                  >
                     Modifier
                  </Button>

                  <Button
                     variant="outlined"
                     color="error"
                     onClick={() => onDelete(product._id)}
                  >
                     Supprimer
                  </Button>
               </div>
            </CardContent>
         </Card>
      </Grid>
   );
};

ProductItem.propTypes = {
   product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number,
      warranty_years: PropTypes.number,
      available: PropTypes.bool.isRequired,
      _id: PropTypes.string.isRequired,
   }).isRequired,
   onEdit: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired,
};

export default ProductItem;
