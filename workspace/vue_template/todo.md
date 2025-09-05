# TradeLedger MVP Implementation

## Core Features to Implement
1. **Trade Entry Form** - Log stock/crypto trades with essential details
2. **Trade History Table** - Display all logged trades with sorting/filtering
3. **P&L Dashboard** - Show profit/loss calculations and metrics
4. **Performance Charts** - Visualize trading performance over time
5. **Trade Analytics** - Basic statistics and insights

## Files to Create
1. `src/App.vue` - Main application layout and routing
2. `src/components/TradeForm.vue` - Form for adding new trades
3. `src/components/TradeHistory.vue` - Table displaying trade history
4. `src/components/Dashboard.vue` - P&L overview and key metrics
5. `src/components/PerformanceChart.vue` - Charts for performance visualization
6. `src/stores/tradeStore.js` - Pinia store for trade data management
7. `src/utils/calculations.js` - P&L and performance calculation utilities

## Data Structure
- Trade: { id, symbol, type (buy/sell), quantity, price, date, fees, notes }
- Portfolio metrics: total P&L, win rate, best/worst trades
- Use localStorage for data persistence (MVP version)

## Tech Stack
- Vue 3 with Composition API
- Pinia for state management
- Chart.js for performance visualization
- Tailwind CSS for styling
- Local storage for data persistence