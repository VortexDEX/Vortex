import { z } from 'zod'
import type { Token } from '~/types'

// Number validation pattern
export const amountSchema = z.string()
  .regex(/^\d*\.?\d*$/, 'Amount must be a valid number')
  .refine((val) => {
    if (!val) return true // Allow empty value
    const num = parseFloat(val)
    return !isNaN(num) && num >= 0 && num <= 1e18 // Prevent too large numbers
  }, 'Amount must be a positive number less than 1e18')

// Address validation pattern
export const addressSchema = z.string()
  .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address format')

// Token symbol validation
export const tokenSymbolSchema = z.string()
  .min(1, 'Token symbol is required')
  .max(10, 'Token symbol too long')
  .regex(/^[A-Z0-9]+$/, 'Token symbol must contain only uppercase letters and numbers')

// Search query validation
export const searchQuerySchema = z.string()
  .max(100, 'Search query too long')
  .regex(/^[a-zA-Z0-9\s\-_]*$/, 'Search query contains invalid characters')

// Safe number parsing function
export function safeParseFloat(value: string): number | null {
  if (!value || typeof value !== 'string') return null
  
  // Remove leading and trailing spaces
  const trimmed = value.trim()
  if (!trimmed) return null
  
  // Validate format
  if (!/^\d*\.?\d*$/.test(trimmed)) return null
  
  const parsed = parseFloat(trimmed)
  
  // Check if valid number
  if (isNaN(parsed) || !isFinite(parsed)) return null
  
  // Check range
  if (parsed < 0 || parsed > 1e18) return null
  
  return parsed
}

export function safeParseInt(value: string): number | null {
  if (!value || typeof value !== 'string') return null
  
  const trimmed = value.trim()
  if (!trimmed) return null
  
  // Validate numbers only
  if (!/^\d+$/.test(trimmed)) return null
  
  const parsed = parseInt(trimmed, 10)
  
  if (isNaN(parsed) || !isFinite(parsed)) return null
  
  // Check reasonable range
  if (parsed < 0 || parsed > Number.MAX_SAFE_INTEGER) return null
  
  return parsed
}

// Clean and escape string
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000) // Limit length
}

// Validate image URL
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol) &&
           /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(urlObj.pathname)
  } catch {
    return false
  }
}

// Token validation
export function validateToken(token: unknown): token is Token {
  try {
    const tokenSchema = z.object({
      id: z.string().min(1).max(100),
      name: z.string().min(1).max(100),
      symbol: tokenSymbolSchema,
      decimals: z.number().int().min(0).max(18),
      logoURI: z.string().url().optional(),
      address: addressSchema,
      chainId: z.number().int().positive()
    })
    
    tokenSchema.parse(token)
    return true
  } catch {
    return false
  }
}

// HTML escape to prevent XSS
export function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// Rate limiting helper
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(key: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now()
  const existing = rateLimitMap.get(key)
  
  if (!existing || now > existing.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (existing.count >= maxRequests) {
    return false
  }
  
  existing.count++
  return true
} 