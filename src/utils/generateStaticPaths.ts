import { getCats } from './cats';
import type { Cat } from '@/types';

export async function generateStaticPaths() {
  const cats = await getCats();
  return cats.map((cat: Cat) => ({
    id: cat.id
  }));
} 