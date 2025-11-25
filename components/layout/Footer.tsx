export default function Footer() {
  return (
    <footer className="bg-[var(--card)] border-t border-[var(--border)] mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">vTicker</h3>
            <p className="text-gray-400 text-sm">
              Real-time data for Verus DeFi.
            </p>
            <p className="text-gray-400 text-sm">
              Track prices, converters, and volumes.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://verus.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[var(--primary)] transition-colors"
                >
                  Verus Website
                </a>
              </li>
              <li>
                <a
                  href="https://docs.verus.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[var(--primary)] transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://explorer.verus.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[var(--primary)] transition-colors"
                >
                  Block Explorer
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/VerusCoin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[var(--primary)] transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* API Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Data Source</h3>
            <p className="text-gray-400 text-sm mb-2">
              Powered by Verus Ticker API
            </p>
            <a
              href="https://tickerapi.verus.services"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] hover:text-[var(--primary-dark)] text-sm transition-colors"
            >
              tickerapi.verus.services
            </a>
            <p className="text-gray-500 text-xs mt-4">
              Data updates every 60 seconds
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-[var(--border)] text-center text-gray-500 text-sm">
          <p>
            vTicker - DeFi Analytics for Verus Network
          </p>
          <p className="mt-2">
            Consensus-level DeFi • No malicious MEV • Multicurrency & Multi-chain
          </p>
        </div>
      </div>
    </footer>
  );
}
