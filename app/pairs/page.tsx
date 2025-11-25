import { fetchTradingPairs, fetchConverters } from '@/lib/api';
import PairsClient from '@/components/pairs/PairsClient';

export default async function PairsPage() {
  // Fetch data server-side
  const pairs = await fetchTradingPairs();
  const { active_converters } = await fetchConverters();

  // Create pool_id -> converter name mapping
  const poolNames: Record<string, string> = {};
  active_converters.forEach(converter => {
    poolNames[converter.currency_id] = converter.name;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">All Trading Pairs</h1>
        <p className="text-gray-400">
          Browse and search through all active trading pairs on Verus DeFi
        </p>
      </div>

      <PairsClient pairs={pairs} poolNames={poolNames} />
    </div>
  );
}
