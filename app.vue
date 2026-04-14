<template>
  <NuxtLayout>
    <Transition
      appear
      mode="out-in"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      enter-active-class="transition-all duration-300 ease-out"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
      leave-active-class="transition-all duration-300 ease-in"
    >
      <div :key="$route.fullPath">
        <NuxtPage />
      </div>
    </Transition>
  </NuxtLayout>
</template>

<script setup>
useHead({
  bodyAttrs: {
    class: 'bg-neutral-950'
  },
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=TikTok+Sans:wght@400;500;700&display=swap'
    }
  ]
})
</script>