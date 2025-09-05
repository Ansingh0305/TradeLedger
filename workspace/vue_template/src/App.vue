<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <TrendingUp class="h-8 w-8 text-blue-600 mr-3" />
            <h1 class="text-2xl font-bold text-gray-900">TradeLedger</h1>
            <span class="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              Blockchain Secured
            </span>
          </div>
          <nav class="flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              <component :is="tab.icon" class="h-4 w-4 inline mr-2" />
              {{ tab.name }}
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Dashboard Tab -->
      <div v-if="activeTab === 'dashboard'">
        <Dashboard />
        <PerformanceChart />
      </div>

      <!-- Add Trade Tab -->
      <div v-if="activeTab === 'add-trade'">
        <TradeForm />
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div class="flex items-center">
            <Info class="h-5 w-5 text-blue-600 mr-2" />
            <span class="text-blue-800 font-medium">Blockchain Integration</span>
          </div>
          <p class="text-blue-700 text-sm mt-2">
            Each trade is automatically hashed client-side and will be anchored on Optimism rollup for immutable record keeping. 
            This ensures data integrity and provides cryptographic proof of your trading history.
          </p>
        </div>
      </div>

      <!-- Trade History Tab -->
      <div v-if="activeTab === 'history'">
        <TradeHistory />
      </div>

      <!-- Analytics Tab -->
      <div v-if="activeTab === 'analytics'">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart />
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 class="mr-2 h-5 w-5" />
              Trading Statistics
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600">Total Trades</span>
                <span class="font-semibold">{{ totalTrades }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600">Winning Trades</span>
                <span class="font-semibold text-green-600">{{ winningTrades }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600">Win Rate</span>
                <span class="font-semibold">{{ formatPercentage(winRate) }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-gray-600">Portfolio Value</span>
                <span class="font-semibold">{{ formatCurrency(Math.abs(portfolioValue)) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { TrendingUp, BarChart3, PlusCircle, History, Info } from 'lucide-vue-next'
import { useTradeStore } from './stores/tradeStore'
import { formatCurrency, formatPercentage } from './utils/calculations'
import Dashboard from './components/Dashboard.vue'
import TradeForm from './components/TradeForm.vue'
import TradeHistory from './components/TradeHistory.vue'
import PerformanceChart from './components/PerformanceChart.vue'

const tradeStore = useTradeStore()

const activeTab = ref('dashboard')

const tabs = [
  { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
  { id: 'add-trade', name: 'Add Trade', icon: PlusCircle },
  { id: 'history', name: 'Trade History', icon: History },
  { id: 'analytics', name: 'Analytics', icon: TrendingUp }
]

const totalTrades = computed(() => tradeStore.totalTrades)
const winningTrades = computed(() => tradeStore.winningTrades)
const winRate = computed(() => tradeStore.winRate)
const portfolioValue = computed(() => tradeStore.portfolioValue)
</script>

<style>
/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>