'use client';

import { useState, useMemo } from 'react';
import { TradingPair } from '@/types';
import { sortBy } from '@/lib/utils';
import PairTable from './PairTable';
import Card from '../ui/Card';

interface PairsClientProps {
  pairs: TradingPair[];
  poolNames: Record<string, string>;
}

type SortColumn = 'pair' | 'price' | 'change' | 'volume' | 'liquidity';
type SortOrder = 'asc' | 'desc';

export default function PairsClient({ pairs, poolNames }: PairsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<SortColumn>('volume');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Filter and sort pairs
  const filteredAndSortedPairs = useMemo(() => {
    // Filter by search term
    let filtered = pairs;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = pairs.filter(pair =>
        pair.ticker_id.toLowerCase().includes(search) ||
        pair.base_currency.toLowerCase().includes(search) ||
        pair.target_currency.toLowerCase().includes(search) ||
        poolNames[pair.pool_id]?.toLowerCase().includes(search)
      );
    }

    // Sort by selected column
    switch (sortColumn) {
      case 'pair':
        return sortBy(filtered, 'ticker_id', sortOrder);
      case 'price':
        return sortBy(filtered, 'last_price', sortOrder);
      case 'change':
        // Sort by calculated 24h change
        return [...filtered].sort((a, b) => {
          const changeA = ((parseFloat(a.last_price) - parseFloat(a.open)) / parseFloat(a.open)) * 100;
          const changeB = ((parseFloat(b.last_price) - parseFloat(b.open)) / parseFloat(b.open)) * 100;
          return sortOrder === 'asc' ? changeA - changeB : changeB - changeA;
        });
      case 'volume':
        return sortBy(filtered, 'target_volume', sortOrder);
      case 'liquidity':
        return sortBy(filtered, 'liquidity_in_usd', sortOrder);
      default:
        return filtered;
    }
  }, [pairs, searchTerm, sortColumn, sortOrder, poolNames]);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle order if clicking same column
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, default to desc (highest first)
      setSortColumn(column);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Stats Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search pairs, currencies, or converters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-[var(--card)] border border-[var(--border)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="text-gray-400">
          Showing <span className="text-white font-semibold">{filteredAndSortedPairs.length}</span> of{' '}
          <span className="text-white font-semibold">{pairs.length}</span> pairs
        </div>
      </div>

      {/* Pairs Table */}
      <Card className="p-0 overflow-hidden">
        <PairTable
          pairs={filteredAndSortedPairs}
          poolNames={poolNames}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </Card>

      {/* No Results Message */}
      {filteredAndSortedPairs.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No pairs found matching &quot;{searchTerm}&quot;
        </div>
      )}
    </div>
  );
}
