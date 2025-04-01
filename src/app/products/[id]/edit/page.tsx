export async function generateStaticParams() {
  // В реальном приложении здесь нужно получить список всех котов
  // Для демонстрации возвращаем пустой массив
  return [{id: "1"}];
} 

import { EditCatPage } from './EditCatPage';

export default function EditCatPageWrapper({ params }: { params: { id: string } }) {
  return <EditCatPage />;
}