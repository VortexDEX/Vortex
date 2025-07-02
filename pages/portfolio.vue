<template>
  <div>
    <!-- Header -->
    <div class="mb-6 md:mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-cyber-glow mb-2">Portfolio</h1>
      <p class="text-cyber">Track your assets and liquidity positions</p>
    </div>

    <!-- Connect Wallet Prompt -->
    <div v-if="!isConnected" class="content-bg p-4 md:p-6">
      <div class="card text-center py-8 md:py-12">
        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background: rgba(59, 130, 246, 0.2);">
          <Icon name="heroicons:wallet" class="w-8 h-8 text-blue-400" />
        </div>
        <h3 class="text-lg md:text-xl font-semibold text-cyber-glow mb-2">Connect Your Wallet</h3>
        <p class="text-sm md:text-base text-cyber mb-6 max-w-md mx-auto px-4">
          Connect your wallet to view your portfolio, track your assets, and manage your liquidity positions.
        </p>
        <button class="btn-cyber text-white font-medium py-2 px-4 w-full sm:w-auto">
          <span>Connect Wallet</span>
        </button>
      </div>
    </div>

    <!-- Portfolio Content -->
    <div v-else class="space-y-6 md:space-y-8">
      <!-- Portfolio Overview -->
      <div class="content-bg p-4 md:p-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          <div class="stat-card group">
            <h3 class="text-xs md:text-sm font-medium text-gray-300 mb-1 group-hover:text-white transition-colors">Total Balance</h3>
            <p class="text-lg md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">${{ totalBalance.toLocaleString() }}</p>
            <p class="text-xs md:text-sm text-green-400 group-hover:text-green-300 transition-colors">+$1,250 (+2.8%)</p>
          </div>
          <div class="stat-card group">
            <h3 class="text-xs md:text-sm font-medium text-gray-300 mb-1 group-hover:text-white transition-colors">Available Assets</h3>
            <p class="text-lg md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">${{ availableAssets.toLocaleString() }}</p>
            <p class="text-xs md:text-sm text-gray-300 group-hover:text-blue-300 transition-colors">Ready to trade</p>
          </div>
          <div class="stat-card group">
            <h3 class="text-xs md:text-sm font-medium text-gray-300 mb-1 group-hover:text-white transition-colors">LP Positions</h3>
            <p class="text-lg md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">${{ lpPositions.toLocaleString() }}</p>
            <p class="text-xs md:text-sm text-blue-400 group-hover:text-blue-300 transition-colors">{{ positions.length }} active pools</p>
          </div>
          <div class="stat-card group">
            <h3 class="text-xs md:text-sm font-medium text-gray-300 mb-1 group-hover:text-white transition-colors">Unclaimed Rewards</h3>
            <p class="text-lg md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">${{ unclaimedRewards.toLocaleString() }}</p>
            <button class="text-xs md:text-sm text-blue-400 hover:text-blue-300 font-medium mt-1 transition-all duration-200 hover:scale-105 hover:underline group-hover:text-blue-300">
              Claim All
            </button>
          </div>
        </div>
      </div>

      <!-- Assets Table -->
      <div class="content-bg p-6">
        <div class="card">
          <h2 class="text-xl font-bold text-cyber-glow mb-6">Your Assets</h2>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead style="background: rgba(59, 130, 246, 0.1);">
                <tr class="text-left">
                  <th class="px-6 py-4 text-sm font-medium text-white">Asset</th>
                  <th class="px-6 py-4 text-sm font-medium text-white">Balance</th>
                  <th class="px-6 py-4 text-sm font-medium text-white">Price</th>
                  <th class="px-6 py-4 text-sm font-medium text-white">Value</th>
                  <th class="px-6 py-4 text-sm font-medium text-white">24h Change</th>
                </tr>
              </thead>
            <tbody class="divide-y divide-gray-600/30">
              <tr v-for="asset in assets" :key="asset.token.id" class="hover:bg-white/5 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-3">
                    <img 
                      :src="asset.token.logoURI" 
                      :alt="asset.token.symbol"
                      class="w-8 h-8 rounded-full"
                    >
                    <div>
                      <div class="font-medium text-white">{{ asset.token.symbol }}</div>
                      <div class="text-sm text-gray-300">{{ asset.token.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-white">
                  {{ asset.balance }}
                </td>
                <td class="px-6 py-4 text-sm text-white">
                  ${{ asset.price.toFixed(2) }}
                </td>
                <td class="px-6 py-4 text-sm text-white">
                  ${{ ((safeParseFloat(asset.balance.replace(/,/g, '')) || 0) * asset.price).toFixed(2) }}
                </td>
                <td class="px-6 py-4">
                  <span
:class="[
                    'text-sm font-medium',
                    asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                  ]">
                    {{ asset.change24h >= 0 ? '+' : '' }}{{ asset.change24h.toFixed(2) }}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>

      <!-- Liquidity Positions -->
      <div class="content-bg p-6">
        <div class="card">
        <h2 class="text-xl font-bold text-cyber-glow mb-6">Liquidity Positions</h2>
        <div v-if="positions.length === 0" class="text-center py-8">
          <Icon name="heroicons:beaker" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-white mb-2">No liquidity positions</h3>
          <p class="text-gray-300 mb-4">Start providing liquidity to earn trading fees</p>
          <NuxtLink to="/pools" class="btn-cyber text-white font-medium py-2 px-4">
            <span>Explore Pools</span>
          </NuxtLink>
        </div>
        <div v-else class="space-y-4">
          <div v-for="position in positions" :key="position.id" class="border border-gray-200 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="flex -space-x-1">
                  <img 
                    :src="position.pool.token0.logoURI" 
                    :alt="position.pool.token0.symbol"
                    class="w-8 h-8 rounded-full border-2 border-white"
                  >
                  <img 
                    :src="position.pool.token1.logoURI" 
                    :alt="position.pool.token1.symbol"
                    class="w-8 h-8 rounded-full border-2 border-white"
                  >
                </div>
                <div>
                  <div class="font-medium text-white">
                    {{ position.pool.token0.symbol }}/{{ position.pool.token1.symbol }}
                  </div>
                  <div class="text-sm text-gray-300">
                    {{ position.pool.fee }}% fee tier
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-medium text-white">
                  ${{ (safeParseInt(position.liquidity) || 0).toLocaleString() }}
                </div>
                <div class="text-sm text-gray-300">Total Value</div>
              </div>
            </div>
            
            <div class="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div class="text-gray-300">{{ position.pool.token0.symbol }} Amount</div>
                <div class="font-medium text-white">{{ position.token0Amount }}</div>
              </div>
              <div>
                <div class="text-gray-300">{{ position.pool.token1.symbol }} Amount</div>
                <div class="font-medium text-white">{{ position.token1Amount }}</div>
              </div>
              <div>
                <div class="text-gray-300">Unclaimed Fees</div>
                <div class="font-medium text-green-400">
                  ${{ ((safeParseFloat(position.fees.token0) || 0) + (safeParseFloat(position.fees.token1) || 0)).toFixed(2) }}
                </div>
              </div>
            </div>

            <div class="flex space-x-3 mt-4">
              <button class="btn-secondary text-sm">
                Add Liquidity
              </button>
              <button class="btn-secondary text-sm">
                Remove Liquidity
              </button>
              <button class="text-blue-400 hover:text-blue-300 text-sm font-medium transition-all duration-200 hover:scale-105 hover:underline">
                Claim Fees
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Position } from '~/types'
import { safeParseFloat, safeParseInt } from '~/utils/validation'

