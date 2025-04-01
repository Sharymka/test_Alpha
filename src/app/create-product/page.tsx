'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Container, Typography } from '@mui/material';
import { addCat } from '@/store/features/cats/catsSlice';
import type { AppDispatch } from '@/store';
import type { Cat } from '@/types';
import { CatForm } from '@/components/CatForm';

export default function CreateCatPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = (cat: Cat) => {
    dispatch(addCat(cat));
    router.push('/products');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Создать карточку кота
      </Typography>
      <CatForm 
        onSubmit={handleSubmit}
        submitButtonText="Создать"
      />
    </Container>
  );
}
