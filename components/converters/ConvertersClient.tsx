'use client';

import { useState, useMemo } from 'react';
import { Converter } from '@/types';
import { sortBy } from '@/lib/utils';
import ConverterTable from './ConverterTable';
import Card from '../ui/Card';

interface ConvertersClientProps {
  converters: Converter[];
}

type SortColumn = 'name' | 'reserves' | 'supply' | 'liquidity';
type SortOrder = 'asc' | 'desc';

export default function ConvertersClient({ converters }: ConvertersClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<SortColumn>('liquidity');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Filter and sort converters
  const filteredAndSortedConverters = useMemo(() => {
    // Filter by search term
    let filtered = converters;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = converters.filter(converter =>
        converter.name.toLowerCase().includes(search) ||
        converter.currency_id.toLowerCase().includes(search) ||
        converter.reserve_currencies.some(reserve =>
          reserve.ticker.toLowerCase().includes(search)
        )
      );
    }

    // Sort by selected column
    switch (sortColumn) {
      case 'name':
        return sortBy(filtered, 'name', sortOrder);
      case 'reserves':
        return [...filtered].sort((a, b) => {
          const diff = a.reserve_currencies.length - b.reserve_currencies.length;
          return sortOrder === 'asc' ? diff : -diff;
        });
      case 'supply':
        return sortBy(filtered, 'supply', sortOrder);
      case 'liquidity':
        return [...filtered].sort((a, b) => {
          const diff = a.total_liquidity_usd - b.total_liquidity_usd;
          return sortOrder === 'asc' ? diff : -diff;
        });
      default:
        return filtered;
    }
  }, [converters, searchTerm, sortColumn, sortOrder]);

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
            placeholder="Search baskets or reserves..."
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
          Showing <span className="text-white font-semibold">{filteredAndSortedConverters.length}</span> of{' '}
          <span className="text-white font-semibold">{converters.length}</span> converters
        </div>
      </div>

      {/* Converters Table */}
      <Card className="p-0 overflow-hidden">
        <ConverterTable
          converters={filteredAndSortedConverters}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </Card>

      {/* No Results Message */}
      {filteredAndSortedConverters.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No converters found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}
