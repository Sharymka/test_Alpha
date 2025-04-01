export async function generateStaticParams() {
  // В реальном приложении здесь нужно получить список всех котов
  // Для демонстрации возвращаем пустой массив
  return [{id: "1"}]
}

import { ProductsPage } from './ProductsPage';

export default function ProductsPageWrapper({ params }: { params: { id: string } }) {
  return <ProductsPage />;
}