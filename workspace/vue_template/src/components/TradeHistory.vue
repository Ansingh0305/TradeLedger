<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900 flex items-center">
        <History class="mr-2 h-6 w-6" />
        Trade History
      </h2>
      <div class="flex items-center space-x-4">
        <select
          v-model="filterType"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="buy">Buy Only</option>
          <option value="sell">Sell Only</option>
        </select>
        <input
          v-model="searchSymbol"
          type="text"
          placeholder="Search symbol..."
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    
    <div v-if="filteredTrades.length === 0" class="text-center py-8 text-gray-500">
      <BarChart3 class="h-12 w-12 mx-auto mb-4 text-gray-300" />
      <p>No trades found. Start by adding your first trade!</p>
    </div>
    
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Symbol
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hash
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="trade in filteredTrades" :key="trade.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ trade.symbol }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="['px-2 py-1 text-xs font-semibold rounded-full', getTradeTypeBadge(trade.type)]">
                {{ trade.type.toUpperCase() }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ trade.quantity }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatCurrency(trade.price) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatCurrency(trade.quantity * trade.price) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatDate(trade.date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
              <div class="flex items-center">
                <span class="truncate max-w-20">{{ generateTradeHash(trade) }}</span>
                <Shield class="ml-1 h-3 w-3 text-green-600" />
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button
                @click="removeTrade(trade.id)"
                class="text-red-600 hover:text-red-900 flex items-center"
              >
                <Trash2 class="h-4 w-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { History, BarChart3, Shield, Trash2 } from 'lucide-vue-next'
import { useTradeStore } from '../stores/tradeStore'
import { formatCurrency, formatDate, getTradeTypeBadge, generateTradeHash } from '../utils/calculations'

const tradeStore = useTradeStore()

const filterType = ref('all')
const searchSymbol = ref('')

const filteredTrades = computed(() => {
  let filtered = [...tradeStore.trades]
  
  if (filterType.value !== 'all') {
    filtered = filtered.filter(trade => trade.type === filterType.value)
  }
  
  if (searchSymbol.value) {
    filtered = filtered.filter(trade => 
      trade.symbol.toLowerCase().includes(searchSymbol.value.toLowerCase())
    )
  }
  
  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const removeTrade = (id) => {
  if (confirm('Are you sure you want to remove this trade?')) {
    tradeStore.removeTrade(id)
  }
}
</script>