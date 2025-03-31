import { FormData, ValidationErrors } from '@/types/forms';

export const validateForm = (formData: FormData): ValidationErrors => {
  const newErrors: ValidationErrors = {};
  
  if (!formData.name) {
    newErrors.name = 'Название породы обязательно';
  } else if (!/^[а-яА-Яa-zA-Z]{2,}$/.test(formData.name)) {
    newErrors.name = 'Название должно содержать только буквы и быть длиннее 2 символов';
  }

  if (!formData.origin) {
    newErrors.origin = 'Происхождение обязательно';
  } else if (!/^[а-яА-Яa-zA-Z]{2,}$/.test(formData.origin)) {
    newErrors.origin = 'Происхождение должно содержать только буквы и быть длиннее 2 символов';
  }

  if (!formData.temperament) {
    newErrors.temperament = 'Темперамент обязателен';
  } else if (!/^[а-яА-Яa-zA-Z,\s]{10,}$/.test(formData.temperament) || formData.temperament.split(/[,\s]+/).length < 2) {
    newErrors.temperament = 'Темперамент должен содержать несколько слов';
  }

  if (!formData.description) {
    newErrors.description = 'Описание обязательно';
  } else if (formData.description.length < 2) {
    newErrors.description = 'Описание должно содержать несколько слов';
  }

  if (!formData.imageUrl) {
    newErrors.imageUrl = 'Ссылка на изображение обязательна';
  } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(formData.imageUrl)) {
    newErrors.imageUrl = 'Введите корректную ссылку на изображение (jpg, jpeg, png, gif)';
  }

  if (!formData.width) {
    newErrors.width = 'Ширина обязательна';
  } else if (!/^\d{2,}$/.test(formData.width)) {
    newErrors.width = 'Ширина должна состоять из 2 цифр';
  }

  if (!formData.height) {
    newErrors.height = 'Высота обязательна';
  } else if (!/^\d{2,}$/.test(formData.height)) {
    newErrors.height = 'Высота должна состоять из 2 цифр';
  }

  return newErrors;
}; 