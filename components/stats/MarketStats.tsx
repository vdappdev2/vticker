import { formatCompact, formatCurrency } from '@/lib/utils';
import Card from '../ui/Card';

interface MarketStatsProps {
  stats: {
    total_pairs: number;
    total_volume_24h: string;
    active_converters: number;
    vrsc_price: string;
  };
}

export default function MarketStats({ stats }: MarketStatsProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 fade-in">
      {/* Total Trading Pairs */}
      <Card>
        <div className="text-gray-400 text-sm mb-2">Trading Pairs</div>
        <div className="text-3xl font-bold text-white mb-1">
          {stats.total_pairs}
        </div>
        <div className="text-xs text-gray-500">Active pairs</div>
      </Card>

      {/* 24h Volume */}
      <Card>
        <div className="text-gray-400 text-sm mb-2">24h Volume</div>
        <div className="text-3xl font-bold text-white mb-1">
          ${formatCompact(stats.total_volume_24h)}
        </div>
        <div className="text-xs text-gray-500">Total traded</div>
      </Card>

      {/* Active Converters */}
      <Card>
        <div className="text-gray-400 text-sm mb-2">Active Converters</div>
        <div className="text-3xl font-bold text-white mb-1">
          {stats.active_converters}
        </div>
        <div className="text-xs text-gray-500">Liquidity pools</div>
      </Card>

      {/* VRSC Price */}
      <Card>
        <div className="text-gray-400 text-sm mb-2">VRSC Price</div>
        <div className="text-3xl font-bold text-[var(--primary)] mb-1 price-mono">
          ${formatCurrency(stats.vrsc_price, 4)}
        </div>
        <div className="text-xs text-gray-500">Current price</div>
      </Card>
    </div>
  );
}
