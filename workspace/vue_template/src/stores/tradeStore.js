import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTradeStore = defineStore('trades', () => {
  const trades = ref([])
  
  // Load trades from localStorage on initialization
  const loadTrades = () => {
    const savedTrades = localStorage.getItem('tradeLedger_trades')
    if (savedTrades) {
      trades.value = JSON.parse(savedTrades)
    }
  }
  
  // Save trades to localStorage
  const saveTrades = () => {
    localStorage.setItem('tradeLedger_trades', JSON.stringify(trades.value))
  }
  
  // Add a new trade
  const addTrade = (trade) => {
    const newTrade = {
      id: Date.now().toString(),
      ...trade,
      date: new Date(trade.date).toISOString(),
      createdAt: new Date().toISOString()
    }
    trades.value.push(newTrade)
    saveTrades()
  }
  
  // Remove a trade
  const removeTrade = (id) => {
    trades.value = trades.value.filter(trade => trade.id !== id)
    saveTrades()
  }
  
  // Computed metrics
  const totalPnL = computed(() => {
    return trades.value.reduce((total, trade) => {
      if (trade.type === 'sell') {
        return total + (trade.quantity * trade.price) - (trade.fees || 0)
      } else {
        return total - (trade.quantity * trade.price) - (trade.fees || 0)
      }
    }, 0)
  })
  
  const totalTrades = computed(() => trades.value.length)
  
  const winningTrades = computed(() => {
    const buyTrades = trades.value.filter(t => t.type === 'buy')
    const sellTrades = trades.value.filter(t => t.type === 'sell')
    
    let wins = 0
    buyTrades.forEach(buy => {
      const correspondingSell = sellTrades.find(sell => 
        sell.symbol === buy.symbol && new Date(sell.date) > new Date(buy.date)
      )
      if (correspondingSell && correspondingSell.price > buy.price) {
        wins++
      }
    })
    return wins
  })
  
  const winRate = computed(() => {
    const buyTradesCount = trades.value.filter(t => t.type === 'buy').length
    return buyTradesCount > 0 ? (winningTrades.value / buyTradesCount) * 100 : 0
  })
  
  const portfolioValue = computed(() => {
    const positions = {}
    trades.value.forEach(trade => {
      if (!positions[trade.symbol]) {
        positions[trade.symbol] = { quantity: 0, avgPrice: 0, totalCost: 0 }
      }
      
      if (trade.type === 'buy') {
        positions[trade.symbol].totalCost += (trade.quantity * trade.price) + (trade.fees || 0)
        positions[trade.symbol].quantity += trade.quantity
      } else {
        positions[trade.symbol].quantity -= trade.quantity
        positions[trade.symbol].totalCost -= (trade.quantity * trade.price) - (trade.fees || 0)
      }
      
      if (positions[trade.symbol].quantity > 0) {
        positions[trade.symbol].avgPrice = positions[trade.symbol].totalCost / positions[trade.symbol].quantity
      }
    })
    
    return Object.values(positions).reduce((total, pos) => total + pos.totalCost, 0)
  })
  
  // Initialize store
  loadTrades()
  
  return {
    trades,
    addTrade,
    removeTrade,
    totalPnL,
    totalTrades,
    winningTrades,
    winRate,
    portfolioValue
  }
})