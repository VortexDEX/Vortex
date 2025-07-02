<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-cyber-glow mb-2">Liquidity Pools</h1>
        <p class="text-cyber">Provide liquidity and earn trading fees</p>
      </div>
      <NuxtLink to="/pools/add" class="btn-cyber text-white font-medium py-2 px-4 w-full sm:w-auto">
        <span>Add Liquidity</span>
      </NuxtLink>
    </div>

    <!-- Stats Cards -->
    <div class="content-bg p-4 md:p-6 mb-6 md:mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div class="stat-card group">
          <h3 class="text-sm font-medium text-gray-300 mb-1 group-hover:text-white transition-colors">Total Value Locked</h3>
          <p class="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">$2.4B</p>
          <p class="text-xs md:text-sm text-green-400 group-hover:text-green-300 transition-colors">+12.5% from last month</p>
        </div>
        <div class="stat-card group">
          <h3 class="text-sm font-medium text-gray-300 mb-1 group-hover:text-white transition-colors">24h Volume</h3>
          <p class="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">$156M</p>
          <p class="text-xs md:text-sm text-blue-400 group-hover:text-blue-300 transition-colors">+5.2% from yesterday</p>
        </div>
        <div class="stat-card group">
          <h3 class="text-sm font-medium text-gray-300 mb-1 group-hover:text-white transition-colors">Total Pools</h3>
          <p class="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">1,247</p>
          <p class="text-xs md:text-sm text-purple-400 group-hover:text-purple-300 transition-colors">+23 new pools</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="content-bg p-4 md:p-6 mb-6">
      <div class="card">
        <div class="flex flex-col sm:flex-row gap-4">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search pools..."
            class="input-cyber flex-1 min-w-0"
            maxlength="100"
            autocomplete="off"
            spellcheck="false"
            @input="handleSearchInput"
          >
          <select 
            v-model="sortBy"
            class="input-cyber w-full sm:w-auto"
          >
            <option value="liquidity">Sort by Liquidity</option>
            <option value="volume">Sort by Volume</option>
            <option value="apr">Sort by APR</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Pools Table/Cards -->
    <div class="content-bg p-4 md:p-6">
      <div class="card overflow-hidden">
        <!-- Desktop Table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full">
            <thead style="background: rgba(59, 130, 246, 0.1);">
              <tr class="text-left">
                <th class="px-6 py-4 text-sm font-medium text-white">Pool</th>
                <th class="px-6 py-4 text-sm font-medium text-white">Fee</th>
                <th class="px-6 py-4 text-sm font-medium text-white">TVL</th>
                <th class="px-6 py-4 text-sm font-medium text-white">Volume (24h)</th>
                <th class="px-6 py-4 text-sm font-medium text-white">APR</th>
                <th class="px-6 py-4 text-sm font-medium text-white">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="pool in filteredPools" :key="pool.id" class="pool-row">
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="flex -space-x-1">
                    <img 
                      :src="pool.token0.logoURI" 
                      :alt="pool.token0.symbol"
                      class="w-8 h-8 rounded-full border-2 border-white"
                    >
                    <img 
                      :src="pool.token1.logoURI" 
                      :alt="pool.token1.symbol"
                      class="w-8 h-8 rounded-full border-2 border-white"
                    >
                  </div>
                  <div>
                    <div class="font-medium text-white">
                      {{ pool.token0.symbol }}/{{ pool.token1.symbol }}
                    </div>
                    <div class="text-sm text-gray-300">
                      {{ pool.token0.name }} / {{ pool.token1.name }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-300">
                {{ pool.fee }}%
              </td>
              <td class="px-6 py-4 text-sm text-white">
                ${{ formatNumber(pool.liquidity) }}
              </td>
              <td class="px-6 py-4 text-sm text-white">
                ${{ formatNumber(pool.volume24h) }}
              </td>
              <td class="px-6 py-4">
                <span class="text-green-600 font-medium">{{ pool.apr.toFixed(2) }}%</span>
              </td>
              <td class="px-6 py-4">
                <div class="flex space-x-2">
                  <button class="text-blue-400 hover:text-blue-300 text-sm font-medium transition-all duration-200 hover:scale-105 hover:underline">
                    Add
                  </button>
                  <button class="text-gray-400 hover:text-gray-300 text-sm font-medium transition-all duration-200 hover:scale-105 hover:underline">
                    Remove
                  </button>
                </div>
              </td>
                          </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="md:hidden space-y-4">
          <div v-for="pool in filteredPools" :key="pool.id" class="border border-gray-600/30 rounded-lg p-4 hover:bg-white/5 transition-colors">
            <!-- Pool Header -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-3">
                <div class="flex -space-x-1">
                  <img 
                    :src="pool.token0.logoURI" 
                    :alt="pool.token0.symbol"
                    class="w-8 h-8 rounded-full border-2 border-white"
                  >
                  <img 
                    :src="pool.token1.logoURI" 
                    :alt="pool.token1.symbol"
                    class="w-8 h-8 rounded-full border-2 border-white"
                  >
                </div>
                <div>
                  <div class="font-medium text-white">
                    {{ pool.token0.symbol }}/{{ pool.token1.symbol }}
                  </div>
                  <div class="text-xs text-gray-300">
                    {{ pool.fee }}% fee
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-green-600 font-medium">{{ pool.apr.toFixed(2) }}%</div>
                <div class="text-xs text-gray-300">APR</div>
              </div>
            </div>

            <!-- Pool Stats -->
            <div class="grid grid-cols-2 gap-3 mb-3 text-sm">
              <div>
                <div class="text-gray-300">TVL</div>
                <div class="font-medium text-white">${{ formatNumber(pool.liquidity) }}</div>
              </div>
              <div>
                <div class="text-gray-300">24h Volume</div>
                <div class="font-medium text-white">${{ formatNumber(pool.volume24h) }}</div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex space-x-2">
              <button class="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                Add Liquidity
              </button>
              <button class="flex-1 py-2 px-3 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredPools.length === 0" class="text-center py-12">
      <Icon name="heroicons:magnifying-glass" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-white mb-2">No pools found</h3>
      <p class="text-gray-300">Try adjusting your search criteria</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pool } from '~/types'
