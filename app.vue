<template>
  <div>
    <NuxtRouteAnnouncer />
    <MouseRipple />
    <MobileOptimizer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Global app configuration
useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>
