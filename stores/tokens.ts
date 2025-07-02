import { defineStore } from 'pinia'
import type { Token } from '~/types'
import { validateToken } from '~/utils/validation'

export const useTokensStore = defineStore('tokens', () => {
  // State
  const tokens = ref<Token[]>([])
  const selectedTokenIn = ref<Token | null>(null)
  const selectedTokenOut = ref<Token | null>(null)
  const isLoading = ref(false)

  // Mock tokens for development
  const mockTokens: Token[] = [
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
      address: '0x0000000000000000000000000000000000000000',
      chainId: 1
    },
    {
      id: 'usd-coin',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png',
      address: '0xA0b86a33E6417c823DD8D97BF7c5dc69E5c5B439',
      chainId: 1
    },
    {
      id: 'dai',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/9956/thumb/4943.png',
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      chainId: 1
    },
    {
      id: 'wbtc',
      name: 'Wrapped Bitcoin',
      symbol: 'WBTC',
      decimals: 8,
      logoURI: 'https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png',
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      chainId: 1
    }
  ]

  // Actions
  const loadTokens = async () => {
    isLoading.value = true
    try {
      // Validate all tokens before setting
      const validatedTokens = mockTokens.filter(validateToken)
      
      if (validatedTokens.length === 0) {
        throw new Error('No valid tokens found')
      }
      
      tokens.value = validatedTokens
      
      // Set default tokens
      if (tokens.value.length >= 2) {
        selectedTokenIn.value = tokens.value[0] // ETH
        selectedTokenOut.value = tokens.value[1] // USDC
      }
    } catch (error) {
      console.error('Failed to load tokens:', error)
      // Provide fallback solution
      tokens.value = []
    } finally {
      isLoading.value = false
    }
  }

  const setTokenIn = (token: Token) => {
    if (validateToken(token)) {
      selectedTokenIn.value = token
    }
  }

  const setTokenOut = (token: Token) => {
    if (validateToken(token)) {
      selectedTokenOut.value = token
    }
  }

  const swapTokens = () => {
    const temp = selectedTokenIn.value
    selectedTokenIn.value = selectedTokenOut.value
    selectedTokenOut.value = temp
  }

  const getTokenBySymbol = (symbol: string): Token | undefined => {
    return tokens.value.find(token => token.symbol === symbol)
  }

  // Getters
  const availableTokens = computed(() => tokens.value)
  const tokenInSymbol = computed(() => selectedTokenIn.value?.symbol || '')
  const tokenOutSymbol = computed(() => selectedTokenOut.value?.symbol || '')

  return {
    // State
    tokens: readonly(tokens),
    selectedTokenIn: readonly(selectedTokenIn),
    selectedTokenOut: readonly(selectedTokenOut),
    isLoading: readonly(isLoading),
    
    // Actions
    loadTokens,
    setTokenIn,
    setTokenOut,
    swapTokens,
    getTokenBySymbol,
    
    // Getters
    availableTokens,
    tokenInSymbol,
    tokenOutSymbol
  }
}) 