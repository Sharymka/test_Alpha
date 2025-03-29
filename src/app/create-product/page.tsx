'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { addCat } from '@/store/features/cats/catsSlice';
import type { Cat } from '@/types';

export default function CreateCatPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    temperament: '',
    description: '',
    imageUrl: '',
    width: '',
    height: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCat: Cat = {
      id: Date.now().toString(),
      url: formData.imageUrl,
      width: Number(formData.width),
      height: Number(formData.height),
      breeds: [{
        name: formData.name,
        origin: formData.origin,
        temperament: formData.temperament,
        description: formData.description,
      }],
    };
    dispatch(addCat(newCat));
    router.push('/');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Создать карточку кота
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, gap: 2 }}>
        <Button 
            variant="contained" 
            onClick={() =>router.back()}
            sx={{ bgcolor: 'grey.500', '&:hover': { bgcolor: 'grey.400' } }}
          >
            Назад
          </Button>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Название породы" name="name" value={formData.name} onChange={handleChange} required />
        <TextField label="Происхождение" name="origin" value={formData.origin} onChange={handleChange} required />
        <TextField label="Темперамент" name="temperament" value={formData.temperament} onChange={handleChange} required />
        <TextField label="Описание" name="description" value={formData.description} onChange={handleChange} required multiline rows={4} />
        <TextField label="Ссылка на изображение" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
        <TextField label="Ширина" name="width" type="number" value={formData.width} onChange={handleChange} required />
        <TextField label="Высота" name="height" type="number" value={formData.height} onChange={handleChange} required />
        <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        sx={{ bgcolor: 'grey.500', '&:hover': { bgcolor: 'grey.400' } }}
        >
          Создать
        </Button>
      </Box>
    </Container>
  );
}
