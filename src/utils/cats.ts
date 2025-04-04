import { cache } from 'react';
import type { Cat } from '@/types';
import fs from 'fs';
import path from 'path';

export const getCats = cache(async () => {
  const cacheFile = path.join(process.cwd(), 'cats-cache.json');
  
  if (fs.existsSync(cacheFile)) {
    return JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
  }

  console.log('getCats API call');
  const API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY;
  const API_URL = 'https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=25';

  const response = await fetch(API_URL, {
    headers: {
      'x-api-key': API_KEY || ''
    }
  });
  const cats = await response.json();
  
  fs.writeFileSync(cacheFile, JSON.stringify(cats));
  
  console.log('getCats API call response', cats.map((cat: Cat) => cat.id));
  return cats;
}); 