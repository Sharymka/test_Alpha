import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Cat } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY
const API_URL = 'https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=10';

if (!API_KEY) {
  throw new Error('CAT_API_KEY is not defined in environment variables');
}

export const fetchCats = createAsyncThunk(
    'cats/fetchCats',
    async () => {
      const response = await fetch(API_URL, {
        headers: {
          'x-api-key': API_KEY
        }
      });
      if (!response.ok) throw new Error('Failed to fetch cats');
      return response.json() as Promise<Cat[]>;
    }
  );