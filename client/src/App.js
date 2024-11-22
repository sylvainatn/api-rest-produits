import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';

const App = () => {
  const [produits, setProduits] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling state

  // Fonction pour récupérer les produits
  const fetchProduits = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error state
    try {
      const response = await axios.get('http://localhost:5000/api/produits'); // URL de l'API backend
      setProduits(response.data); // Mettre à jour les produits
    } catch (error) {
      setError('Erreur lors de la récupération des produits');
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Appel de la fonction fetchProduits au premier rendu
  useEffect(() => {
    fetchProduits();
  }, []);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/produits/${id}`);
      fetchProduits();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
    }
  };

  const handleFormClose = () => {
    setIsEditing(false);
    setCurrentProduct(null); // Reset current product after adding/updating
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>Gestion des Produits</Typography>
      <ProductForm
        isEditing={isEditing}
        currentProduct={currentProduct}
        setIsEditing={setIsEditing}
        fetchProduits={fetchProduits}
        handleFormClose={handleFormClose}
      />

      {/* Affichage du loader pendant le chargement des produits */}
      {loading && (
        <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Affichage des erreurs si besoin */}
      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error}
        </Alert>
      )}

      {/* Affichage de la liste des produits */}
      {!loading && !error && (
        <ProductList produits={produits} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </Container>
  );
};

export default App;
