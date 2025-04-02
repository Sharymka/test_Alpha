import { getCats } from '@/utils/cats';
import { ProductsPage } from './ProductsPage';

export default async function ProductsPageWrapper() {
  const cats = await getCats();
  return <ProductsPage initialCats={cats} />;
}