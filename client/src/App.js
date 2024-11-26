import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Snackbar } from '@mui/material';
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
  const [snackbarMessage, setSnackbarMessage] = useState(''); // État pour le message
  const [snackbarOpen, setSnackbarOpen] = useState(false); // État pour l'ouverture du Snackbar

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
    fetchProduits();

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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/produits/${id}`);
      setSnackbarMessage(response.data.message || 'Produit supprimé avec succès');
      setSnackbarOpen(true); // Ouvre le Snackbar
    } catch (error) {
      console.error('Erreur dans handleDelete:', error);
      setSnackbarMessage(error.response?.data?.message || 'Erreur lors de la suppression');
      setSnackbarOpen(true); // Ouvre le Snackbar pour afficher le message d'erreur
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleFormClose = () => {
    setIsEditing(false);
    setCurrentProduct(null);
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Gestion des Produits
      </Typography>
      <br />
      <ProductForm
        isEditing={isEditing}
        currentProduct={currentProduct}
        setIsEditing={setIsEditing}
        fetchProduits={fetchProduits}
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

      {/* Snackbar pour afficher les messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default App;
