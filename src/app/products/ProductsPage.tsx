'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Container,
  Box,
  CircularProgress,
  Button,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import type { RootState, AppDispatch } from '@/store';
import type { Cat, CatsState } from '@/types';
import { fetchCats } from '@/store/features/cats/catsApi';
import { deleteCat, setCurrentPage, setItemsPerPage, setCats } from '@/store/features/cats/catsSlice';
import { LikeButton } from '@/components/ui/LikeButton';
import { DeleteButton } from '@/components/ui/DeleteButton';
import { useRouter } from 'next/navigation';

export function ProductsPage({ initialCats }: {initialCats: Cat[]}) {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    items, 
    favorites, 
    loading, 
    error,
    isInitialized,
    currentPage,
    itemsPerPage 
  } = useSelector((state: RootState) => state.cats) as CatsState;
  
  const [showFavorites, setShowFavorites] = useState(false);
  const router = useRouter();
 
  const cats = isInitialized ? items: initialCats;
  const catsToShow = showFavorites ? favorites : cats;

  useEffect(() => {
    if (!isInitialized) {
      dispatch(setCats(initialCats));
      // dispatch(fetchCats());
    }
  }, [dispatch, isInitialized]);

  const handleDelete = (catId: string) => {
    dispatch(deleteCat(catId));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCats = catsToShow.slice(startIndex, endIndex);
  const totalPages = Math.ceil(catsToShow.length / itemsPerPage);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Каталог котов
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={() => router.push('/create-product')}
            sx={{ bgcolor: 'grey.500', '&:hover': { bgcolor: 'grey.400' } }}
          >
            Добавить
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setShowFavorites(!showFavorites)}
            sx={{ bgcolor: 'grey.500', '&:hover': { bgcolor: 'grey.400' } }}
          >
            {showFavorites ? 'Все коты' : 'Избранные коты'}
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {paginatedCats.map((cat) => (
          <Grid item xs={12} key={cat.id}>
            <Box 
              onClick={() => router.push(`/products/${cat.id}`)}
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
            >
              <Card sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 300, height: 300, objectFit: 'cover' }}
                  image={cat.url}
                  alt={cat.breeds[0]?.name || 'Cat'}
                />
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {cat.breeds[0]?.name || 'Unknown Breed'}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Происхождение: {cat.breeds[0]?.origin || 'Unknown'}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body2">
                      Длина: {cat.width}
                    </Typography>
                    <Typography variant="body2">
                      Высота: {cat.height}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 'auto', display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <LikeButton catId={cat.id} />
                    <DeleteButton catId={cat.id} onDelete={handleDelete} />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination 
          count={totalPages} 
          page={currentPage} 
          onChange={handlePageChange}
          // color="primary"
          size="large"
        />
      </Box>
    </Container>
  );
} 