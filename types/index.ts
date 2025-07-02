// Token interface
export interface Token {
  id: string
  name: string
  symbol: string
  decimals: number
  logoURI?: string
  address: string
  chainId: number
}

// Trading pair interface
export interface TradingPair {
  token0: Token
  token1: Token
  liquidity: string
  volume24h: string
  price: string
  priceChange24h: number
}

// Swap interface
export interface SwapParams {
  tokenIn: Token
  tokenOut: Token
  amountIn: string
  amountOut: string
  slippage: number
  deadline: number
}

// Pool interface
export interface Pool {
  id: string
  token0: Token
  token1: Token
  fee: number
  liquidity: string
  volume24h: string
  volumeWeek: string
  apr: number
}

// Position interface
export interface Position {
  id: string
  pool: Pool
  liquidity: string
  token0Amount: string
  token1Amount: string
  fees: {
    token0: string
    token1: string
  }
}

// Navigation item interface
export interface NavItem {
  name: string
  href: string
  icon?: string
  current?: boolean
}

// Chart data interface
export interface ChartData {
  timestamp: number
  price: number
  volume: number
} 