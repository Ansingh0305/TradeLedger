export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount)
}

export const formatPercentage = (value) => {
  return `${value.toFixed(2)}%`
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const calculateTradeProfit = (buyPrice, sellPrice, quantity, fees = 0) => {
  return (sellPrice - buyPrice) * quantity - fees
}

export const calculatePositionValue = (price, quantity) => {
  return price * quantity
}

export const getTradeTypeColor = (type) => {
  return type === 'buy' ? 'text-green-600' : 'text-red-600'
}

export const getTradeTypeBadge = (type) => {
  return type === 'buy' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-red-100 text-red-800'
}

export const generateTradeHash = (trade) => {
  // Simple hash simulation for demo purposes
  const data = `${trade.symbol}-${trade.type}-${trade.quantity}-${trade.price}-${trade.date}`
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0')
}