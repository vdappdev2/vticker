import Link from 'next/link';
import { TradingPair } from '@/types';
import { calculate24hChange, formatCurrency, formatCompact, formatPercentage } from '@/lib/utils';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import OHLCBar from '../charts/OHLCBar';

interface PairDetailViewProps {
  pair: TradingPair;
  poolName?: string;
}

export default function PairDetailView({ pair, poolName }: PairDetailViewProps) {
  const change24h = calculate24hChange(pair.open, pair.last_price);
  const spread = parseFloat(pair.ask) - parseFloat(pair.bid);
  const spreadPercent = parseFloat(pair.bid) > 0
    ? (spread / parseFloat(pair.bid)) * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {pair.base_currency}/{pair.target_currency}
          </h1>
          <p className="text-gray-400">
            {poolName || pair.ticker_id}
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <div className="text-3xl font-bold price-mono text-[var(--primary)]">
            {formatCurrency(pair.last_price, 8)}
          </div>
          <Badge value={change24h} />
        </div>
      </div>

      {/* 24h OHLC Chart */}
      <Card>
        <h2 className="text-xl font-bold mb-4">24 Hour Price Range</h2>
        <OHLCBar
          open={pair.open}
          high={pair.high}
          low={pair.low}
          close={pair.last_price}
          currency={pair.target_currency}
        />
      </Card>

      {/* Price Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-gray-400 text-sm mb-2">Current Price</div>
          <div className="text-2xl font-bold price-mono">
            {formatCurrency(pair.last_price, 8)}
          </div>
          <div className="text-xs text-gray-500 mt-1">{pair.target_currency}</div>
        </Card>

        <Card>
          <div className="text-gray-400 text-sm mb-2">24h High</div>
          <div className="text-2xl font-bold price-mono text-positive">
            {formatCurrency(pair.high, 8)}
          </div>
          <div className="text-xs text-gray-500 mt-1">{pair.target_currency}</div>
        </Card>

        <Card>
          <div className="text-gray-400 text-sm mb-2">24h Low</div>
          <div className="text-2xl font-bold price-mono text-negative">
            {formatCurrency(pair.low, 8)}
          </div>
          <div className="text-xs text-gray-500 mt-1">{pair.target_currency}</div>
        </Card>

        <Card>
          <div className="text-gray-400 text-sm mb-2">24h Open</div>
          <div className="text-2xl font-bold price-mono">
            {formatCurrency(pair.open, 8)}
          </div>
          <div className="text-xs text-gray-500 mt-1">{pair.target_currency}</div>
        </Card>
      </div>

      {/* Market Depth & Volume */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Depth */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Market Depth</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-gray-400">Bid Price</div>
              <div className="text-lg font-bold price-mono text-positive">
                {formatCurrency(pair.bid, 8)}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-400">Ask Price</div>
              <div className="text-lg font-bold price-mono text-negative">
                {formatCurrency(pair.ask, 8)}
              </div>
            </div>
            <div className="border-t border-[var(--border)] pt-4">
              <div className="flex justify-between items-center">
                <div className="text-gray-400">Spread</div>
                <div className="text-right">
                  <div className="font-bold price-mono">{formatCurrency(spread, 8)}</div>
                  <div className="text-xs text-gray-500">{spreadPercent.toFixed(3)}%</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Volume */}
        <Card>
          <h2 className="text-xl font-bold mb-4">24h Volume</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-gray-400">{pair.base_currency}</div>
              <div className="text-lg font-bold price-mono">
                {formatCurrency(pair.base_volume, 8)}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-400">{pair.target_currency}</div>
              <div className="text-lg font-bold price-mono">
                {formatCurrency(pair.target_volume, 8)}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Liquidity & Pool Info */}
      <Card className="bg-gradient-to-r from-[var(--card)] to-[#1a1f3a]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">Liquidity Pool</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Pool Name:</span>
                <span className="font-medium">{poolName || 'Unknown'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Total Liquidity:</span>
                <span className="font-bold text-[var(--primary)] text-lg">
                  ${formatCompact(pair.liquidity_in_usd)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Pool ID:</span>
                <code className="text-xs bg-[var(--background)] px-2 py-1 rounded">
                  {pair.pool_id}
                </code>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link href={`/converter/${poolName?.toLowerCase() || pair.pool_id}`}>
              <Button variant="primary" size="lg" className="w-full">
                View Pool Details
              </Button>
            </Link>
            <Link href="/pairs">
              <Button variant="outline" size="lg" className="w-full">
                Back to All Pairs
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
