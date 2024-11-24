import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';

const ProductList = ({ produits, onEdit, onDelete }) => {
   return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '15px' }}>
         {produits.length > 0 ? (
            produits.map(product => (
               <div key={product._id}> {/* Flexbox pour les éléments */}
                  <ProductItem
                     product={product}
                     onEdit={onEdit}
                     onDelete={onDelete}
                  />
               </div>
            ))
         ) : (
            <div>Aucun produit disponible</div>
         )}
      </div>
   );
};


ProductList.propTypes = {
   produits: PropTypes.arrayOf(
      PropTypes.shape({
         _id: PropTypes.string.isRequired,
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
