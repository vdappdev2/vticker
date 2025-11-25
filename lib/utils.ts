/**
 * Format a number as currency with appropriate decimal places
 */
export function formatCurrency(value: string | number, decimals: number = 2): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) return '0.00';

  // For very small numbers, show more decimals
  if (num > 0 && num < 0.01) {
    return num.toFixed(6);
  }

  // For large numbers, use commas
  if (num >= 1000) {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  return num.toFixed(decimals);
}

/**
 * Format a large number with K, M, B suffixes
 */
export function formatCompact(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) return '0';

  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  }

  return num.toFixed(2);
}

/**
 * Format percentage change with sign and color
 */
export function formatPercentage(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) return '0.00%';

  const sign = num > 0 ? '+' : '';
  return `${sign}${num.toFixed(2)}%`;
}

/**
 * Calculate 24h percentage change from open and last price
 */
export function calculate24hChange(open: string, last: string): number {
  const openPrice = parseFloat(open);
  const lastPrice = parseFloat(last);

  if (openPrice === 0 || isNaN(openPrice) || isNaN(lastPrice)) return 0;

  return ((lastPrice - openPrice) / openPrice) * 100;
}

/**
 * Truncate address/ID for display
 */
export function truncateAddress(address: string, startChars: number = 6, endChars: number = 4): string {
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Get color class for positive/negative values
 */
export function getChangeColorClass(value: number): string {
  if (value > 0) return 'text-positive';
  if (value < 0) return 'text-negative';
  return 'text-gray-400';
}

/**
 * Get background color class for positive/negative values
 */
export function getChangeBgClass(value: number): string {
  if (value > 0) return 'bg-positive';
  if (value < 0) return 'bg-negative';
  return 'bg-gray-800';
}

/**
 * Sort array by a key
 */
export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    // Handle string numbers
    const aNum = typeof aVal === 'string' ? parseFloat(aVal) : aVal;
    const bNum = typeof bVal === 'string' ? parseFloat(bVal) : bVal;

    if (typeof aNum === 'number' && typeof bNum === 'number') {
      return order === 'asc' ? aNum - bNum : bNum - aNum;
    }

    // String comparison
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
