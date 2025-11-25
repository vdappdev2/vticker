import { notFound } from 'next/navigation';
import { fetchConverter, fetchTradingPairs } from '@/lib/api';
import ConverterDetailView from '@/components/converters/ConverterDetailView';

interface ConverterPageProps {
  params: {
    name: string;
  };
}

export default async function ConverterPage({ params }: ConverterPageProps) {
  const { name } = params;

  // Fetch converter data
  const converter = await fetchConverter(name);

  if (!converter) {
    notFound();
  }

  // Fetch all trading pairs to find which ones use this converter
  const allPairs = await fetchTradingPairs();
  const relatedPairs = allPairs.filter(pair => pair.pool_id === converter.currency_id);

  return <ConverterDetailView converter={converter} relatedPairs={relatedPairs} />;
}
