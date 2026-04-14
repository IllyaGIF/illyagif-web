<template>
  <div class="flex gap-4">
    <a
      v-for="(host, index) in hosts" 
      :href="'https://'+host.ip"
      target="_blank"
      :key="index"
      class="flex flex-row items-center justify-center px-4 py-3 gap-2 rounded-lg ring-2 ring-neutral-800 hover:scale-[105%] hover:ring-neutral-700 duration-500"
      :class="getStatusClass(host)"
    > 
      <Icon 
        v-if="host.countryCode"
        :name="`emojione-v1:flag-for-${host.countryCode.toLowerCase()}`" 
        class="text-2xl flex-shrink-0"
      />

      <div class="text-sm text-center text-neutral-300">
        {{ host.ip }}
      </div>

      <div class="flex flex-col items-center">

        <LoadingSpinner v-if="host.status === 'loading'" />

        <Icon 
          v-else-if="host.status === 'error'" 
          name="iconamoon:cloud-error" 
          class="text-red-500 text-2xl"
        />

        <div v-if="host.responseTime !== null" class="text-xs text-green-600">
          {{ host.responseTime }}ms
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
interface HostConfig {
  ip: string
  countryCode?: string
}

interface Host extends HostConfig {
  status: 'loading' | 'success' | 'error' | 'idle'
  responseTime: number | null
}

interface Props {
  hosts: HostConfig[]
  timeout?: number
}

const props = withDefaults(defineProps<Props>(), {
  timeout: 3000
})

const hosts = ref<Host[]>(
  props.hosts.map(host => ({
    ...host,
    status: 'idle',
    responseTime: null
  }))
)

const intervalId = ref<NodeJS.Timeout | null>(null)

const getStatusClass = (host: Host) => {
  const classes = {
    success: '',
    error: 'ring-red-500/50',
    loading: 'ring-blue-500/50',
    idle: ''
  }
  return classes[host.status]
}

const ping = async (host: Host) => {
  host.status = 'loading'
  host.responseTime = null
  
  const startTime = Date.now()
  
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), props.timeout)
    
    await fetch(`https://${host.ip}`, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache',
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    host.status = 'success'
    host.responseTime = Date.now() - startTime
  } catch (error) {
    host.status = 'error'
    host.responseTime = null
  }
}

const pingAll = () => {
  hosts.value.forEach(host => ping(host))
}

onMounted(() => {
  pingAll()
  intervalId.value = setInterval(pingAll, 10000)
})

onUnmounted(() => {
  if (intervalId.value) clearInterval(intervalId.value)
})
</script>
