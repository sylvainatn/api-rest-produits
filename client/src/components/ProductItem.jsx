import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductItem = ({ product, onEdit, onDelete }) => {
   return (
      <Card
         variant="outlined"
         sx={{
            boxShadow: 3,
            '&:hover': {
               boxShadow: 6,
            },
            borderRadius: 2,
            padding: 0,
         }}
      >
         <CardContent>
            <Typography variant="h6" component="div">
               {product.name}
            </Typography>
            {/* Vérification du prix avant affichage */}
            <Typography variant="body1" color="primary">
               {product.price ? `${product.price}€` : 'Prix non spécifié'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
               Type: {product.type}
            </Typography>

            <Typography variant="body2" color="textSecondary">
               Rating: {product.rating ? product.rating : 'N/A'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
               Garantie: {product.warranty_years ? `${product.warranty_years} ${product.warranty_years > 1 ? 'ans' : 'an'}` : 'Non spécifiée'}
            </Typography>
            <Typography variant="body2" color={product.available ? 'green' : 'red'}>
               {product.available ? 'Disponible' : 'Non disponible'}
            </Typography>
         </CardContent>
         <Box display="flex" justifyContent="flex-end" p={1}>
            {/* Bouton pour modifier */}
            <IconButton onClick={() => onEdit(product)}>
               <EditIcon color="primary" />
            </IconButton>
            {/* Bouton pour supprimer */}
            <IconButton onClick={() => onDelete(product._id)} color="error">
               <DeleteIcon />
            </IconButton>
         </Box>
      </Card>
   );
};

ProductItem.propTypes = {
   product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number,
      rating: PropTypes.number,
      warranty_years: PropTypes.number,
      available: PropTypes.bool.isRequired,
      _id: PropTypes.number.isRequired,
   }).isRequired,
   onEdit: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired,
};

export default ProductItem;
