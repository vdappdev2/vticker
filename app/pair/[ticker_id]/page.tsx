import { notFound } from 'next/navigation';
import { fetchTradingPair, fetchConverters } from '@/lib/api';
import PairDetailView from '@/components/pairs/PairDetailView';

interface PairPageProps {
  params: {
    ticker_id: string;
  };
}

export default async function PairPage({ params }: PairPageProps) {
  const { ticker_id } = params;

  // Fetch pair data
  const pair = await fetchTradingPair(ticker_id);

  if (!pair) {
    notFound();
  }

  // Fetch converters to get pool name
  const { active_converters } = await fetchConverters();
  const poolNames: Record<string, string> = {};
  active_converters.forEach(converter => {
    poolNames[converter.currency_id] = converter.name;
  });

  const poolName = poolNames[pair.pool_id];

  return <PairDetailView pair={pair} poolName={poolName} />;
}
