'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { addCat } from '@/store/features/cats/catsSlice';
import type { Cat } from '@/types';
import { validateForm } from '@/utils/validation';
import type { AppDispatch } from '@/store';

export default function CreateCatPage() {
  const dispatch = useDispatch<AppDispatch>();
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
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleTemperamentBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const words = value
      .split(/[,\s]+/)
      .map(item => item.trim())
      .filter(item => item !== '')
      .filter(word => /^[а-яА-Яa-zA-Z]+$/.test(word));
    
    setFormData({ ...formData, temperament: words.join(' ') });
  };

  const handleDescriptionBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Проверяем, что все слова состоят из букв или цифр
    const hasInvalidWords = value
      .split(/[.,!?:;\s]+/)
      .map(item => item.trim())
      .filter(item => item !== '')
      .some(word => !/^[а-яА-Яa-zA-Z0-9]+$/.test(word));
    
    if (hasInvalidWords) {
      setErrors({ ...errors, description: 'Описание должно содержать только буквы и цифры' });
      return;
    }
    
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    const newCat: Cat = {
      id: Date.now().toString(),
      url: formData.imageUrl,
      width: Number(formData.width),
      height: Number(formData.height),
      temperament: formData.temperament.split(' '),
      breeds: [{
        name: formData.name,
        origin: formData.origin,
        description: formData.description,
      }],
    };
    dispatch(addCat(newCat));
    router.push('/products');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Создать карточку кота
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
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField 
          label="Название породы" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField 
          label="Происхождение" 
          name="origin" 
          value={formData.origin} 
          onChange={handleChange} 
          required 
          error={!!errors.origin}
          helperText={errors.origin}
        />
        <TextField 
          label="Темперамент" 
          name="temperament" 
          value={formData.temperament} 
          onChange={handleChange}
          onBlur={handleTemperamentBlur}
          required 
          error={!!errors.temperament}
          helperText={errors.temperament}
        />
        <TextField 
          label="Описание" 
          name="description" 
          value={formData.description} 
          onChange={handleChange}
          onBlur={handleDescriptionBlur}
          required 
          multiline 
          rows={4} 
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField 
          label="Ссылка на изображение" 
          name="imageUrl" 
          value={formData.imageUrl} 
          onChange={handleChange} 
          required 
          error={!!errors.imageUrl}
          helperText={errors.imageUrl}
        />
        <TextField 
          label="Ширина" 
          name="width" 
          type="number" 
          value={formData.width} 
          onChange={handleChange} 
          required 
          error={!!errors.width}
          helperText={errors.width}
        />
        <TextField 
          label="Высота" 
          name="height" 
          type="number" 
          value={formData.height} 
          onChange={handleChange} 
          required 
          error={!!errors.height}
          helperText={errors.height}
        />
        <Button 
          type="submit" 
          variant="contained" 
          sx={{ bgcolor: 'grey.500', '&:hover': { bgcolor: 'grey.400' } }}
        >
          Создать
        </Button>
      </Box>
    </Container>
  );
}
