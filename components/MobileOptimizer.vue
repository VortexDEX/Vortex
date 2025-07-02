<template>
  <div/>
</template>

<script setup lang="ts">
// Mobile optimization utilities
const isMobile = ref(false)
const screenWidth = ref(0)
const screenHeight = ref(0)
const isLandscape = ref(false)

// Touch event handling
const touchStartX = ref(0)
const touchStartY = ref(0)
const touchEndX = ref(0)
const touchEndY = ref(0)

// Viewport height handling for mobile browsers
const setViewportHeight = () => {
  // Get actual viewport height (considering mobile browser address bar)
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

// Detect if device is mobile
const checkMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor
  const width = window.innerWidth
  
  isMobile.value = /android|ipad|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent) || width <= 768
  screenWidth.value = width
  screenHeight.value = window.innerHeight
  isLandscape.value = width > window.innerHeight
}

// Handle touch start
const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length === 1) {
    touchStartX.value = e.touches[0].clientX
    touchStartY.value = e.touches[0].clientY
  }
}

// Handle touch end
const handleTouchEnd = (e: TouchEvent) => {
  if (e.changedTouches.length === 1) {
    touchEndX.value = e.changedTouches[0].clientX
    touchEndY.value = e.changedTouches[0].clientY
    
    // Detect swipe gesture
    const deltaX = touchEndX.value - touchStartX.value
    const deltaY = touchEndY.value - touchStartY.value
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)
    
    // Minimum swipe distance
    const minSwipeDistance = 50
    
    if (absDeltaX > minSwipeDistance || absDeltaY > minSwipeDistance) {
      // Determine swipe direction
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          emit('swipeRight')
        } else {
          emit('swipeLeft')
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          emit('swipeDown')
        } else {
          emit('swipeUp')
        }
      }
    }
  }
}

// Prevent zooming (double-tap zoom)
const preventZoom = (e: TouchEvent) => {
  if (e.touches.length > 1) {
    e.preventDefault()
  }
}

// Prevent iOS Safari rubber band effect
const preventBounce = (e: TouchEvent) => {
  const target = e.target as Element
  const scrollableParent = target.closest('.scrollable')
  
  if (!scrollableParent) {
    e.preventDefault()
  }
}

// Optimize click delay (remove 300ms delay)
const optimizeClick = () => {
  if (isMobile.value) {
    document.addEventListener('touchstart', () => {}, { passive: true })
  }
}

// Listen for screen orientation changes
const handleOrientationChange = () => {
  setTimeout(() => {
    checkMobile()
    setViewportHeight()
  }, 100)
}

// Throttle function
const throttle = <T extends (...args: unknown[]) => void>(func: T, limit: number): T => {
  let inThrottle: boolean
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  } as T
}

// Debounce function
const debounce = <T extends (...args: unknown[]) => void>(func: T, limit: number): T => {
  let timeout: NodeJS.Timeout
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), limit)
  } as T
}

// Event emitter
const emit = defineEmits<{
  swipeLeft: []
  swipeRight: []
  swipeUp: []
  swipeDown: []
  orientationChange: [isLandscape: boolean]
  resize: [width: number, height: number]
}>()

// Expose reactive state to parent component
defineExpose({
  isMobile: readonly(isMobile),
  screenWidth: readonly(screenWidth),
  screenHeight: readonly(screenHeight),
  isLandscape: readonly(isLandscape)
})

// Lifecycle hooks
onMounted(() => {
  // Initialize
  checkMobile()
  setViewportHeight()
  optimizeClick()
  
  // Add event listeners
  const throttledResize = throttle(() => {
    checkMobile()
    setViewportHeight()
    emit('resize', screenWidth.value, screenHeight.value)
  }, 100)
  
  const debouncedOrientationChange = debounce(() => {
    handleOrientationChange()
    emit('orientationChange', isLandscape.value)
  }, 200)
  
  window.addEventListener('resize', throttledResize)
  window.addEventListener('orientationchange', debouncedOrientationChange)
  
  // Mobile event listeners
  if (isMobile.value) {
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
    document.addEventListener('touchstart', preventZoom, { passive: false })
    document.addEventListener('touchmove', preventBounce, { passive: false })
  }
  
  // Cleanup function
  onUnmounted(() => {
    window.removeEventListener('resize', throttledResize)
    window.removeEventListener('orientationchange', debouncedOrientationChange)
    
    if (isMobile.value) {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchstart', preventZoom)
      document.removeEventListener('touchmove', preventBounce)
    }
  })
})

// Provide global mobile state
provide('mobile', {
  isMobile: readonly(isMobile),
  screenWidth: readonly(screenWidth),
  screenHeight: readonly(screenHeight),
  isLandscape: readonly(isLandscape)
})
</script>

<style scoped>
/* Ensure correct viewport height */
:global(html) {
  height: 100%;
  height: calc(var(--vh, 1vh) * 100);
}

:global(body) {
  height: 100%;
  height: calc(var(--vh, 1vh) * 100);
}

/* Mobile scrolling optimization */
:global(.scrollable) {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}

/* Disable text selection (in certain cases) */
:global(.no-select) {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Mobile tap highlight optimization */
:global(.touch-target) {
  -webkit-tap-highlight-color: rgba(59, 130, 246, 0.2);
  tap-highlight-color: rgba(59, 130, 246, 0.2);
}

/* Mobile safe area adaptation */
:global(.safe-area-inset) {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
</style> 