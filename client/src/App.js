import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  AlertTitle,
  Snackbar,
  createTheme,
  ThemeProvider,
  CssBaseline,
  IconButton
} from '@mui/material';

// Établit une connexion WebSocket entre le client et le serveur
const socket = io('http://localhost:5000');

const App = () => {

  const [produits, setProduits] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

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
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erreur dans handleDelete:', error);
      setSnackbarMessage(error.response?.data?.message || 'Erreur lors de la suppression');
      setSnackbarOpen(true);
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ paddingTop: 5 }}>

        <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

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

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} variant='filled' severity='info' sx={{ width: '100%' }}>
            <AlertTitle>Info</AlertTitle>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default App;