// Page meta
definePageMeta({
  layout: 'default'
})

// State
const isConnected = ref(true) // Mock wallet connection state - set to true for demo

// Mock data
const assets = ref([
  {
    token: {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
      address: '0x0000000000000000000000000000000000000000',
      chainId: 1
    },
    balance: '12.5',
    price: 2450.50,
    change24h: 2.8
  },
  {
    token: {
      id: 'usd-coin',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png',
      address: '0xA0b86a33E6417c823DD8D97BF7c5dc69E5c5B439',
      chainId: 1
    },
    balance: '8,450.00',
    price: 1.00,
    change24h: 0.1
  },
  {
    token: {
      id: 'wbtc',
      name: 'Wrapped Bitcoin',
      symbol: 'WBTC',
      decimals: 8,
      logoURI: 'https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png',
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      chainId: 1
    },
    balance: '0.25',
    price: 98750.00,
    change24h: -1.2
  }
])

const positions = ref<Position[]>([
  {
    id: '1',
    pool: {
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
    liquidity: '15000',
    token0Amount: '2.5',
    token1Amount: '6,125.00',
    fees: {
      token0: '0.05',
      token1: '125.50'
    }
  }
])

// Computed
const totalBalance = computed(() => {
  const assetValue = assets.value.reduce((sum, asset) => {
    const balance = safeParseFloat(asset.balance.replace(/,/g, '')) || 0
    return sum + (balance * asset.price)
  }, 0)
  const positionValue = positions.value.reduce((sum, position) => {
    const liquidity = safeParseInt(position.liquidity) || 0
    return sum + liquidity
  }, 0)
  return assetValue + positionValue
})

const availableAssets = computed(() => {
  return assets.value.reduce((sum, asset) => {
    const balance = safeParseFloat(asset.balance.replace(/,/g, '')) || 0
    return sum + (balance * asset.price)
  }, 0)
})

const lpPositions = computed(() => {
  return positions.value.reduce((sum, position) => {
    const liquidity = safeParseInt(position.liquidity) || 0
    return sum + liquidity
  }, 0)
})

const unclaimedRewards = computed(() => {
  return positions.value.reduce((sum, position) => {
    const fee0 = safeParseFloat(position.fees.token0) || 0
    const fee1 = safeParseFloat(position.fees.token1) || 0
    return sum + fee0 + fee1
  }, 0)
})

// For demo purposes, set connected after 1 second
onMounted(() => {
  setTimeout(() => {
    isConnected.value = true
  }, 1000)
})

// SEO
useSeoMeta({
  title: 'Portfolio - Vortex DEX',
  description: 'View your asset portfolio and liquidity positions on Vortex DEX'
})
</script> 