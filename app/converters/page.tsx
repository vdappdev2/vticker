import { fetchConverters } from '@/lib/api';
import ConvertersClient from '@/components/converters/ConvertersClient';

export default async function ConvertersPage() {
  // Fetch data server-side
  const { active_converters } = await fetchConverters();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Basket Currencies</h1>
        <p className="text-gray-400">
          Explore Verus DeFi converters and their multi-reserve compositions
        </p>
      </div>

      <ConvertersClient converters={active_converters} />
    </div>
  );
}
