import { generateStaticPaths } from '@/utils/generateStaticPaths';
import { EditCatPage } from './EditCatPage';

export async function generateStaticParams() {
  return generateStaticPaths();
}

export default function EditCatPageWrapper({ params }: { params: { id: string } }) {
  return <EditCatPage id={params.id} />;
}
