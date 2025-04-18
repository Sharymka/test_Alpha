'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { Container, Typography, Box, Button } from '@mui/material';
import { updateCat } from '@/store/features/cats/catsSlice';
import type { AppDispatch, RootState } from '@/store';
import type { Cat } from '@/types';
import { CatForm } from '@/components/CatForm';

export default function EditCatForm() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const cat = useSelector((state: RootState) => 
    state.cats.items.find(item => item.id === id)
  );

  const initialData = cat ? {
    name: cat.breeds[0]?.name || '',
    origin: cat.breeds[0]?.origin || '',
    temperament: Array.isArray(cat.breeds[0]?.temperament) 
      ? cat.breeds[0].temperament.join(' ') 
      : cat.breeds[0]?.temperament || '',
    description: cat.breeds[0]?.description || '',
    imageUrl: cat.url,
    width: String(cat.width),
    height: String(cat.height),
    id: cat.id
  } : undefined;

  const handleSubmit = (cat: Cat) => {
    dispatch(updateCat(cat));
    router.push('/products');
  };

  if (!cat) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Кот не найден</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Редактировать карточку кота
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, gap: 2 }}>
        <Button 
          variant="contained" 
          onClick={() => router.back()}
          sx={{ bgcolor: 'grey.500', '&:hover': { bgcolor: 'grey.400' } }}
        >
          Назад
        </Button>
      </Box>
      <CatForm 
        initialData={initialData}
        onSubmit={handleSubmit}
        submitButtonText="Сохранить"
      />
    </Container>
  );
} 