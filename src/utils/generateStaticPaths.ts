import { getCats } from './cats';
import type { Cat } from '@/types';

const RESERVED_IDS = Array.from({ length: 50 }, (_, i) => `reserved-${i + 26}`);

let usedReservedIds: string[] = [];

export function getNextAvailableId(): string {
  const nextId = RESERVED_IDS.find(id => !usedReservedIds.includes(id));
  if (nextId) {
    usedReservedIds.push(nextId);
    return nextId;
  }
  throw new Error('Все зарезервированные ID использованы');
}

export async function generateStaticPaths() {
  const existingCats = await getCats();
  
  const paths = [
    ...existingCats.map((cat: Cat) => ({ id: cat.id })),
    ...RESERVED_IDS.map(id => ({ id }))
  ];
  console.log('paths', paths);

  return paths;
} 