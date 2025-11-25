import { fetchTradingPairs, fetchVerusSupply } from '@/lib/api';
import { calculate24hChange } from '@/lib/utils';
import CoinDetailView from '@/components/coin/CoinDetailView';

export default async function VRSCCoinPage() {
  // Fetch all trading pairs
  const allPairs = await fetchTradingPairs();

  // Filter pairs where VRSC is base currency
  const vrscPairs = allPairs.filter(pair => pair.base_currency === 'VRSC');

  // Calculate total 24h volume across all VRSC pairs
  const totalVolume24h = vrscPairs.reduce((sum, pair) => {
    const volume = parseFloat(pair.target_volume);
    return sum + (isNaN(volume) ? 0 : volume);
  }, 0);

  // Find VRSC price from a major pair (prefer DAI or USDC)
  const vrscPricePair = allPairs.find(
    p => p.ticker_id === 'VRSC-DAI' || p.ticker_id === 'VRSC-USDC'
  ) || vrscPairs[0];

  const vrscPrice = vrscPricePair ? vrscPricePair.last_price : '0';
  const vrscChange24h = vrscPricePair
    ? calculate24hChange(vrscPricePair.open, vrscPricePair.last_price)
    : 0;

  // Fetch VRSC supply data
  const supply = await fetchVerusSupply();

  return (
    <CoinDetailView
      vrscPrice={vrscPrice}
      vrscChange24h={vrscChange24h}
      supply={supply}
      vrscPairs={vrscPairs}
      totalVolume24h={totalVolume24h}
    />
  );
}
