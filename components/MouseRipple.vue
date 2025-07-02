<template>
  <div ref="rippleContainer" class="ripple-container"/>
</template>

<script setup lang="ts">
const rippleContainer = ref<HTMLElement | null>(null)

const createRipple = (e: MouseEvent) => {
  if (!rippleContainer.value) return

  const ripple = document.createElement('div')
  const size = 60
  const x = e.clientX - size / 2
  const y = e.clientY - size / 2

  ripple.classList.add('ripple')
  ripple.style.width = ripple.style.height = size + 'px'
  ripple.style.left = x + 'px'
  ripple.style.top = y + 'px'

  rippleContainer.value.appendChild(ripple)

  // Remove element after animation ends
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple)
    }
  }, 800)
}

onMounted(() => {
  document.addEventListener('click', createRipple)
})

onUnmounted(() => {
  document.removeEventListener('click', createRipple)
})
</script> 