<template>
  <div>
    <!-- Hero Section -->
    <section class="text-center py-12 md:py-20 mobile-spacing">
      <h1 class="text-3xl md:text-5xl font-bold text-cyber mb-4 md:mb-6 leading-tight">
        The Future of 
        <span class="text-cyber-glow">
          Decentralized Trading
        </span>
      </h1>
      <p class="text-lg md:text-xl text-cyber mb-6 md:mb-8 max-w-3xl mx-auto px-4">
        Vortex is a next-generation decentralized exchange built for speed, security, and simplicity. 
        Trade tokens, provide liquidity, and earn rewards in a fully decentralized environment.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4 px-4">
        <NuxtLink to="/swap" class="btn-cyber text-white font-medium text-lg px-6 md:px-8 py-3 w-full sm:w-auto">
          <span>Start Trading</span>
        </NuxtLink>
        <NuxtLink to="/pools" class="btn-cyber text-white font-medium text-lg px-6 md:px-8 py-3 opacity-80 w-full sm:w-auto">
          <span>Explore Pools</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="py-12 md:py-16 mobile-spacing">
      <div class="text-center mb-12 md:mb-16 px-4">
        <h2 class="text-2xl md:text-3xl font-bold text-cyber mb-4">Why Choose Vortex?</h2>
        <p class="text-base md:text-lg text-cyber max-w-2xl mx-auto">
          Experience the next generation of decentralized finance with advanced features and user-friendly design.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <!-- Feature 1 -->
        <div class="card text-center group">
          <div class="feature-icon bg-blue-100 group-hover:bg-blue-200">
            <Icon name="heroicons:bolt" class="w-6 h-6 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 class="text-lg md:text-xl font-semibold text-cyber mb-2 transition-colors duration-200 group-hover:text-cyber-glow">Lightning Fast</h3>
          <p class="text-sm md:text-base text-cyber transition-colors duration-200 group-hover:text-white">
            Execute trades in seconds with our optimized smart contracts and advanced routing algorithms.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="card text-center group">
          <div class="feature-icon bg-green-100 group-hover:bg-green-200">
            <Icon name="heroicons:shield-check" class="w-6 h-6 text-green-600 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 class="text-lg md:text-xl font-semibold text-cyber mb-2 transition-colors duration-200 group-hover:text-cyber-glow">Secure & Audited</h3>
          <p class="text-sm md:text-base text-cyber transition-colors duration-200 group-hover:text-white">
            Your funds are protected by industry-leading security measures and thoroughly audited smart contracts.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="card text-center group">
          <div class="feature-icon bg-purple-100 group-hover:bg-purple-200">
            <Icon name="heroicons:chart-bar" class="w-6 h-6 text-purple-600 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 class="text-lg md:text-xl font-semibold text-cyber mb-2 transition-colors duration-200 group-hover:text-cyber-glow">Earn Rewards</h3>
          <p class="text-sm md:text-base text-cyber transition-colors duration-200 group-hover:text-white">
            Provide liquidity and earn trading fees. Participate in yield farming to maximize your returns.
          </p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12 md:py-16 mobile-spacing">
      <div class="card">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-cyber mb-4">Platform Statistics</h2>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          <div class="stat-card p-3 md:p-4 rounded-lg">
            <div class="text-xl md:text-3xl font-bold text-blue-600 mb-1 md:mb-2 transition-transform duration-300 hover:scale-110">$2.4B+</div>
            <div class="text-xs md:text-sm text-cyber transition-colors duration-200 hover:text-white">Total Volume Traded</div>
          </div>
          <div class="stat-card p-3 md:p-4 rounded-lg">
            <div class="text-xl md:text-3xl font-bold text-green-600 mb-1 md:mb-2 transition-transform duration-300 hover:scale-110">150K+</div>
            <div class="text-xs md:text-sm text-cyber transition-colors duration-200 hover:text-white">Active Users</div>
          </div>
          <div class="stat-card p-3 md:p-4 rounded-lg">
            <div class="text-xl md:text-3xl font-bold text-purple-600 mb-1 md:mb-2 transition-transform duration-300 hover:scale-110">500+</div>
            <div class="text-xs md:text-sm text-cyber transition-colors duration-200 hover:text-white">Trading Pairs</div>
          </div>
          <div class="stat-card p-3 md:p-4 rounded-lg">
            <div class="text-xl md:text-3xl font-bold text-orange-600 mb-1 md:mb-2 transition-transform duration-300 hover:scale-110">99.9%</div>
            <div class="text-xs md:text-sm text-cyber transition-colors duration-200 hover:text-white">Uptime</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-12 md:py-20 text-center mobile-spacing">
      <h2 class="text-2xl md:text-3xl font-bold text-cyber mb-4">Ready to Get Started?</h2>
      <p class="text-base md:text-lg text-cyber mb-6 md:mb-8 max-w-2xl mx-auto px-4">
        Join thousands of traders who trust Vortex for their DeFi needs. Start trading in minutes.
      </p>
      <div class="flex justify-center px-4">
        <NuxtLink to="/swap" class="btn-cyber text-white font-medium text-lg px-6 md:px-8 py-3 w-full sm:w-auto max-w-sm">
          <span>Launch App</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  layout: 'default'
})

// SEO meta
useSeoMeta({
  title: 'Vortex DEX - The Future of Decentralized Trading',
  description: 'Trade tokens, provide liquidity, and earn rewards on Vortex - a next-generation decentralized exchange built for speed, security, and simplicity.'
})
</script> 