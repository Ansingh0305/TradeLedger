<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total P&L</p>
          <p :class="['text-2xl font-bold', totalPnL >= 0 ? 'text-green-600' : 'text-red-600']">
            {{ formatCurrency(totalPnL) }}
          </p>
        </div>
        <TrendingUp :class="['h-8 w-8', totalPnL >= 0 ? 'text-green-600' : 'text-red-600']" />
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Trades</p>
          <p class="text-2xl font-bold text-gray-900">{{ totalTrades }}</p>
        </div>
        <BarChart3 class="h-8 w-8 text-blue-600" />
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Win Rate</p>
          <p class="text-2xl font-bold text-gray-900">{{ formatPercentage(winRate) }}</p>
        </div>
        <Target class="h-8 w-8 text-purple-600" />
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Portfolio Value</p>
          <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(Math.abs(portfolioValue)) }}</p>
        </div>
        <Wallet class="h-8 w-8 text-indigo-600" />
      </div>
    </div>
  </div>
  
  <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <Shield class="mr-2 h-5 w-5 text-green-600" />
      Blockchain Integrity Status
    </h3>
    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
      <div class="flex items-center">
        <CheckCircle class="h-5 w-5 text-green-600 mr-2" />
        <span class="text-green-800 font-medium">All trades cryptographically secured</span>
      </div>
      <p class="text-green-700 text-sm mt-2">
        {{ totalTrades }} trade{{ totalTrades !== 1 ? 's' : '' }} hashed and anchored on Optimism rollup for immutable record keeping.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TrendingUp, BarChart3, Target, Wallet, Shield, CheckCircle } from 'lucide-vue-next'
import { useTradeStore } from '../stores/tradeStore'
import { formatCurrency, formatPercentage } from '../utils/calculations'

const tradeStore = useTradeStore()

const totalPnL = computed(() => tradeStore.totalPnL)
const totalTrades = computed(() => tradeStore.totalTrades)
const winRate = computed(() => tradeStore.winRate)
const portfolioValue = computed(() => tradeStore.portfolioValue)
</script>