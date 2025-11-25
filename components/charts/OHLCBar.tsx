import { formatCurrency } from '@/lib/utils';

interface OHLCBarProps {
  open: string;
  high: string;
  low: string;
  close: string;
  currency?: string;
}

export default function OHLCBar({ open, high, low, close, currency = '' }: OHLCBarProps) {
  const openPrice = parseFloat(open);
  const highPrice = parseFloat(high);
  const lowPrice = parseFloat(low);
  const closePrice = parseFloat(close);

  // Determine if price went up or down
  const isPositive = closePrice >= openPrice;

  // Calculate percentages for positioning
  const range = highPrice - lowPrice;
  const openPercent = range > 0 ? ((openPrice - lowPrice) / range) * 100 : 50;
  const closePercent = range > 0 ? ((closePrice - lowPrice) / range) * 100 : 50;

  return (
    <div className="space-y-4">
      {/* Labels */}
      <div className="flex justify-between text-sm">
        <div>
          <div className="text-gray-400 mb-1">Low</div>
          <div className="font-medium price-mono">{formatCurrency(low, 6)}</div>
        </div>
        <div className="text-right">
          <div className="text-gray-400 mb-1">High</div>
          <div className="font-medium price-mono">{formatCurrency(high, 6)}</div>
        </div>
      </div>

      {/* Visual Bar */}
      <div className="relative h-16 bg-[var(--card)] rounded-lg border border-[var(--border)] overflow-hidden">
        {/* Price range bar */}
        <div className="absolute inset-0 flex items-center px-4">
          <div className="w-full h-2 bg-gray-700 rounded-full relative">
            {/* Open marker */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-6 rounded"
              style={{
                left: `${openPercent}%`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: isPositive ? 'var(--success)' : 'var(--error)',
                opacity: 0.7,
              }}
            />

            {/* Close marker */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-6 rounded"
              style={{
                left: `${closePercent}%`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: isPositive ? 'var(--success)' : 'var(--error)',
              }}
            />

            {/* Range line between open and close */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-4 rounded"
              style={{
                left: `${Math.min(openPercent, closePercent)}%`,
                width: `${Math.abs(closePercent - openPercent)}%`,
                backgroundColor: isPositive ? 'var(--success)' : 'var(--error)',
                opacity: 0.5,
              }}
            />
          </div>
        </div>
      </div>

      {/* Open/Close values */}
      <div className="flex justify-between text-sm">
        <div>
          <div className="text-gray-400 mb-1">Open</div>
          <div className="font-medium price-mono text-gray-300">{formatCurrency(open, 6)}</div>
        </div>
        <div className="text-right">
          <div className="text-gray-400 mb-1">Close</div>
          <div className={`font-medium price-mono ${isPositive ? 'text-positive' : 'text-negative'}`}>
            {formatCurrency(close, 6)}
          </div>
        </div>
      </div>
    </div>
  );
}
