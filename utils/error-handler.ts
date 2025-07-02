export interface AppError extends Error {
  statusCode?: number
  code?: string
  details?: Record<string, unknown>
}

export class ValidationError extends Error implements AppError {
  statusCode = 400
  code = 'VALIDATION_ERROR'
  
  constructor(message: string, public details?: Record<string, unknown>) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class NetworkError extends Error implements AppError {
  statusCode = 500
  code = 'NETWORK_ERROR'
  
  constructor(message: string = 'Network request failed') {
    super(message)
    this.name = 'NetworkError'
  }
}

export class TokenError extends Error implements AppError {
  statusCode = 400
  code = 'TOKEN_ERROR'
  
  constructor(message: string) {
    super(message)
    this.name = 'TokenError'
  }
}

// Safe error logging
export function logError(error: Error, context?: string): void {
  // Log full error in development environment
  if (import.meta.dev) {
    console.error(`[${context || 'ERROR'}]:`, error)
    return
  }
  
  // Production environment only logs necessary info to avoid sensitive data leakage
  const safeError = {
    name: error.name,
    message: error.message,
    context,
    timestamp: new Date().toISOString()
  }
  
  console.error('Application error:', safeError)
}

// User-friendly error messages
export function getUserFriendlyMessage(error: Error): string {
  if (error instanceof ValidationError) {
    return error.message
  }
  
  if (error instanceof NetworkError) {
    return 'Network request failed, please check your connection'
  }
  
  if (error instanceof TokenError) {
    return 'Token operation failed: ' + error.message
  }
  
  // Production environment does not expose specific error messages
  if (!import.meta.dev) {
    return 'Operation failed, please try again later'
  }
  
  return error.message
}

// Create error handling composable
export function useErrorHandler() {
  const handleError = (error: Error, context?: string) => {
    logError(error, context)
    
    // Here we can integrate error reporting service like Sentry
    // if (process.client && window.sentry) {
    //   window.sentry.captureException(error)
    // }
    
    return getUserFriendlyMessage(error)
  }
  
  interface ErrorResponse {
    status?: number
    message?: string
    details?: Record<string, unknown>
  }
  
  const createErrorFromResponse = (response: ErrorResponse): AppError => {
    const status = response?.status ?? 0
    
    if (status === 400) {
      return new ValidationError(response.message || 'Validation failed', response.details)
    }
    
    if (status >= 500) {
      return new NetworkError('Server error occurred')
    }
    
    return new Error(response?.message || 'Unknown error')
  }
  
  return {
    handleError,
    createErrorFromResponse,
    ValidationError,
    NetworkError,
    TokenError
  }
} 