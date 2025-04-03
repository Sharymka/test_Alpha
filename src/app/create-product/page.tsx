'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Container, Typography } from '@mui/material';
import { addCat } from '@/store/features/cats/catsSlice';
import type { AppDispatch } from '@/store';
import type { Cat } from '@/types';
import { CatForm } from '@/components/CatForm';
import { getNextAvailableId } from '@/utils/generateStaticPaths';

export default function CreateCatPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = (catData: Cat) => {
    const newCat: Cat = {
      ...catData,
      id: getNextAvailableId(),
    };
    dispatch(addCat(newCat));
    router.push(`/products`);
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
