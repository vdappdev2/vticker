import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[var(--card)] border-b border-[var(--border)] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-[var(--primary)]">v</span>
              <span className="text-white">Ticker</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/pairs"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pairs
            </Link>
            <Link
              href="/converters"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Baskets
            </Link>
            <Link
              href="/coin/vrsc"
              className="text-gray-300 hover:text-white transition-colors"
            >
              VRSC
            </Link>
          </nav>

          {/* Right side - could add search or theme toggle */}
          <div className="flex items-center space-x-4">
            <a
              href="https://docs.verus.io/sendcurrency/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-[var(--primary)] transition-colors"
            >
              About Verus DeFi
            </a>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center space-x-6 pb-4">
          <Link
            href="/pairs"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Pairs
          </Link>
          <Link
            href="/converters"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Baskets
          </Link>
          <Link
            href="/coin/vrsc"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            VRSC
          </Link>
        </nav>
      </div>
    </header>
  );
}
