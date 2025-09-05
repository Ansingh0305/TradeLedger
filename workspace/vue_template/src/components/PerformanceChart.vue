<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
      <LineChart class="mr-2 h-6 w-6" />
      Performance Chart
    </h2>
    
    <div v-if="trades.length === 0" class="text-center py-8 text-gray-500">
      <LineChart class="h-12 w-12 mx-auto mb-4 text-gray-300" />
      <p>No data to display. Add some trades to see your performance!</p>
    </div>
    
    <div v-else>
      <canvas ref="chartCanvas" class="w-full h-64"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { LineChart } from 'lucide-vue-next'
import { Chart, registerables } from 'chart.js'
import { useTradeStore } from '../stores/tradeStore'

Chart.register(...registerables)

const tradeStore = useTradeStore()
const chartCanvas = ref(null)
let chart = null

const { trades } = tradeStore

const createChart = () => {
  if (!chartCanvas.value || trades.length === 0) return
  
  // Calculate cumulative P&L over time
  const sortedTrades = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date))
  const chartData = []
  let cumulativePnL = 0
  
  sortedTrades.forEach(trade => {
    if (trade.type === 'sell') {
      cumulativePnL += (trade.quantity * trade.price) - (trade.fees || 0)
    } else {
      cumulativePnL -= (trade.quantity * trade.price) + (trade.fees || 0)
    }
    
    chartData.push({
      x: new Date(trade.date),
      y: cumulativePnL
    })
  })
  
  const ctx = chartCanvas.value.getContext('2d')
  
  if (chart) {
    chart.destroy()
  }
  
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Cumulative P&L',
        data: chartData,
        borderColor: cumulativePnL >= 0 ? '#10b981' : '#ef4444',
        backgroundColor: cumulativePnL >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day'
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'P&L ($)'
          },
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString()
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'P&L: $' + context.parsed.y.toLocaleString()
            }
          }
        }
      }
    }
  })
}

onMounted(() => {
  createChart()
})

watch(trades, () => {
  createChart()
}, { deep: true })
</script>