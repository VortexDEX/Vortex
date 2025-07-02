<template>
  <div class="max-w-md mx-auto px-4 md:px-0">
    <div class="content-bg p-1 mb-6">
    <div class="card">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4 md:mb-6">
        <h1 class="text-xl md:text-2xl font-bold text-cyber">Swap Tokens</h1>
        <button class="btn-ghost p-2">
          <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 text-gray-600 transition-transform duration-200 hover:rotate-90" />
        </button>
      </div>

      <!-- Swap Form -->
      <div class="space-y-4">
        <!-- From Token -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-cyber">From</label>
          <div class="relative">
            <input 
              v-model="amountIn"
              type="text" 
              placeholder="0.0"
              class="input-cyber pr-32"
              pattern="[0-9]*\.?[0-9]*"
              inputmode="decimal"
              autocomplete="off"
              spellcheck="false"
              @input="validateAmountInput"
              @paste="handlePaste"
            >
            <button 
              class="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 hover:shadow-md px-3 py-1 rounded-lg transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              @click="openTokenSelector('in')"
            >
              <img 
                v-if="selectedTokenIn?.logoURI" 
                :src="selectedTokenIn.logoURI" 
                :alt="selectedTokenIn.symbol"
                class="w-5 h-5 rounded-full"
              >
              <span class="font-medium">{{ selectedTokenIn?.symbol || 'Select' }}</span>
              <Icon name="heroicons:chevron-down" class="w-4 h-4" />
            </button>
          </div>
          <div v-if="selectedTokenIn" class="text-sm text-gray-500">
            Balance: 0.00 {{ selectedTokenIn.symbol }}
          </div>
          <div v-if="inputError" class="text-sm text-red-500 mt-1">
            {{ inputError }}
          </div>
        </div>

        <!-- Swap Button -->
        <div class="flex justify-center">
          <button 
            class="swap-button"
            @click="swapTokens"
          >
            <Icon name="heroicons:arrow-up-down" class="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <!-- To Token -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-cyber">To</label>
          <div class="relative">
            <input 
              v-model="amountOut"
              type="text" 
              placeholder="0.0"
              class="input-cyber pr-32"
              readonly
              tabindex="-1"
            >
            <button 
              class="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 hover:shadow-md px-3 py-1 rounded-lg transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              @click="openTokenSelector('out')"
            >
              <img 
                v-if="selectedTokenOut?.logoURI" 
                :src="selectedTokenOut.logoURI" 
                :alt="selectedTokenOut.symbol"
                class="w-5 h-5 rounded-full"
              >
              <span class="font-medium">{{ selectedTokenOut?.symbol || 'Select' }}</span>
              <Icon name="heroicons:chevron-down" class="w-4 h-4" />
            </button>
          </div>
          <div v-if="selectedTokenOut" class="text-sm text-gray-500">
            Balance: 0.00 {{ selectedTokenOut.symbol }}
          </div>
        </div>

        <!-- Price Info -->
        <div v-if="selectedTokenIn && selectedTokenOut" class="bg-gray-50 rounded-lg p-4 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Rate</span>
            <span class="font-medium">1 {{ selectedTokenIn.symbol }} = 1,234.56 {{ selectedTokenOut.symbol }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Slippage</span>
            <span class="font-medium">0.5%</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Network Fee</span>
            <span class="font-medium">~$2.15</span>
          </div>
        </div>

        <!-- Swap Button -->
        <button 
          :disabled="!canSwap"
          :class="[
            'w-full py-3 md:py-4 rounded-lg font-medium text-base md:text-lg transition-colors',
            canSwap 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          ]"
        >
          {{ swapButtonText }}
        </button>
      </div>
    </div>
    </div>

    <!-- Token Selector Modal -->
    <TokenSelector 
      v-if="showTokenSelector"
      :tokens="availableTokens"
      @select="selectToken"
      @close="closeTokenSelector"
    />
  </div>
</template>

<script setup lang="ts">
import type { Token } from '~/types'
import { safeParseFloat, amountSchema } from '~/utils/validation'

// Page meta
definePageMeta({
  layout: 'default'
})

// Store
const tokensStore = useTokensStore()
const { selectedTokenIn, selectedTokenOut, availableTokens } = storeToRefs(tokensStore)
const { loadTokens, setTokenIn, setTokenOut, swapTokens: swapTokensInStore } = tokensStore

// State
const amountIn = ref('')
const amountOut = ref('')
const showTokenSelector = ref(false)
const selectorType = ref<'in' | 'out'>('in')
const inputError = ref('')

// Computed
const canSwap = computed(() => {
  const amount = safeParseFloat(amountIn.value)
  return selectedTokenIn.value && 
         selectedTokenOut.value && 
         amount !== null &&
         amount > 0 &&
         !inputError.value
})

const swapButtonText = computed(() => {
  if (inputError.value) {
    return inputError.value
  }
  if (!selectedTokenIn.value || !selectedTokenOut.value) {
    return 'Select Tokens'
  }
  const amount = safeParseFloat(amountIn.value)
  if (!amountIn.value || amount === null || amount <= 0) {
    return 'Enter Amount'
  }
  return 'Swap'
})

// Methods
const openTokenSelector = (type: 'in' | 'out') => {
  selectorType.value = type
  showTokenSelector.value = true
}

const closeTokenSelector = () => {
  showTokenSelector.value = false
}

const selectToken = (token: Token) => {
  if (selectorType.value === 'in') {
    setTokenIn(token)
  } else {
    setTokenOut(token)
  }
  closeTokenSelector()
}

const swapTokens = () => {
  swapTokensInStore()
  // Swap amounts as well
  const temp = amountIn.value
  amountIn.value = amountOut.value
  amountOut.value = temp
}

// Input validation function
const validateAmountInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  try {
    amountSchema.parse(value)
    inputError.value = ''
  } catch (error) {
    if (error instanceof Error) {
      const zodError = error as { errors?: Array<{ message: string }> }
      inputError.value = zodError.errors?.[0]?.message || 'Invalid input'
    } else {
      inputError.value = 'Invalid input'
    }
  }
}

// Handle paste event
const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pastedText = event.clipboardData?.getData('text/plain') || ''
  
  // Keep only numbers and decimal point
  const cleanedText = pastedText.replace(/[^0-9.]/g, '')
  
  // Prevent multiple decimal points
  const parts = cleanedText.split('.')
  if (parts.length > 2) {
    amountIn.value = parts[0] + '.' + parts.slice(1).join('')
  } else {
    amountIn.value = cleanedText
  }
  
  // Trigger validation
  validateAmountInput(new Event('input', { bubbles: true }))
}

// Watch for amount changes to calculate output
watch(amountIn, (newAmount) => {
  if (newAmount && selectedTokenIn.value && selectedTokenOut.value) {
    // Mock calculation - in real app this would call a price oracle/DEX
    const amount = safeParseFloat(newAmount)
    if (amount !== null && amount > 0) {
      amountOut.value = (amount * 1234.56).toFixed(6)
    } else {
      amountOut.value = ''
    }
  } else {
    amountOut.value = ''
  }
})

// Initialize tokens
onMounted(() => {
  loadTokens()
})

// SEO
useSeoMeta({
  title: 'Swap Tokens - Vortex DEX',
  description: 'Swap tokens on Vortex DEX with best rates and minimal slippage'
})
</script> 