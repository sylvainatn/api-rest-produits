import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import axios from 'axios';
import { io } from 'socket.io-client';


const socket = io('http://localhost:5000');

const App = () => {

  const [produits, setProduits] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // Définition de fetchProduits
  const fetchProduits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/produits');
      setProduits(response.data);
    } catch (err) {
      setError('Erreur lors de la récupération des produits');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProduits(); // Appel initial pour charger les produits

    // Gestion des événements WebSocket
    socket.on('produitAjoute', (nouveauProduit) => {
      setProduits((prevProduits) => [...prevProduits, nouveauProduit]);
    });

    socket.on('produitSupprime', ({ id }) => {
      setProduits((prevProduits) => prevProduits.filter((produit) => produit._id !== id));
    });

    return () => {
      socket.off('produitAjoute');
      socket.off('produitSupprime');
    };
  }, []);


  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/produits/${id}`);
      setProduits((prevProduits) => prevProduits.filter((produit) => produit._id !== id)); // Mise à jour locale
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
    }
  };

  const handleFormClose = () => {
    setIsEditing(false);
    setCurrentProduct(null);
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>Gestion des Produits</Typography><br />
      <ProductForm
        isEditing={isEditing}
        currentProduct={currentProduct}
        setIsEditing={setIsEditing}
        fetchProduits={fetchProduits} // Passé comme prop
        handleFormClose={handleFormClose}
      />

      {loading && (
        <Box display="flex" justifyContent="center" sx={{ marginTop: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ marginTop: 5 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <ProductList produits={produits} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </Container>
  );
};

export default App;