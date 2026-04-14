<template>
  <div class="flex text-neutral-400">
    <LoadingSpinner v-if="loading" />

    <div v-else-if="error">
    </div>

    <div v-else-if="userInfo" class="flex flex-row gap-3 items-center">
      <div class="flex gap-2 items-center">
        <div>you're here:</div>

        <div v-if="isVpn">Выключи VPN :)</div>

        <Icon
          v-if="userInfo.country_name"
          :name="'emojione-v1:flag-for-' + userInfo.country_name.toLowerCase()"
          class="text-2xl"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface UserInfo {
  ip: string
  asn?: string
  org?: string
  country_name?: string
}

const userInfo = ref<UserInfo | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const vpnAsns = new Set<string>([
  '',
])

const getUserInfo = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    if (!response.ok) throw new Error('Failed to fetch user info')

    const data = await response.json()

    userInfo.value = {
      ip: data.ip,
      asn: data.asn,
      org: data.org || data.isp,
      country_name: data.country_name
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

const isVpn = computed(() => {
  if (!userInfo.value?.asn) return false
  return vpnAsns.has(userInfo.value.asn)
})

onMounted(getUserInfo)
</script>