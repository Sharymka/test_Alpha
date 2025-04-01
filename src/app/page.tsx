export async function generateStaticParams() {
  // В реальном приложении здесь нужно получить список всех котов
  // Для демонстрации возвращаем пустой массив
  return []
}

import HomePage from './HomePage';

export default function HomePageWrapper({ params }: { params: { id: string } }) {
  return <HomePage />;
}
