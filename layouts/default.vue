<template>
  <div class="min-h-screen cyber-grid flex flex-col">
    <!-- Cloud effect -->
    <div class="cloud-layer cloud-1"/>
    <div class="cloud-layer cloud-2"/>
    <div class="cloud-layer cloud-3"/>
    <div class="cloud-layer cloud-4"/>
    
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 nav-glass z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and brand -->
          <div class="flex items-center">
            <NuxtLink 
              to="/" 
              class="flex items-center space-x-2 group"
            >
              <div class="logo-container">
                <span class="text-white font-bold text-lg">V</span>
              </div>
              <span class="text-xl font-bold text-cyber transition-colors duration-200 group-hover:text-cyber-glow">Vortex</span>
            </NuxtLink>
          </div>

          <!-- Desktop Navigation links -->
          <div class="hidden md:flex items-center space-x-2">
            <NuxtLink 
              to="/swap" 
              class="nav-link"
            >
              Swap
            </NuxtLink>
            <NuxtLink 
              to="/pools" 
              class="nav-link"
            >
              Pools
            </NuxtLink>
            <NuxtLink 
              to="/portfolio" 
              class="nav-link"
            >
              Portfolio
            </NuxtLink>
          </div>

          <!-- Desktop Connect wallet button -->
          <div class="hidden md:flex items-center">
            <button class="btn-cyber text-white font-medium py-2 px-4 flex items-center space-x-2">
              <span class="flex items-center space-x-2">
                <Icon name="heroicons:wallet" class="w-4 h-4" />
                <span>Connect Wallet</span>
              </span>
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button 
              class="mobile-menu-button p-2 rounded-md text-cyber hover:text-cyber-glow hover:bg-white/10 transition-all duration-200"
              :class="{ 'bg-white/10': isMobileMenuOpen }"
              @click="toggleMobileMenu"
            >
              <span class="sr-only">Open main menu</span>
              <div class="w-6 h-6 relative">
                <span 
                  class="hamburger-line top-1"
                  :class="{ 'rotate-45 translate-y-2': isMobileMenuOpen }"
                />
                <span 
                  class="hamburger-line top-3"
                  :class="{ 'opacity-0': isMobileMenuOpen }"
                />
                <span 
                  class="hamburger-line top-5"
                  :class="{ '-rotate-45 -translate-y-2': isMobileMenuOpen }"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div 
        class="md:hidden mobile-menu"
        :class="{ 'open': isMobileMenuOpen }"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 bg-black/20 backdrop-blur-md border-t border-white/10">
          <NuxtLink 
            to="/swap" 
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            <Icon name="heroicons:arrow-path" class="w-5 h-5" />
            <span>Swap</span>
          </NuxtLink>
          <NuxtLink 
            to="/pools" 
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            <Icon name="heroicons:beaker" class="w-5 h-5" />
            <span>Pools</span>
          </NuxtLink>
          <NuxtLink 
            to="/portfolio" 
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            <Icon name="heroicons:briefcase" class="w-5 h-5" />
            <span>Portfolio</span>
          </NuxtLink>
          <div class="pt-4 border-t border-white/10">
            <button class="mobile-connect-button">
              <Icon name="heroicons:wallet" class="w-5 h-5" />
              <span>Connect Wallet</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile menu overlay -->
    <div 
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/50 z-40 md:hidden"
      @click="closeMobileMenu"
    />

    <!-- Main content wrapper with flex-grow to push footer down -->
    <div class="flex-grow">
      <!-- Main content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <slot />
      </main>
    </div>

    <!-- Footer - will always stick to bottom -->
    <footer class="relative mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-cyber text-sm">
          © 2025 Vortex DEX. Built with modern technologies for the decentralized future.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Mobile menu state
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  closeMobileMenu()
})

// Close mobile menu on escape key
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeMobileMenu()
    }
  }
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})

// Meta configuration
useSeoMeta({
  title: 'Vortex DEX',
  description: 'A modern decentralized exchange platform'
})
</script> 