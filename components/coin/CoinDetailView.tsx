import Link from 'next/link';
import { TradingPair, VerusSupply } from '@/types';
import { formatCurrency, formatCompact, calculate24hChange } from '@/lib/utils';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface CoinDetailViewProps {
  vrscPrice: string;
  vrscChange24h: number;
  supply: VerusSupply;
  vrscPairs: TradingPair[];
  totalVolume24h: number;
}

export default function CoinDetailView({
  vrscPrice,
  vrscChange24h,
  supply,
  vrscPairs,
  totalVolume24h
}: CoinDetailViewProps) {
  const marketCap = parseFloat(supply.circulating_supply) * parseFloat(vrscPrice);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-[var(--primary)]">Verus Coin</span> (VRSC)
          </h1>
          <p className="text-gray-400">
            Consensus coin of the Verus blockchain
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <div className="text-3xl font-bold price-mono text-[var(--primary)]">
            ${formatCurrency(vrscPrice, 4)}
          </div>
          <Badge value={vrscChange24h} />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="text-gray-400 text-sm mb-2">Market Cap</div>
          <div className="text-2xl font-bold text-white">
            ${formatCompact(marketCap.toString())}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Price × Circulating Supply
          </div>
        </Card>

        <Card>
          <div className="text-gray-400 text-sm mb-2">24h Volume</div>
          <div className="text-2xl font-bold text-[var(--primary)]">
            ${formatCompact(totalVolume24h.toString())}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Across {vrscPairs.length} pairs
          </div>
        </Card>

        <Card>
          <div className="text-gray-400 text-sm mb-2">Circulating Supply</div>
          <div className="text-2xl font-bold price-mono">
            {formatCompact(supply.circulating_supply)}
          </div>
          <div className="text-xs text-gray-500 mt-1">VRSC</div>
        </Card>

        <Card>
          <div className="text-gray-400 text-sm mb-2">Total Supply</div>
          <div className="text-2xl font-bold price-mono">
            {formatCompact(supply.total_supply)}
          </div>
          <div className="text-xs text-gray-500 mt-1">VRSC</div>
        </Card>
      </div>

      {/* Supply Breakdown */}
      <Card>
        <h2 className="text-2xl font-bold mb-4">Supply Breakdown</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-gray-400">Total Supply</div>
            <div className="text-lg font-bold price-mono">
              {formatCurrency(supply.total_supply, 2)} VRSC
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-400">Circulating Supply</div>
            <div className="text-lg font-bold price-mono text-[var(--primary)]">
              {formatCurrency(supply.circulating_supply, 2)} VRSC
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-400">Locked Supply</div>
            <div className="text-lg font-bold price-mono text-gray-400">
              {formatCurrency(supply.locked_supply.vrsc_in_converters, 2)} VRSC
            </div>
          </div>

          {/* Visual representation */}
          <div className="pt-4 border-t border-[var(--border)]">
            <div className="text-sm text-gray-400 mb-2">Supply Distribution</div>
            <div className="relative h-8 bg-gray-700 rounded-lg overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                style={{
                  width: `${(parseFloat(supply.circulating_supply) / parseFloat(supply.total_supply)) * 100}%`
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                {((parseFloat(supply.circulating_supply) / parseFloat(supply.total_supply)) * 100).toFixed(1)}% Circulating
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* VRSC Trading Pairs */}
      <Card>
        <h2 className="text-2xl font-bold mb-4">VRSC Trading Pairs</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Pair</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Price</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">24h Change</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">24h Volume</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Liquidity</th>
              </tr>
            </thead>
            <tbody>
              {vrscPairs.map((pair, index) => {
                const change24h = calculate24hChange(pair.open, pair.last_price);
                return (
                  <tr
                    key={index}
                    className="border-b border-[var(--border)] hover:bg-[var(--card-hover)] transition-colors"
                  >
                    <td className="py-4 px-4">
                      <Link
                        href={`/pair/${pair.ticker_id}`}
                        className="hover:text-[var(--primary)] transition-colors"
                      >
                        <div className="font-medium">{pair.ticker_id}</div>
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-right price-mono">
                      <div className="font-medium">{formatCurrency(pair.last_price, 6)}</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Badge value={change24h} />
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="font-medium">${formatCompact(pair.target_volume)}</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="font-medium">${formatCompact(pair.liquidity_in_usd)}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
