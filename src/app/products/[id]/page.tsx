export async function generateStaticParams() {
  return [{id: "1"}]
}

import { CatDetailsPage } from './CatDetailsPage';

export default function CatDetailsPageWrapper({ params }: { params: { id: string } }) {
  return <CatDetailsPage />;
}
