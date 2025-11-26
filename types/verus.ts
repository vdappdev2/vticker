// Trading Pair Types
export interface TradingPair {
  ticker_id: string;
  base_currency: string;
  target_currency: string;
  last_price: string;
  base_volume: string;
  target_volume: string;
  bid: string;
  ask: string;
  high: string;
  low: string;
  open: string;
  pool_id: string;
  liquidity_in_usd: string;
}

// Converter Types
export interface ReserveCurrency {
  currency_id: string;
  ticker: string;
  weight: number;
  reserves: string;
  price_in_reserve: string;
}

export interface Converter {
  name: string;
  currency_id: string;
  supply: string;
  total_liquidity_usd: number;
  source_chain?: string;
  chain?: string;
  reserve_currencies: ReserveCurrency[];
  currencies: string[];
  raw_data?: any;
}

export interface ConvertersResponse {
  active_converters: Converter[];
}

// Supply Types
export interface VerusSupply {
  total_supply: string;
  circulating_supply: string;
  locked_supply: {
    vrsc_in_converters: string;
    converter_count: number;
  };
}

// Stats API Types
export interface StatsResponse {
  summary: {
    total_trading_pairs: number;
    total_24h_volume_usd: number;
  };
  price_data: Record<string, number>;
  trading_pairs: Array<{
    pair_name: string;
    last_price: number;
    base_volume: number;
    volume_24h_usd: number;
    high_24h: number;
    low_24h: number;
    pool_id: string;
  }>;
}

// Market Stats Types
export interface MarketStats {
  total_pairs: number;
  total_liquidity: string;
  active_converters: number;
  vrsc_price: string;
}

// Health Check Types
export interface HealthCheck {
  status: string;
  rpc_connected: boolean;
  cache_age: number;
  cache_expiration: number;
}
