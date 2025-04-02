import { generateStaticPaths } from '@/utils/generateStaticPaths';
import { CatDetailsPage } from './CatDetailsPage';

export async function generateStaticParams() {
  return generateStaticPaths();
}

export default function CatDetailsPageWrapper({ params }: { params: { id: string } }) {
  return <CatDetailsPage id={params.id} />;
}
