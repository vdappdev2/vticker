import Link from 'next/link';
import { TradingPair } from '@/types';
import { calculate24hChange, formatCurrency, formatCompact } from '@/lib/utils';
import Badge from '../ui/Badge';

type SortColumn = 'pair' | 'price' | 'change' | 'volume' | 'liquidity';
type SortOrder = 'asc' | 'desc';

interface PairTableProps {
  pairs: TradingPair[];
  limit?: number;
  showLiquidity?: boolean;
  poolNames?: Record<string, string>;
  sortColumn?: SortColumn;
  sortOrder?: SortOrder;
  onSort?: (column: SortColumn) => void;
}

export default function PairTable({ pairs, limit, showLiquidity = true, poolNames, sortColumn, sortOrder, onSort }: PairTableProps) {
  const displayPairs = limit ? pairs.slice(0, limit) : pairs;

  const SortableHeader = ({ column, children, align = 'right' }: { column: SortColumn; children: React.ReactNode; align?: 'left' | 'right' }) => {
    const isActive = sortColumn === column;
    const isSortable = !!onSort;

    if (!isSortable) {
      return (
        <th className={`text-${align} py-3 px-4 text-gray-400 font-medium text-sm`}>
          {children}
        </th>
      );
    }

    return (
      <th
        className={`text-${align} py-3 px-4 font-medium text-sm cursor-pointer hover:text-white transition-colors select-none ${
          isActive ? 'text-[var(--primary)]' : 'text-gray-400'
        }`}
        onClick={() => onSort(column)}
      >
        <div className={`flex items-center gap-2 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
          <span>{children}</span>
          {isActive && (
            <svg
              className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 15l7-7 7 7" />
            </svg>
          )}
        </div>
      </th>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--border)]">
            <SortableHeader column="pair" align="left">
              Pair
            </SortableHeader>
            <SortableHeader column="price">
              Price
            </SortableHeader>
            <SortableHeader column="change">
              24h Change
            </SortableHeader>
            <SortableHeader column="volume">
              24h Volume
            </SortableHeader>
            {showLiquidity && (
              <SortableHeader column="liquidity">
                Liquidity
              </SortableHeader>
            )}
          </tr>
        </thead>
        <tbody>
          {displayPairs.map((pair, index) => {
            const change24h = calculate24hChange(pair.open, pair.last_price);
            return (
              <tr
                key={`${pair.pool_id}-${index}`}
                className="border-b border-[var(--border)] hover:bg-[var(--card-hover)] transition-colors"
              >
                <td className="py-4 px-4">
                  <Link
                    href={`/pair/${pair.ticker_id}`}
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    <div className="font-medium">
                      {pair.base_currency}/{pair.target_currency}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {poolNames?.[pair.pool_id] || pair.ticker_id}
                    </div>
                  </Link>
                </td>
                <td className="py-4 px-4 text-right price-mono">
                  <div className="font-medium">
                    {formatCurrency(pair.last_price, 6)}
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <Badge value={change24h} />
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="font-medium">
                    ${formatCompact(pair.target_volume)}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {formatCompact(pair.base_volume)} {pair.base_currency}
                  </div>
                </td>
                {showLiquidity && (
                  <td className="py-4 px-4 text-right">
                    <div className="font-medium">
                      ${formatCompact(pair.liquidity_in_usd)}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
