# vTicker

> A CoinGecko-style analytics platform specialized for the Verus DeFi ecosystem

vTicker is a comprehensive analytics dashboard that provides real-time trading data, liquidity pool information, and converter analytics for the Verus blockchain ecosystem.

## Features

- **Real-time Market Data** - Live price tracking and market statistics for Verus DeFi assets
- **Trading Pairs Analytics** - Detailed information on liquidity pools and trading volumes
- **Converter Insights** - Analytics for Verus currency converters and basket currencies
- **Interactive Charts** - Visualize price movements, volume, and liquidity data
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** TanStack Query (React Query)
- **Charts:** Recharts
- **Data Source:** [Verus Statistics API](https://github.com/Shreyas-ITB/VerusStatisticsAPI)

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vdappdev2/vticker.git
cd vticker
```

2. Install dependencies:
```bash
npm ci
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
vticker/
├── app/              # Next.js app router pages
├── components/       # React components
├── lib/              # Utilities, API client, hooks
├── types/            # TypeScript type definitions
└── public/           # Static assets
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

This project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier (recommended) for code formatting

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on:
- Setting up your development environment
- Coding standards
- Submitting pull requests
- Security best practices

## Security

Found a security vulnerability? Please see our [Security Policy](SECURITY.md) for responsible disclosure guidelines.

## Data Source

vTicker fetches data from the [Verus Statistics API](https://tickerapi.verus.services) maintained by [@Shreyas-ITB](https://github.com/Shreyas-ITB/VerusStatisticsAPI).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Verus Community](https://verus.io) for the innovative DeFi ecosystem
- [Shreyas-ITB](https://github.com/Shreyas-ITB) for the Verus Statistics API
- All contributors who help improve vTicker

## Links

- [Live Demo](https://vticker.verus.services) (coming soon)
- [Report Issues](https://github.com/vdappdev2/vticker/issues)
- [Verus Website](https://verus.io)

---

Built with ❤️ for the Verus community
