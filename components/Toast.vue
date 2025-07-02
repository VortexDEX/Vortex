<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed top-4 right-4 z-[9999] max-w-sm w-full"
    >
      <div
        :class="[
          'toast-container',
          `toast-${type}`,
          visible ? 'toast-enter' : 'toast-exit'
        ]"
        role="alert"
        :aria-live="type === 'error' ? 'assertive' : 'polite'"
      >
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <Icon
              :name="iconName"
              :class="[
                'w-5 h-5',
                type === 'success' ? 'text-green-400' : '',
                type === 'error' ? 'text-red-400' : '',
                type === 'warning' ? 'text-yellow-400' : '',
                type === 'info' ? 'text-blue-400' : ''
              ]"
            />
          </div>
                     <div class="flex-1 min-w-0">
             <p class="text-sm font-medium text-white" v-text="safeTitle"/>
             <p 
               v-if="safeMessage" 
               class="mt-1 text-sm text-gray-300" 
               v-text="safeMessage"
             />
           </div>
          <button
            class="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200"
            :aria-label="'Close notification'"
            @click="close"
          >
            <Icon name="heroicons:x-mark" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { sanitizeString } from '~/utils/validation'

interface Props {
  type?: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  visible?: boolean
}

interface Emits {
  (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 5000,
  visible: false,
  message: ''
})

const emit = defineEmits<Emits>()

// Sanitize text content
const safeTitle = computed(() => sanitizeString(props.title))
const safeMessage = computed(() => props.message ? sanitizeString(props.message) : '')

const iconName = computed(() => {
  switch (props.type) {
    case 'success':
      return 'heroicons:check-circle'
    case 'error':
      return 'heroicons:x-circle'
    case 'warning':
      return 'heroicons:exclamation-triangle'
    case 'info':
    default:
      return 'heroicons:information-circle'
  }
})

let timeoutId: NodeJS.Timeout | null = null

const close = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  emit('close')
}

// Auto close
watch(() => props.visible, (newVisible) => {
  if (newVisible && props.duration > 0) {
    timeoutId = setTimeout(close, props.duration)
  }
}, { immediate: true })

// Clear timer on component unmount
onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})

defineOptions({
  name: 'SystemToast'
})
</script>

<style scoped>
.toast-container {
  @apply p-4 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.toast-success {
  @apply border-green-500/30;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
}

.toast-error {
  @apply border-red-500/30;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
}

.toast-warning {
  @apply border-yellow-500/30;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);
}

.toast-info {
  @apply border-blue-500/30;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
}

.toast-enter {
  @apply transform translate-x-0 opacity-100;
}

.toast-exit {
  @apply transform translate-x-full opacity-0;
}

.toast-container {
  transform: translateX(100%);
  opacity: 0;
}

.toast-enter {
  transform: translateX(0);
  opacity: 1;
}
</style> 