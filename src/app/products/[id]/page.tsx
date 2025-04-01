export async function generateStaticParams() {
  // В реальном приложении здесь нужно получить список всех котов
  // Для демонстрации возвращаем пустой массив
  return [{id: "1"}]
}

import { CatDetailsPage } from './CatDetailsPage';

export default function CatDetailsPageWrapper({ params }: { params: { id: string } }) {
  return <CatDetailsPage />;
}
