import Link from 'next/link';
import { Converter } from '@/types';
import { formatCompact, formatCurrency } from '@/lib/utils';

type SortColumn = 'name' | 'reserves' | 'supply' | 'liquidity';
type SortOrder = 'asc' | 'desc';

interface ConverterTableProps {
  converters: Converter[];
  sortColumn?: SortColumn;
  sortOrder?: SortOrder;
  onSort?: (column: SortColumn) => void;
}

export default function ConverterTable({ converters, sortColumn, sortOrder, onSort }: ConverterTableProps) {
  const SortableHeader = ({ column, children, align = 'left' }: { column: SortColumn; children: React.ReactNode; align?: 'left' | 'right' }) => {
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
            <SortableHeader column="name">
              Name
            </SortableHeader>
            <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
              Reserve Currencies
            </th>
            <SortableHeader column="reserves" align="right">
              # Reserves
            </SortableHeader>
            <SortableHeader column="supply" align="right">
              Supply
            </SortableHeader>
            <SortableHeader column="liquidity" align="right">
              Liquidity
            </SortableHeader>
          </tr>
        </thead>
        <tbody>
          {converters.map((converter, index) => (
            <tr
              key={`${converter.currency_id}-${index}`}
              className="border-b border-[var(--border)] hover:bg-[var(--card-hover)] transition-colors"
            >
              <td className="py-4 px-4">
                <Link
                  href={`/converter/${converter.name.toLowerCase()}`}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  <div className="font-medium">{converter.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {converter.currency_id.substring(0, 12)}...
                  </div>
                </Link>
              </td>
              <td className="py-4 px-4">
                <div className="flex flex-wrap gap-1">
                  {converter.reserve_currencies.slice(0, 5).map((reserve, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[var(--border)] text-gray-300"
                    >
                      {reserve.ticker}
                    </span>
                  ))}
                  {converter.reserve_currencies.length > 5 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-gray-500">
                      +{converter.reserve_currencies.length - 5} more
                    </span>
                  )}
                </div>
              </td>
              <td className="py-4 px-4 text-right">
                <div className="font-medium">{converter.reserve_currencies.length}</div>
              </td>
              <td className="py-4 px-4 text-right price-mono">
                <div className="font-medium">{formatCompact(converter.supply)}</div>
              </td>
              <td className="py-4 px-4 text-right">
                <div className="font-medium">
                  {converter.total_liquidity_usd > 0
                    ? `$${formatCompact(converter.total_liquidity_usd.toString())}`
                    : '—'
                  }
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
