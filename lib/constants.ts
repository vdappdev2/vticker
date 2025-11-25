export const API_BASE_URL = 'https://tickerapi.verus.services';

export const API_ENDPOINTS = {
  TICKERS: '/coingecko/tickers',
  CONVERTERS: '/converters',
  SUPPLY: '/verussupply',
  STATS: '/stats',
  HEALTH: '/health',
} as const;

export const VERUS_EXPLORER_URL = 'https://explorer.verus.io';

export const CACHE_TIME = 60 * 1000; // 60 seconds

export const MAJOR_CURRENCIES = [
  'VRSC',
  'WETH',
  'TBTC',
  'DAI',
  'USDC',
  'USDT',
  'EURC',
  'SUPERNET',
  'NATI',
  'CHIPS',
  'VARR',
  'VDEX',
  'MKR',
  'SCRVUSD',
] as const;
