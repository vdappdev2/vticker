import { notFound } from 'next/navigation';
import { fetchConverter, fetchTradingPairs } from '@/lib/api';
import ConverterDetailView from '@/components/converters/ConverterDetailView';

interface ConverterPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function ConverterPage({ params }: ConverterPageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  // Fetch converter data
  const converter = await fetchConverter(decodedName);

  if (!converter) {
    notFound();
  }

  // Fetch all trading pairs to find which ones use this converter
  const allPairs = await fetchTradingPairs();
  const relatedPairs = allPairs.filter(pair => pair.pool_id === converter.currency_id);

  return <ConverterDetailView converter={converter} relatedPairs={relatedPairs} />;
}
