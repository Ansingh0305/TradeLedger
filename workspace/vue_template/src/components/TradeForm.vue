<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
      <PlusCircle class="mr-2 h-6 w-6" />
      Add New Trade
    </h2>
    
    <form @submit.prevent="submitTrade" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
        <input
          v-model="form.symbol"
          type="text"
          placeholder="e.g., AAPL, BTC"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <select
          v-model="form.type"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
        <input
          v-model.number="form.quantity"
          type="number"
          step="0.00000001"
          placeholder="0.00"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
        <input
          v-model.number="form.price"
          type="number"
          step="0.01"
          placeholder="0.00"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          v-model="form.date"
          type="date"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Fees (Optional)</label>
        <input
          v-model.number="form.fees"
          type="number"
          step="0.01"
          placeholder="0.00"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
        <input
          v-model="form.notes"
          type="text"
          placeholder="Trade notes..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div class="md:col-span-2 lg:col-span-4 flex justify-end">
        <button
          type="submit"
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
        >
          <Save class="mr-2 h-4 w-4" />
          Add Trade
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PlusCircle, Save } from 'lucide-vue-next'
import { useTradeStore } from '../stores/tradeStore'

const tradeStore = useTradeStore()

const form = ref({
  symbol: '',
  type: 'buy',
  quantity: null,
  price: null,
  date: new Date().toISOString().split('T')[0],
  fees: 0,
  notes: ''
})

const submitTrade = () => {
  tradeStore.addTrade({
    symbol: form.value.symbol.toUpperCase(),
    type: form.value.type,
    quantity: form.value.quantity,
    price: form.value.price,
    date: form.value.date,
    fees: form.value.fees || 0,
    notes: form.value.notes
  })
  
  // Reset form
  form.value = {
    symbol: '',
    type: 'buy',
    quantity: null,
    price: null,
    date: new Date().toISOString().split('T')[0],
    fees: 0,
    notes: ''
  }
}
</script>