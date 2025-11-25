import Link from 'next/link';
import { fetchTradingPairs, fetchMarketStats, fetchConverters } from '@/lib/api';
import { sortBy } from '@/lib/utils';
import MarketStats from '@/components/stats/MarketStats';
import PairTable from '@/components/pairs/PairTable';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default async function Home() {
  // Fetch data server-side (no CORS issues)
  const pairs = await fetchTradingPairs();
  const stats = await fetchMarketStats();
  const { active_converters } = await fetchConverters();

  // Create pool_id -> converter name mapping
  const poolNames: Record<string, string> = {};
  active_converters.forEach(converter => {
    poolNames[converter.currency_id] = converter.name;
  });

  // Sort pairs by volume (descending) for top pairs display
  const topPairs = sortBy(pairs, 'target_volume', 'desc').slice(0, 10);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 fade-in">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-[var(--primary)]">Verus</span> DeFi Ticker
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Track pairs, converters,
          and volumes for defi at the consensus level.
        </p>
      </section>

      {/* Market Stats */}
      <MarketStats stats={stats} />

      {/* Top Trading Pairs */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Top Trading Pairs</h2>
          <Link href="/pairs">
            <Button variant="outline">View All Pairs</Button>
          </Link>
        </div>

        <Card className="p-0 overflow-hidden">
          <PairTable pairs={topPairs} poolNames={poolNames} />
        </Card>
      </section>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/pairs">
          <Card hover className="h-full">
            <div className="text-4xl mb-4">📈📉</div>
            <h3 className="text-xl font-bold mb-2">All Trading Pairs</h3>
            <p className="text-gray-400">
              Browse and search through {pairs.length}+ active trading pairs
              with real-time prices and 24h data.
            </p>
          </Card>
        </Link>

        <Link href="/converters">
          <Card hover className="h-full">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-bold mb-2">Basket Currencies</h3>
            <p className="text-gray-400">
              Explore Verus AMMs and their
              multi-reserve compositions.
            </p>
          </Card>
        </Link>

        <Link href="/coin/vrsc">
          <Card hover className="h-full">
            <div className="text-4xl mb-4">🕊️</div>
            <h3 className="text-xl font-bold mb-2">Verus Coin</h3>
            <p className="text-gray-400">
              View VRSC metrics, circulating supply, and all
              VRSC trading pairs.
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
