import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import ProductItem from './ProductItem';

const ProductList = ({ produits, onEdit, onDelete }) => {
   return (
      <div><br />
         <Typography variant="h4" gutterBottom>
            Liste des produits
         </Typography>
         <div
            style={{
               paddingBottom: '40px',
            }}
         >
            <Grid container spacing={2}>
               {produits.length > 0 ? (
                  produits.map((product) => (
                     <Grid item xs={12} sm={6} md={4} key={product._id}>
                        <ProductItem
                           product={product}
                           onEdit={onEdit}
                           onDelete={onDelete}
                        />
                     </Grid>
                  ))
               ) : (
                  <Typography variant="body1">Aucun produit disponible</Typography>
               )}
            </Grid>
         </div>
      </div>
   );
};

ProductList.propTypes = {
   produits: PropTypes.arrayOf(
      PropTypes.shape({
         _id: PropTypes.number.isRequired,
         name: PropTypes.string.isRequired,
         type: PropTypes.string.isRequired,
         price: PropTypes.number.isRequired,
         rating: PropTypes.number,
         warranty_years: PropTypes.number,
         available: PropTypes.bool.isRequired,
      })
   ).isRequired,
   onEdit: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired,
};

export default ProductList;
