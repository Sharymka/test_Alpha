'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, CardMedia, CardContent, Typography, CircularProgress, Box, Button, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import type { RootState } from '@/store';
import { toggleFavorite } from '@/store/features/cats/catsSlice';
import type { Cat } from '@/types';

interface CatDetailsPageProps {
  id: string;
}

export function CatDetailsPage({ id }: CatDetailsPageProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cats);
  const [cat, setCat] = useState<Cat | null>(null);

  useEffect(() => {
    const foundCat = items.find((item: Cat) => item.id === id);
    setCat(foundCat || null);
  }, [id, items]);

  if (!cat) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, gap: 2 }}>
        <Button 
          variant="contained" 
          onClick={() => router.push(`/products/${id}/edit`)}
          sx={{ bgcolor: 'grey.500', '&:hover': { bgcolor: 'grey.400' } }}
        >
          Редактировать
        </Button>
        <Button 
          variant="contained" 
          onClick={() => router.back()} 
          sx={{ bgcolor: 'grey.500', '&:hover': { bgcolor: 'grey.400' } }}
        >
          Назад
        </Button>
      </Box>
      <Card>
        <CardMedia
          component="img"
          sx={{ width: '100%', height: 400, objectFit: 'cover', objectPosition: 'top' }}
          image={cat.url}
          alt={cat.breeds[0]?.name || 'Cat'}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {cat.breeds[0]?.name || 'Unknown Breed'}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {cat.breeds[0]?.description || 'Нет описания'}
          </Typography>
          <Typography variant="body2">
            <strong>Темперамент:</strong> {cat.breeds[0]?.temperament || 'Неизвестно'}
          </Typography>
          <Typography variant="body2">
            <strong>Происхождение:</strong> {cat.breeds[0]?.origin || 'Неизвестно'}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
