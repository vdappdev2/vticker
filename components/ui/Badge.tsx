import { getChangeBgClass, getChangeColorClass } from '@/lib/utils';

interface BadgeProps {
  value: number;
  showSign?: boolean;
  suffix?: string;
}

export default function Badge({ value, showSign = true, suffix = '%' }: BadgeProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const sign = showSign && isPositive ? '+' : '';

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium
        ${getChangeBgClass(value)}
        ${getChangeColorClass(value)}
      `}
    >
      {sign}{value.toFixed(2)}{suffix}
    </span>
  );
}
