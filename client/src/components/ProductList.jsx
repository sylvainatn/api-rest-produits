import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ produits, onEdit, onDelete }) => {
   return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
         {produits.length > 0 ? (
            produits.map(product => (
               <div style={{ flex: '1 1 calc(33.333% - 16px)' }} key={product._id}> {/* Flexbox pour les éléments */}
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

export default ProductList;
