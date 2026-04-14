<template>
  <div :class="spinnerClass" role="status" aria-label="Loading">
    <svg
      class="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <circle
        class="opacity-75"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-dasharray="80"
        stroke-dashoffset="60"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'h-5 w-5'
  },
  color: {
    type: String,
    default: 'text-white'
  }
})

const spinnerClass = computed(() => `${props.size} ${props.color}`)
</script>