import { sanitizeString, safeParseInt, searchQuerySchema } from '~/utils/validation'

// Page meta
definePageMeta({
  layout: 'default'
})

// State
const searchQuery = ref('')
const sortBy = ref('liquidity')

// Mock pools data
const pools = ref<Pool[]>([
  {
    id: '1',
    token0: {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
      address: '0x0000000000000000000000000000000000000000',
      chainId: 1
    },
    token1: {
      id: 'usd-coin',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png',
      address: '0xA0b86a33E6417c823DD8D97BF7c5dc69E5c5B439',
      chainId: 1
    },
    fee: 0.3,
    liquidity: '450000000',
    volume24h: '25000000',
    volumeWeek: '180000000',
    apr: 12.5
  },
  {
    id: '2',
    token0: {
      id: 'wbtc',
      name: 'Wrapped Bitcoin',
      symbol: 'WBTC',
      decimals: 8,
      logoURI: 'https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png',
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      chainId: 1
    },
    token1: {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
      address: '0x0000000000000000000000000000000000000000',
      chainId: 1
    },
    fee: 0.3,
    liquidity: '320000000',
    volume24h: '18000000',
    volumeWeek: '125000000',
    apr: 8.7
  },
  {
    id: '3',
    token0: {
      id: 'dai',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/9956/thumb/4943.png',
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      chainId: 1
    },
    token1: {
      id: 'usd-coin',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png',
      address: '0xA0b86a33E6417c823DD8D97BF7c5dc69E5c5B439',
      chainId: 1
    },
    fee: 0.05,
    liquidity: '280000000',
    volume24h: '12000000',
    volumeWeek: '85000000',
    apr: 3.2
  }
])

// Computed
const filteredPools = computed(() => {
  let filtered = pools.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(pool => 
      pool.token0.symbol.toLowerCase().includes(query) ||
      pool.token1.symbol.toLowerCase().includes(query) ||
      pool.token0.name.toLowerCase().includes(query) ||
      pool.token1.name.toLowerCase().includes(query)
    )
  }

  // Sort pools
  filtered.sort((a, b) => {
    let aVolume, bVolume, aLiquidity, bLiquidity;
    
    switch (sortBy.value) {
      case 'volume':
        aVolume = safeParseInt(a.volume24h) || 0
        bVolume = safeParseInt(b.volume24h) || 0
        return bVolume - aVolume
      case 'apr':
        return b.apr - a.apr
      case 'liquidity':
      default:
        aLiquidity = safeParseInt(a.liquidity) || 0
        bLiquidity = safeParseInt(b.liquidity) || 0
        return bLiquidity - aLiquidity
    }
  })

  return filtered
})

// Safe search input handler
const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = sanitizeString(target.value)
  
  try {
    searchQuerySchema.parse(value)
    searchQuery.value = value
  } catch {
    target.value = searchQuery.value
  }
}

// Methods
const formatNumber = (value: string): string => {
  const num = safeParseInt(value)
  if (!num) return '0'
  
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B'
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M'
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K'
  }
  return num.toString()
}

// SEO
useSeoMeta({
  title: 'Liquidity Pools - Vortex DEX',
  description: 'Explore liquidity pools on Vortex DEX and earn rewards by providing liquidity'
})
</script> 