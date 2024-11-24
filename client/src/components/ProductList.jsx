import React from 'react';
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

export default ProductList;
