import { API_BASE_URL, API_ENDPOINTS } from './constants';
import type { TradingPair, ConvertersResponse, VerusSupply } from '@/types';

/**
 * Fetch all trading pairs from the CoinGecko-formatted endpoint
 */
export async function fetchTradingPairs(): Promise<TradingPair[]> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TICKERS}`, {
    next: { revalidate: 60 }, // Server-side cache with 60s revalidation
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch trading pairs: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a specific trading pair by ticker_id
 */
export async function fetchTradingPair(tickerId: string): Promise<TradingPair | null> {
  const pairs = await fetchTradingPairs();
  return pairs.find(pair => pair.ticker_id === tickerId) || null;
}

/**
 * Fetch all converters
 */
export async function fetchConverters(): Promise<ConvertersResponse> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CONVERTERS}`, {
    next: { revalidate: 60 }, // Server-side cache with 60s revalidation
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch converters: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a specific converter by name
 */
export async function fetchConverter(name: string): Promise<any | null> {
  const { active_converters } = await fetchConverters();
  return active_converters.find(
    converter => converter.name.toLowerCase() === name.toLowerCase()
  ) || null;
}

/**
 * Fetch VRSC supply information
 */
export async function fetchVerusSupply(): Promise<VerusSupply> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SUPPLY}`, {
    next: { revalidate: 60 }, // Server-side cache with 60s revalidation
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Verus supply: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Calculate market statistics from trading pairs
 */
export async function fetchMarketStats() {
  const pairs = await fetchTradingPairs();
  const { active_converters } = await fetchConverters();

  // Calculate total liquidity (count each pool only once)
  const poolLiquidityMap = new Map<string, number>();
  pairs.forEach(pair => {
    const liquidity = parseFloat(pair.liquidity_in_usd);
    if (!isNaN(liquidity) && !poolLiquidityMap.has(pair.pool_id)) {
      poolLiquidityMap.set(pair.pool_id, liquidity);
    }
  });
  const totalLiquidity = Array.from(poolLiquidityMap.values()).reduce((sum, liq) => sum + liq, 0);

  // Find VRSC price (from VRSC-DAI or VRSC-USDC pair)
  const vrscPair = pairs.find(
    p => p.ticker_id === 'VRSC-DAI' || p.ticker_id === 'VRSC-USDC'
  );
  const vrscPrice = vrscPair ? vrscPair.last_price : '0';

  return {
    total_pairs: pairs.length,
    total_liquidity: totalLiquidity.toString(),
    active_converters: active_converters.length,
    vrsc_price: vrscPrice,
  };
}
