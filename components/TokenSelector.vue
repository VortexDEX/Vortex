<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Select Token</h3>
        <button class="btn-ghost p-1" @click="$emit('close')">
          <Icon name="heroicons:x-mark" class="w-5 h-5 text-gray-600 transition-transform duration-200 hover:rotate-90" />
        </button>
      </div>

      <!-- Search -->
      <div class="p-4 border-b border-gray-200">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search name or symbol"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
          maxlength="100"
          autocomplete="off"
          spellcheck="false"
          @input="handleSearchInput"
        >
      </div>

      <!-- Token List -->
      <div class="max-h-64 overflow-y-auto">
        <div v-for="token in filteredTokens" :key="token.id">
          <button 
            class="token-selector-item"
            @click="selectToken(token)"
          >
            <img 
              :src="token.logoURI" 
              :alt="token.symbol"
              class="w-8 h-8 rounded-full"
              @error="handleImageError"
            >
            <div class="flex-1">
              <div class="font-medium text-gray-900">{{ token.symbol }}</div>
              <div class="text-sm text-gray-500">{{ token.name }}</div>
            </div>
            <div class="text-right">
              <div class="font-medium text-gray-900">0.00</div>
              <div class="text-sm text-gray-500">Balance</div>
            </div>
          </button>
        </div>
        
        <div v-if="filteredTokens.length === 0" class="p-8 text-center text-gray-500">
          No tokens found
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Token } from '~/types'
import { sanitizeString, searchQuerySchema } from '~/utils/validation'

// Props
interface Props {
  tokens: Token[]
}

// Emits
interface Emits {
  (e: 'select', token: Token): void
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// State
const searchQuery = ref('')

// Computed
const filteredTokens = computed(() => {
  if (!searchQuery.value) {
    return props.tokens
  }
  
  const query = searchQuery.value.toLowerCase()
  return props.tokens.filter(token => 
    token.name.toLowerCase().includes(query) ||
    token.symbol.toLowerCase().includes(query)
  )
})

// Methods
const selectToken = (token: Token) => {
  emit('select', token)
}

const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = sanitizeString(target.value)
  
  try {
    searchQuerySchema.parse(value)
    searchQuery.value = value
  } catch {
    // If validation fails, keep the previous value
    target.value = searchQuery.value
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM5Q0EzQUYiLz4KPHR4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+PzwvdHh0Pgo8L3N2Zz4K'
}

// Handle escape key
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      emit('close')
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script> 