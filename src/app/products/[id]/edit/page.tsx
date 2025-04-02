import { EditCatPage } from './EditCatPage';

export async function generateStaticParams() {
  return [{id: "1"}];
}

export default function EditCatPageWrapper({ params }: { params: { id: string } }) {
  return <EditCatPage />;
}
