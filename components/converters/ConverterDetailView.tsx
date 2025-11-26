import Link from 'next/link';
import { Converter, TradingPair } from '@/types';
import { formatCurrency, formatCompact } from '@/lib/utils';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ConverterDetailViewProps {
  converter: Converter;
  relatedPairs: TradingPair[];
}

export default function ConverterDetailView({ converter, relatedPairs }: ConverterDetailViewProps) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">{converter.name}</h1>
          <p className="text-gray-400 text-sm font-mono">{converter.currency_id}</p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <div className="text-sm text-gray-400">Total Supply</div>
          <div className="text-3xl font-bold text-[var(--primary)] price-mono">
            {formatCompact(converter.supply)}
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-gray-400 text-sm mb-2">Total Liquidity</div>
          <div className="text-2xl font-bold">
            {converter.total_liquidity_usd > 0
              ? `$${formatCompact(converter.total_liquidity_usd.toString())}`
              : 'Not Available'
            }
          </div>
        </Card>

        <Card>
          <div className="text-gray-400 text-sm mb-2">Reserve Currencies</div>
          <div className="text-2xl font-bold">{converter.reserve_currencies.length}</div>
        </Card>

        <Card>
          <div className="text-gray-400 text-sm mb-2">Chain</div>
          <div className="text-2xl font-bold">{converter.chain || converter.source_chain || 'VRSC'}</div>
        </Card>
      </div>

      {/* Reserve Composition */}
      <Card>
        <h2 className="text-2xl font-bold mb-4">Reserve Composition</h2>
        <div className="space-y-3">
          {converter.reserve_currencies.map((reserve, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{reserve.ticker}</span>
                  <span className="text-gray-500 text-xs font-mono">
                    {reserve.currency_id.substring(0, 8)}...
                  </span>
                </div>
                <span className="font-bold text-[var(--primary)]">
                  {(reserve.weight * 100).toFixed(2)}%
                </span>
              </div>

              {/* Weight bar */}
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full"
                  style={{ width: `${reserve.weight * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Reserves: {formatCurrency(reserve.reserves, 8)}</span>
                <span>Price: {formatCurrency(reserve.price_in_reserve, 8)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Reserve Currencies Table */}
      <Card>
        <h2 className="text-2xl font-bold mb-4">Reserve Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Currency</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Weight</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Reserves</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Price</th>
              </tr>
            </thead>
            <tbody>
              {converter.reserve_currencies.map((reserve, index) => (
                <tr
                  key={index}
                  className="border-b border-[var(--border)] hover:bg-[var(--card-hover)] transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="font-medium">{reserve.ticker}</div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">
                      {reserve.currency_id.substring(0, 12)}...
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-bold text-[var(--primary)]">
                      {(reserve.weight * 100).toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right price-mono">
                    {formatCurrency(reserve.reserves, 8)}
                  </td>
                  <td className="py-3 px-4 text-right price-mono">
                    {formatCurrency(reserve.price_in_reserve, 8)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Related Trading Pairs */}
      {relatedPairs.length > 0 && (
        <Card>
          <h2 className="text-2xl font-bold mb-4">Trading Pairs Using This Basket</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {relatedPairs.map((pair, index) => (
              <Link
                key={index}
                href={`/pair/${pair.ticker_id}`}
                className="block p-3 bg-[var(--background)] rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
              >
                <div className="font-medium">{pair.ticker_id}</div>
                <div className="text-sm text-gray-400 mt-1">
                  Vol: {formatCompact(pair.target_volume)} {pair.target_currency}
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}

      {/* Back Button */}
      <div className="flex justify-start">
        <Link href="/converters">
          <Button variant="outline" size="lg">
            Back to All Converters
          </Button>
        </Link>
      </div>
    </div>
  );
}
