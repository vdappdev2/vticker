# vTicker - Verus DeFi Analytics Platform

**Project Overview:** A CoinGecko-style analytics platform specialized for the Verus DeFi ecosystem, showcasing real-time trading data, liquidity pools, and converter analytics.

**Tagline:** "The DeFi Analytics Platform for the Verus Ecosystem"

---

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Pages & Features](#pages--features)
3. [Key Design Decisions](#key-design-decisions)
4. [Implementation Phases](#implementation-phases)
5. [File Structure](#file-structure)
6. [API Endpoints](#api-endpoints)
7. [Data Models](#data-models)

---

## Tech Stack

### Frontend Framework
- **Next.js 14** (App Router) - React framework with server-side rendering
- **TypeScript** - Type safety and better DX
- **React 18** - Latest React features

### Styling
- **TailwindCSS** - Utility-first CSS framework
- **Dark theme by default** - Standard for crypto platforms
- **Responsive design** - Mobile-first approach

### Data Fetching & State
- **React Query (TanStack Query)** - Server state management
- **60-second cache** - Matches API TTL
- **Auto-refresh** - Keep data fresh

### Charts & Visualization
- **Recharts** - React charting library
- **24h OHLC candlestick charts**
- **Volume charts**
- **Reserve composition visualizations**

### API
- **Verus Ticker API** - https://tickerapi.verus.services
- **Client-side fetching** - No backend needed for MVP
- **Multiple endpoints** - /coingecko/tickers, /converters, /verussupply

---

## Pages & Features

### 1. Home/Dashboard (`/`)

**Purpose:** Market overview and entry point to the platform

**Features:**
- **Hero Stats Card**
  - Total trading pairs: 118
  - 24h total volume: ~$158K
  - Active converters: 17
  - Current VRSC price

- **Market Overview Price Ticker**
  - Horizontal scrolling ticker for 11 major tokens
  - Tokens: WETH, TBTC, SCRVUSD, SUPERNET, NATI, EURC, MKR.vETH, VRSC, CHIPS, VARR, VDEX
  - Show current price with 24h % change
  - Green/red color coding

- **Top Trading Pairs Table**
  - 10-15 pairs sorted by 24h volume
  - Columns: Pair, Price, 24h Change, Volume, Liquidity
  - Click to go to pair detail page

- **Featured Converters Section**
  - 3-4 key converters (Pure, NATI, SUPER🛒, Bridge.CHIPS)
  - Quick stats: Supply, Reserves, Liquidity
  - Visual reserve composition
  - Link to full converters page

**CTA:** "Explore All Pairs" and "View All Converters" buttons

---

### 2. All Trading Pairs (`/pairs`)

**Purpose:** Comprehensive searchable list of all trading pairs

**Features:**
- **Search Bar**
  - Search by ticker (e.g., "VRSC-DAI", "WETH")
  - Real-time filtering

- **Advanced Filters**
  - Filter by base currency (dropdown: VRSC, WETH, TBTC, etc.)
  - Filter by minimum liquidity
  - Filter by minimum 24h volume

- **Sortable Table**
  - Columns:
    - Pair (ticker_id)
    - Last Price
    - 24h Change (%)
    - 24h High/Low
    - 24h Volume (base + target)
    - Liquidity (USD)
    - Pool ID
  - Sort by any column (ascending/descending)
  - Default sort: Volume (descending)

- **Pagination**
  - 25/50/100 items per page
  - Total count display

- **Quick Actions**
  - Click row to view pair detail
  - Hover for quick stats tooltip

---

### 3. Pair Detail Page (`/pair/[ticker_id]`)

**Purpose:** Deep dive into individual trading pair

**URL Structure:** `/pair/VRSC-DAI`, `/pair/WETH-TBTC`, etc.

**Features:**
- **Header Section**
  - Pair name (e.g., "VRSC / DAI")
  - Current price (large, prominent)
  - 24h change percentage (green/red badge)
  - Bid/Ask spread

- **24h OHLC Candlestick Chart**
  - Interactive Recharts candlestick
  - Show Open, High, Low, Close
  - Hover tooltips with exact values
  - Time axis (24 hours)

- **24h Volume Chart**
  - Dual-axis bar chart
  - Base volume (one color)
  - Target volume (another color)
  - Stacked or side-by-side

- **Statistics Grid** (2x3 or 3x2 layout)
  - Open Price
  - 24h High
  - 24h Low
  - Close Price
  - Base Volume
  - Target Volume
  - Total Liquidity (USD)
  - Bid Price
  - Ask Price

- **Pool Information**
  - Pool ID (i-address)
  - Link to Verus explorer
  - "What is a pool ID?" tooltip

- **Related Pairs**
  - Other pairs with same base currency
  - Other pairs with same target currency

---

### 4. Converters/Liquidity Pools Page (`/converters`)

**Purpose:** Showcase Verus's unique DeFi feature - multi-reserve converters

**This is the DIFFERENTIATOR from generic platforms**

**Features:**
- **Introduction Section**
  - Brief explanation: "Verus converters are protocol-level liquidity pools backed by multiple reserve currencies"
  - Key benefits: MEV-resistant, protocol security, weighted reserves

- **Converter Cards Grid** (3 columns on desktop)
  - Card for each of 17 converters
  - Each card shows:
    - Converter name (e.g., "Pure", "NATI", "SUPER🛒")
    - Total supply
    - Number of reserve currencies
    - Total liquidity (USD estimate)
    - Reserve composition pie chart or bar
    - Dominant currency icon

- **Sortable/Filterable**
  - Sort by: Supply, Liquidity, Name, # of Reserves
  - Filter by: Minimum reserves, Has VRSC, Has BTC

- **Stats Summary**
  - Total converters: 17
  - Total liquidity across all converters
  - Most liquid converter
  - Most diverse converter (most reserves)

---

### 5. Converter Detail Page (`/converter/[name]`)

**Purpose:** In-depth analysis of individual converter

**URL Structure:** `/converter/pure`, `/converter/nati`, etc.

**Features:**
- **Converter Overview**
  - Name and full identifier
  - Currency ID
  - Total supply
  - Source chain

- **Reserve Composition Breakdown**
  - Visual breakdown (pie chart or stacked bar)
  - Table with columns:
    - Currency (ticker)
    - Weight (%)
    - Current Reserves (amount)
    - Price in Reserve
    - USD Value
  - Example for Pure: 50% VRSC, 50% tBTC
  - Example for SUPER🛒: 8 different currencies with weights

- **Trading Pairs Using This Converter**
  - All pairs that involve this converter's currency
  - Mini table: Pair, Price, Volume, Liquidity

- **Supply Metrics**
  - Current supply
  - Reserve ratio health
  - Historical supply chart (if data available)

- **About This Converter**
  - Description of purpose
  - Use cases (e.g., "Pure provides dual exposure to VRSC and Bitcoin")
  - Link to Verus docs

---

### 6. VRSC Coin Page (`/coin/vrsc`)

**Purpose:** Dedicated page for the native VRSC token

**Features:**
- **VRSC Overview**
  - Current price (aggregated across pairs)
  - 24h change
  - Brief description: "Verus Coin - Native token of the Verus protocol"

- **Supply Statistics** (from /verussupply endpoint)
  - Total Supply: 79,123,413.90 VRSC
  - Circulating Supply: 67,146,913.54 VRSC
  - Locked Supply: 11,976,500.36 VRSC
  - Visual breakdown (donut chart)
  - Explanation tooltip: "Why is supply locked?"

- **All VRSC Trading Pairs**
  - Sortable table of all pairs with VRSC
  - Sort by liquidity, volume, price
  - Shows: Pair, Price, Change, Volume, Liquidity

- **VRSC in Converters**
  - List of converters that have VRSC in reserves
  - Show VRSC weight in each converter

- **About Verus Protocol**
  - Brief overview of Verus
  - Key features: Proof of Power, Privacy (Sapling), PBaaS
  - Max supply: 83,540,184 VRSC
  - Link to verus.io

---

## Key Design Decisions

### What Makes vTicker Verus-Specific (Not Generic)

1. **Converters as First-Class Feature**
   - Dedicated pages showing reserve compositions
   - Visual breakdowns of weighted reserves
   - Emphasis on protocol-level security advantage

2. **Pool IDs (i-addresses) Prominently Displayed**
   - Link to Verus block explorer
   - Tooltips explaining what they are

3. **Supply Metrics Highlighted**
   - VRSC locked/circulating distinction
   - Converter supply tracking

4. **Multi-Reserve Visualization**
   - Unique to Verus (vs single-pair AMMs)
   - Show diversity of converters like SUPER🛒

5. **Educational Tooltips**
   - Explain Verus-specific concepts
   - Help users understand converters vs traditional pools

6. **Verus Branding**
   - Use Verus color scheme (greens)
   - Link to Verus ecosystem resources

### Data Strategy

**API Endpoints Used:**
- `/coingecko/tickers` - Main trading pair data (familiar format)
- `/converters` - Detailed converter analytics
- `/verussupply` - VRSC-specific supply metrics
- `/stats` - Market overview statistics

**Caching Strategy:**
- React Query with 60-second stale time (matches API cache)
- Background refetching every 60 seconds
- Optimistic updates for better UX
- Cache persistence across page navigation

**Error Handling:**
- Graceful fallbacks when API is down
- Retry logic (3 attempts with exponential backoff)
- Clear error messages for users
- Loading skeletons during fetch

### UI/UX Approach

**Visual Design:**
- Dark theme by default (crypto standard)
- Green accents for positive changes
- Red accents for negative changes
- CoinGecko-inspired layout but cleaner
- Card-based components
- Generous whitespace

**Typography:**
- Large, readable numbers for prices
- Monospace for prices and addresses
- Clear hierarchy (H1, H2, H3)

**Interactions:**
- Smooth transitions and animations
- Hover states on interactive elements
- Loading states (skeletons, not spinners)
- Tooltips for educational content

**Responsiveness:**
- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly targets on mobile
- Collapsible sections on small screens
- Horizontal scrolling for tables on mobile

**Performance:**
- Code splitting by route
- Image optimization with Next.js Image
- Lazy loading for charts
- Minimize bundle size

---

## Implementation Phases

### Phase 1: Foundation & Core Pages (Week 1)

**Setup:**
1. Initialize Next.js 14 project with TypeScript
2. Configure TailwindCSS with custom theme
3. Set up React Query
4. Create base layout and navigation

**API Integration:**
5. Create API client (`lib/api.ts`)
6. Define TypeScript types (`types/verus.ts`)
7. Create React Query hooks (`lib/hooks.ts`)
8. Test API connections

**Pages:**
9. Build Home/Dashboard page
10. Build All Pairs listing page
11. Add search and filter functionality

**Deliverable:** Working homepage and pairs listing with real data

---

### Phase 2: Detail Pages & Charts (Week 2)

**Features:**
12. Build Pair detail page template
13. Implement 24h OHLC candlestick chart
14. Implement volume chart
15. Add statistics grid
16. Create pool information section

**Components:**
17. Reusable PairTable component
18. Reusable PriceChart component
19. Reusable StatCard component
20. Navigation breadcrumbs

**Deliverable:** Full pair detail pages with interactive charts

---

### Phase 3: Converters & Deep Features (Week 3)

**Converter Features:**
21. Build Converters listing page
22. Create ConverterCard component
23. Build Converter detail pages
24. Implement reserve composition visualizations
25. Add converter statistics

**VRSC Page:**
26. Build VRSC coin page
27. Implement supply breakdown chart
28. Add VRSC-specific metrics
29. List all VRSC pairs and converters

**Deliverable:** Complete converter analytics and VRSC page

---

### Phase 4: Polish & Optimization (Week 4)

**Enhancements:**
30. Add dark/light theme toggle
31. Implement auto-refresh (60s intervals)
32. Add loading skeletons
33. Improve error states
34. Add 404 and error pages

**Mobile:**
35. Mobile responsive optimizations
36. Touch gesture support
37. Mobile navigation menu

**Performance:**
38. Code splitting optimization
39. Image optimization
40. Bundle size analysis
41. Lighthouse audit and fixes

**SEO & Meta:**
42. Add meta tags for all pages
43. Open Graph tags
44. Favicon and app icons
45. Sitemap generation

**Deliverable:** Production-ready vTicker platform

---

## File Structure

```
vTicker/
├── app/
│   ├── layout.tsx                    # Root layout with providers
│   ├── page.tsx                      # Home/Dashboard
│   ├── pairs/
│   │   ├── page.tsx                  # All pairs listing
│   │   └── [ticker_id]/
│   │       └── page.tsx              # Pair detail (e.g., VRSC-DAI)
│   ├── converters/
│   │   ├── page.tsx                  # Converters listing
│   │   └── [name]/
│   │       └── page.tsx              # Converter detail (e.g., Pure)
│   ├── coin/
│   │   └── vrsc/
│   │       └── page.tsx              # VRSC coin page
│   └── globals.css                   # Global styles
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # Navigation header
│   │   ├── Footer.tsx                # Footer with links
│   │   └── Sidebar.tsx               # Optional sidebar
│   ├── pairs/
│   │   ├── PairTable.tsx             # Sortable pairs table
│   │   ├── PairCard.tsx              # Pair card for grids
│   │   └── PairSearch.tsx            # Search/filter component
│   ├── converters/
│   │   ├── ConverterCard.tsx         # Converter card
│   │   ├── ConverterTable.tsx        # Converter listing table
│   │   └── ReserveComposition.tsx    # Reserve breakdown viz
│   ├── charts/
│   │   ├── CandlestickChart.tsx      # OHLC chart
│   │   ├── VolumeChart.tsx           # Volume bar chart
│   │   ├── PieChart.tsx              # For supply/reserve breakdowns
│   │   └── LineChart.tsx             # Simple price line chart
│   ├── ui/
│   │   ├── Button.tsx                # Reusable button
│   │   ├── Card.tsx                  # Card container
│   │   ├── Badge.tsx                 # For % changes
│   │   ├── Tooltip.tsx               # Info tooltips
│   │   ├── Skeleton.tsx              # Loading skeletons
│   │   └── Table.tsx                 # Base table component
│   └── stats/
│       ├── MarketStats.tsx           # Market overview stats
│       ├── StatCard.tsx              # Individual stat card
│       └── PriceTicker.tsx           # Scrolling price ticker
│
├── lib/
│   ├── api.ts                        # API client functions
│   ├── hooks.ts                      # React Query hooks
│   ├── utils.ts                      # Utility functions
│   ├── formatters.ts                 # Number/price formatting
│   └── constants.ts                  # App constants
│
├── types/
│   ├── verus.ts                      # Verus API types
│   └── index.ts                      # Type exports
│
├── public/
│   ├── favicon.ico
│   └── images/
│
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript config
├── next.config.js                    # Next.js config
├── package.json
├── PROJECT_PLAN.md                   # This file
└── README.md                         # Project README
```

---

## API Endpoints

### Base URL
```
https://tickerapi.verus.services
```

### 1. GET /coingecko/tickers
**Purpose:** Main trading pairs data

**Response:** Array of trading pair objects

**Fields:**
- `ticker_id` - Pair identifier (e.g., "VRSC-DAI")
- `base_currency` - First token
- `target_currency` - Second token
- `last_price` - Current price
- `base_volume` - 24h base volume
- `target_volume` - 24h target volume
- `bid` - Bid price
- `ask` - Ask price
- `high` - 24h high
- `low` - 24h low
- `open` - Opening price
- `pool_id` - Pool identifier (i-address)
- `liquidity_in_usd` - Total liquidity

**Cache:** 60 seconds

**Example:**
```json
{
  "ticker_id": "VRSC-DAI",
  "base_currency": "VRSC",
  "target_currency": "DAI",
  "last_price": "1.01605780",
  "base_volume": "2350.72412756",
  "target_volume": "2341.35156201",
  "bid": "1.01605780",
  "ask": "1.01605780",
  "high": "1.01764351",
  "low": "0.98616596",
  "open": "0.99909434",
  "pool_id": "i3f7tSctFkiPpiedY8QR5Tep9p4qDVebDx",
  "liquidity_in_usd": "105585.44708974"
}
```

---

### 2. GET /converters
**Purpose:** Detailed converter/liquidity pool data

**Response:** Object with `active_converters` array

**Fields per converter:**
- `name` - Converter name
- `currency_id` - Blockchain identifier
- `supply` - Current token supply
- `source_chain` / `chain` - Blockchain location
- `reserve_currencies` - Array of reserves with:
  - `currency_id` - Currency identifier
  - `ticker` - Currency symbol
  - `weight` - Reserve weight (%)
  - `reserves` - Current reserve amount
  - `price_in_reserve` - Exchange rate
- `currencies` - Supported trading pairs
- `raw_data` - Blockchain-level details

**Cache:** 60 seconds

**Example:**
```json
{
  "active_converters": [
    {
      "name": "Pure",
      "currency_id": "i...",
      "supply": "1400000.00",
      "reserve_currencies": [
        {
          "ticker": "VRSC",
          "weight": 50,
          "reserves": "700000.00",
          "price_in_reserve": "1.00"
        },
        {
          "ticker": "tBTC",
          "weight": 50,
          "reserves": "8.23",
          "price_in_reserve": "85000.00"
        }
      ]
    }
  ]
}
```

---

### 3. GET /verussupply
**Purpose:** VRSC supply metrics

**Response:** Object with supply data

**Fields:**
- `total` - Total VRSC supply
- `circulating` - Circulating supply
- `locked` - Locked supply

**Cache:** 60 seconds

**Example:**
```json
{
  "total": "79123413.90",
  "circulating": "67146913.54",
  "locked": "11976500.36"
}
```

---

### 4. GET /stats
**Purpose:** Market statistics (HTML page, needs parsing)

**Response:** HTML page with:
- Total trading pairs count
- Total 24h volume
- Price ticker for major tokens

**Cache:** 60 seconds

---

### 5. GET /health
**Purpose:** API health check

**Response:** Object with:
- Server status
- RPC connection health
- Cache metrics
- Age and expiration

---

## Data Models

### TypeScript Types

```typescript
// types/verus.ts

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
  source_chain: string;
  chain: string;
  reserve_currencies: ReserveCurrency[];
  currencies: string[];
  raw_data?: any;
}

export interface ConvertersResponse {
  active_converters: Converter[];
}

export interface VerusSupply {
  total: string;
  circulating: string;
  locked: string;
}

export interface MarketStats {
  total_pairs: number;
  total_volume_24h: string;
  active_converters: number;
  vrsc_price: string;
}
```

---

## Development Workflow

### Getting Started

1. **Clone and Install**
```bash
npx create-next-app@latest vTicker --typescript --tailwind --app
cd vTicker
npm install @tanstack/react-query recharts
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Build for Production**
```bash
npm run build
npm start
```

### Testing Strategy

- **Unit Tests:** Jest + React Testing Library
- **E2E Tests:** Playwright (for critical flows)
- **Type Safety:** TypeScript strict mode
- **Linting:** ESLint + Prettier

### Deployment

**Recommended Platform:** Vercel (seamless Next.js integration)

**Environment Variables:**
- `NEXT_PUBLIC_API_BASE_URL` - API base URL (optional, default: hardcoded)

**Build Command:** `npm run build`

**Output:** Static + Server-rendered pages

---

## Future Enhancements (Post-MVP)

### Phase 5+: Advanced Features

1. **Historical Data Storage**
   - Build backend to store historical prices
   - Enable 7d, 30d, 1y charts
   - Track price history over time

2. **Portfolio Tracking**
   - User accounts (optional wallet connect)
   - Track holdings
   - Calculate P&L

3. **Price Alerts**
   - Email/push notifications
   - Set target prices
   - Volume alerts

4. **Advanced Analytics**
   - Converter APR calculations
   - Impermanent loss estimators
   - Liquidity depth charts

5. **Trading Integration**
   - Connect to Verus wallet
   - Execute swaps directly
   - Show transaction history

6. **Comparison Tools**
   - Compare converters
   - Compare pairs
   - Historical performance comparison

7. **API for Developers**
   - Public API for vTicker data
   - Documentation
   - Rate limiting

8. **Mobile App**
   - React Native version
   - Push notifications
   - Quick price checks

---

## Success Metrics

### MVP Launch Goals

- **Performance:**
  - Lighthouse score > 90
  - First Contentful Paint < 1.5s
  - Time to Interactive < 3.5s

- **Functionality:**
  - All 6 core pages working
  - Real-time data updates
  - Mobile responsive

- **User Experience:**
  - Clear navigation
  - Fast page loads
  - Helpful tooltips

### Long-term Goals

- **Traffic:** 1,000+ monthly active users
- **Adoption:** Recognized by Verus community
- **Reliability:** 99.9% uptime
- **Speed:** Average API response < 200ms

---

## Resources

### Verus Ecosystem
- Website: https://verus.io
- Docs: https://docs.verus.io
- GitHub: https://github.com/VerusCoin
- Explorer: https://explorer.verus.io

### API
- Ticker API: https://tickerapi.verus.services
- API Health: https://tickerapi.verus.services/health
- API Stats: https://tickerapi.verus.services/stats

### Development
- Next.js: https://nextjs.org/docs
- React Query: https://tanstack.com/query/latest
- TailwindCSS: https://tailwindcss.com/docs
- Recharts: https://recharts.org/

---

## License

MIT License (to be determined)

---

## Contributors

- Initial Development: [Your Name]
- Verus API: Shreyas-ITB/VerusStatisticsAPI

---

**Last Updated:** 2025-11-23
