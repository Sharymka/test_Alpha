import { cache } from 'react';
import type { Cat } from '@/types';

export const getCats = cache(async () => {
  console.log('getCats API call');
  const API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY;
  const API_URL = 'https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=25';

  const response = await fetch(API_URL, {
    headers: {
      'x-api-key': API_KEY || ''
    }
  });
  const cats = await response.json();
  console.log('getCats API call response', cats.map((cat: Cat) => cat.id));
  return cats;
}); 