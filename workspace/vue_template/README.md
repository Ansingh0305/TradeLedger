# TradeLedger - Blockchain-Secured Trading Journal

A modern, full-stack trading journal web application that demonstrates blockchain integration concepts with real-time P&L tracking and performance analytics.

## 🚀 Features

### Core Functionality
- **Trade Logging** - Record buy/sell transactions with detailed information
- **Real-time P&L** - Automatic profit/loss calculations and portfolio tracking
- **Performance Analytics** - Visual charts showing trading performance over time
- **Blockchain Integration** - Client-side hashing with simulated Optimism rollup anchoring
- **Trade History** - Complete transaction log with filtering and search capabilities

### Technical Highlights
- **Vue 3** with Composition API for reactive user interfaces
- **Pinia** for centralized state management
- **Chart.js** for interactive performance visualizations
- **Tailwind CSS** for responsive, modern styling
- **Local Storage** for data persistence (MVP version)
- **Cryptographic Hashing** simulation for trade integrity

## 🛠️ Technology Stack

- **Frontend**: Vue 3, Pinia, Tailwind CSS
- **Charts**: Chart.js with vue-chartjs
- **Icons**: Lucide Vue Next
- **Build Tool**: Vite
- **Data Storage**: Browser Local Storage (MVP)

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## 🎯 Usage

### Adding Trades
1. Navigate to the "Add Trade" tab
2. Fill in trade details:
   - Symbol (e.g., AAPL, BTC)
   - Type (Buy/Sell)
   - Quantity and Price
   - Date and optional fees
   - Notes for additional context
3. Submit to automatically hash and store the trade

### Viewing Performance
- **Dashboard**: Overview of key metrics (Total P&L, Win Rate, Portfolio Value)
- **Analytics**: Detailed performance charts and trading statistics
- **Trade History**: Complete log with filtering by type and symbol search

### Blockchain Features
- Each trade is automatically hashed client-side
- Simulated Optimism rollup integration for immutable records
- Integrity status indicators throughout the interface

## 📊 Key Metrics

The application tracks and displays:
- **Total P&L**: Cumulative profit/loss across all trades
- **Win Rate**: Percentage of profitable trades
- **Portfolio Value**: Current value of all positions
- **Trade Count**: Total number of transactions
- **Performance Timeline**: Visual P&L progression over time

## 🔐 Security & Integrity

- **Client-side Hashing**: Each trade generates a cryptographic hash
- **Immutable Records**: Simulated blockchain anchoring prevents tampering
- **Data Integrity**: Visual indicators show blockchain security status
- **Local Storage**: All data stored securely in browser (no external dependencies)

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern Interface**: Clean, professional trading dashboard aesthetic
- **Interactive Charts**: Hover effects and detailed tooltips
- **Real-time Updates**: Instant metric recalculation on new trades
- **Intuitive Navigation**: Tab-based interface for easy access

## 🚀 Future Enhancements

### Planned Features
- **Real Blockchain Integration**: Actual Optimism rollup deployment
- **Go Microservice**: Real-time price feed integration
- **PostgreSQL Backend**: Persistent data storage
- **GraphQL API**: Advanced querying capabilities
- **Advanced Analytics**: More sophisticated trading metrics

### Potential Additions
- **Export Functionality**: CSV/JSON trade history export
- **Dark Mode**: Theme switching for better UX
- **Multi-Asset Support**: Enhanced crypto and stock tracking
- **Portfolio Rebalancing**: Automated position management tools

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard.vue          # P&L metrics overview
│   ├── TradeForm.vue         # Trade entry form
│   ├── TradeHistory.vue      # Transaction log table
│   └── PerformanceChart.vue  # Chart.js visualizations
├── stores/
│   └── tradeStore.js         # Pinia state management
├── utils/
│   └── calculations.js       # P&L and formatting utilities
├── App.vue                   # Main application component
└── main.js                   # Application entry point
```

## 🤝 Contributing

This is a demonstration project showcasing full-stack development skills with blockchain concepts. Feel free to fork and extend with additional features!

## 📄 License

MIT License - feel free to use this code for learning and development purposes.

---

**Built with ❤️ to demonstrate modern web development and blockchain integration concepts.**