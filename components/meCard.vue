<template>
  <div class="ring-2 ring-neutral-700/30 p-3 rounded-xl flex flex-col items-start min-w-[300px] w-full max-w-[300px] overflow-hidden relative">
    <div
      class="absolute top-0 left-0 w-full h-[120px] rounded-t-xl overflow-hidden pointer-events-none"
      :class="{ 'blur-sm opacity-50': loading }"
    >
      <div
        class="w-full h-full bg-cover bg-center bg-no-repeat banner-fade"
        :style="`background-image: url('${images.banner}')`"
      ></div>
    </div>

    <div class="flex" :class="{ 'blur-sm opacity-50': loading }">
      <NuxtImg
        :src="images.avatar"
        quality="50"
        class="rounded-full w-30 h-30 object-cover z-1"
        alt="Profile picture"
        loading="lazy"
      />
    </div>

    <Randtxt class="mt-3" />

    <div
      class="flex flex-col w-full mt-3 transition-all duration-300"
      :class="{ 'blur-sm opacity-50': loading }"
    >
      <div class="flex mb-1">
        <a
          href="https://discord.com/users/1348261371653128255"
          target="_blank"
          rel="noopener noreferrer"
          class="no-underline"
        >
          <p class="text-3xl font-bold text-white transition duration-500 rounded-xl">
            Illyagif
          </p>
        </a>
      </div>

      <div class="flex flex-col w-full">
        <div class="flex items-center gap-2 mb-1">
          <template v-if="music && music.service">
            <Icon :name="serviceIcon" :class="serviceColor" />
          </template>
          <template v-else-if="currentDiscordActivity">
            <Icon :name="discordActivityIcon" :class="discordActivityColor" />
          </template>
          <template v-else>
            <Icon :name="idleIcon" class="text-neutral-400 text-2xl" />
          </template>

          <p class="text-neutral-500">Activity Now</p>
        </div>

        <div class="flex items-center justify-center ring-2 ring-neutral-900 rounded-md p-1 my-1 hover:scale-[102%] text-neutral-500 hover:text-neutral-400 duration-500">
          <p v-if="music && music.service">
            Слушает {{ music.service }}
          </p>
          <p v-else-if="hasDiscordActivity">
            {{ discordActivityTitle }}
          </p>
          <p v-else>
            Сейчас нет активностей
          </p>
        </div>

        <div
          v-if="music && music.service"
          class="flex items-center gap-3 ring-2 ring-neutral-900 rounded-md p-2 mt-2 w-full min-w-0 overflow-hidden hover:scale-[102%] transition duration-300"
        >
          <img
            :src="music.albumArt"
            class="w-20 h-20 rounded-md object-cover flex-shrink-0"
            alt="Album Art"
          />

          <div class="flex flex-col justify-center flex-1 min-w-0">
            <div ref="trackBox" class="w-full min-w-0 overflow-hidden">
              <p v-if="!shouldMarqueeTrack" class="text-white font-bold truncate">
                {{ music.track }}
              </p>
              <div v-else class="track-marquee">
                <span class="text-white font-bold whitespace-nowrap">{{ music.track }}</span>
                <span class="text-white font-bold whitespace-nowrap ml-8">{{ music.track }}</span>
              </div>

              <span
                ref="trackMeasure"
                class="absolute opacity-0 pointer-events-none text-white font-bold whitespace-nowrap"
              >
                {{ music.track }}
              </span>
            </div>

            <div ref="artistBox" class="w-full min-w-0 overflow-hidden mt-0.5">
              <p v-if="!shouldMarqueeArtist" class="text-neutral-400 text-sm truncate">
                {{ music.artist }}
              </p>
              <div v-else class="artist-marquee">
                <span class="text-neutral-400 text-sm whitespace-nowrap">{{ music.artist }}</span>
                <span class="text-neutral-400 text-sm whitespace-nowrap ml-8">{{ music.artist }}</span>
              </div>

              <span
                ref="artistMeasure"
                class="absolute opacity-0 pointer-events-none text-neutral-400 text-sm whitespace-nowrap"
              >
                {{ music.artist }}
              </span>
            </div>

            <div
              v-if="music.start && music.end"
              class="h-1 bg-neutral-700 rounded-full mt-1 overflow-hidden"
            >
              <div
                class="h-full bg-green-500"
                :style="{ width: animatedMusicProgress + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <div
          v-else-if="currentDiscordActivity"
          class="flex items-center gap-3 ring-2 ring-neutral-900 rounded-md p-2 mt-2 w-full min-w-0 overflow-hidden hover:scale-[102%] transition duration-300"
        >
          <div class="flex-shrink-0 w-12 h-12 rounded-md bg-neutral-900 flex items-center justify-center">
            <Icon :name="discordActivityIcon" :class="discordActivityColor" />
          </div>

          <div class="flex flex-col justify-center flex-1 min-w-0">
            <p class="text-white font-bold truncate">
              {{ discordActivityTitle }}
            </p>
            <p class="text-neutral-400 text-sm truncate">
              {{ truncatedDiscordActivity }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="weather">
        <div class="flex items-center gap-1 mt-2">
          <Icon name="fluent:weather-sunny-16-regular" class="text-yellow-700 text-xl" />
          <p class="text-neutral-500">Weather:</p>
        </div>

        <div class="flex flex-col items-center justify-center ring-2 ring-neutral-900 rounded-md p-1 my-1 hover:scale-[102%] text-neutral-500 hover:text-neutral-400 duration-500">
          <div class="flex items-center gap-1">
            <Icon name="material-symbols:location-on-outline-rounded" class="text-neutral-500" />
            <p>{{ location }}</p>
          </div>

          <div class="flex gap-1 items-center">
            <p>{{ temperature }}, {{ description }}</p>
            <Icon :name="weatherIcon" class="text-xl text-blue-700" />
          </div>
        </div>
      </div>

      <div v-else>
        <div class="flex items-center gap-1 mt-2">
          <Icon name="fluent:weather-sunny-16-regular" class="text-yellow-700" />
          <p class="text-neutral-500">Weather:</p>
        </div>

        <div class="flex flex-col items-center justify-center ring-2 ring-neutral-900 rounded-md p-1 my-1 hover:scale-[102%] text-neutral-500 hover:text-neutral-400 duration-500">
          <div class="flex gap-1">
            <p>Данные не найдены</p>
          </div>
        </div>
      </div>
    </div>

    <loadingSpinner
      v-if="loading"
      class="absolute inset-0 flex mx-auto my-auto items-center justify-center z-10 bg-black/20 rounded-xl"
    />
  </div>
</template>

<style>
.banner-fade {
  position: relative;
  filter: brightness(0.6);
  -webkit-mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
}

.track-marquee,
.artist-marquee {
  display: flex;
  width: max-content;
  white-space: nowrap;
  animation: marquee 10s linear infinite;
  will-change: transform;
}

.track-marquee span,
.artist-marquee span {
  flex: 0 0 auto;
}

.artist-marquee {
  animation-duration: 12s;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { getDiscordData, type DiscordResponse, type MusicActivity, type LanyardActivity } from '~/utils/discord'
import { getWeather, type WeatherInfo } from '~/utils/weather'

const discord = ref<DiscordResponse | null>(null)
const music = ref<MusicActivity | null>(null)
const weather = ref<WeatherInfo | null>(null)
const loading = ref(false)

const images = ref({
  banner: 'https://i.imgur.com/YididQV.gif',
  avatar: 'https://i.imgur.com/1nbI75I.jpeg',
})

let weatherInterval: ReturnType<typeof setInterval> | null = null
let discordInterval: ReturnType<typeof setInterval> | null = null

const animatedMusicProgress = ref(0)
let progressRaf: number | null = null

const trackBox = ref<HTMLElement | null>(null)
const trackMeasure = ref<HTMLElement | null>(null)
const artistBox = ref<HTMLElement | null>(null)
const artistMeasure = ref<HTMLElement | null>(null)
const shouldMarqueeTrack = ref(false)
const shouldMarqueeArtist = ref(false)

const updateMarqueeState = async () => {
  await nextTick()

  if (trackBox.value && trackMeasure.value) {
    shouldMarqueeTrack.value =
      trackMeasure.value.scrollWidth > trackBox.value.clientWidth + 1
  }

  if (artistBox.value && artistMeasure.value) {
    shouldMarqueeArtist.value =
      artistMeasure.value.scrollWidth > artistBox.value.clientWidth + 1
  }
}

const getMusicProgress = () => {
  if (!music.value?.start || !music.value?.end) return 0

  const start = Number(music.value.start)
  const end = Number(music.value.end)
  const now = Date.now()

  if (!start || !end || end <= start) return 0

  return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100))
}

const stopProgressAnimation = () => {
  if (progressRaf !== null) {
    cancelAnimationFrame(progressRaf)
    progressRaf = null
  }
}

const startProgressAnimation = () => {
  stopProgressAnimation()

  const tick = () => {
    if (!music.value?.start || !music.value?.end) {
      animatedMusicProgress.value = 0
      progressRaf = null
      return
    }

    const target = getMusicProgress()
    const current = animatedMusicProgress.value
    const next = current + (target - current) * 0.12

    animatedMusicProgress.value = Math.abs(target - next) < 0.05 ? target : next
    progressRaf = requestAnimationFrame(tick)
  }

  tick()
}

watch(
  () => [music.value?.start, music.value?.end, music.value?.track, music.value?.artist, music.value?.albumArt],
  () => {
    if (music.value?.start && music.value?.end) {
      startProgressAnimation()
    } else {
      stopProgressAnimation()
      animatedMusicProgress.value = 0
    }
  },
  { immediate: true },
)

watch(
  () => [music.value?.track, music.value?.artist],
  updateMarqueeState,
  { immediate: true },
)

const countryMap: Record<string, string> = {
  RU: 'Россия',
  UA: 'Украина',
}

const descriptionMap: Record<string, string> = {
  'ясно': 'Ясно',
  'плотная облачность': 'Плотная облачность',
  'пасмурно': 'Пасмурно',
  'облачно с прояснениями': 'Облачно с прояснениями',
  'дождь': 'Дождь',
  'ливень': 'Ливень',
  'гроза': 'Гроза',
  'снег': 'Снег',
  'моросящий снег': 'Моросящий снег',
  'туман': 'Туман',
  'изморозь': 'Изморозь',
  'ветренно': 'Ветрено',
  'мороз': 'Мороз',
}

const weatherIcons: Record<string, string> = {
  'ясно': 'mdi:weather-sunny',
  'плотная облачность': 'mdi:weather-cloudy',
  'пасмурно': 'ic:sharp-wb-cloudy',
  'облачно с прояснениями': 'ic:twotone-cloud-queue',
  'дождь': 'mdi:weather-rainy',
  'ливень': 'mdi:weather-pouring',
  'гроза': 'mdi:weather-lightning-rainy',
  'снег': 'mdi:weather-snowy',
  'моросящий снег': 'mdi:weather-snowy-rainy',
  'туман': 'mdi:weather-fog',
  'изморозь': 'material-symbols:severe-cold',
  'ветренно': 'mdi:weather-windy',
  'мороз': 'material-symbols:severe-cold',
}

const serviceIcons: Record<string, string> = {
  Spotify: 'mdi:spotify',
  'Apple Music': 'simple-icons:applemusic',
}

const serviceColors: Record<string, string> = {
  Spotify: 'text-green-500 text-2xl',
  'Apple Music': 'text-white text-2xl',
}

const serviceIcon = computed(() => {
  if (!music.value?.service || music.value.service === 'None') {
    return 'streamline:sleep-remix'
  }

  return serviceIcons[music.value.service] || 'streamline:sleep-remix'
})

const serviceColor = computed(() => {
  if (!music.value?.service || music.value.service === 'None') {
    return 'text-neutral-400 text-2xl'
  }

  return serviceColors[music.value.service] || 'text-neutral-500 text-2xl'
})

const location = computed(() => {
  if (!weather.value) return ''
  const countryName = countryMap[weather.value.country] || weather.value.country
  return `${countryName}, ${weather.value.city}`
})

const temperature = computed(() => {
  if (!weather.value) return ''
  return `${Math.round(weather.value.temperature)}°C`
})

const description = computed(() => {
  if (!weather.value) return ''
  return descriptionMap[weather.value.description] || weather.value.description
})

const weatherIcon = computed(() => {
  if (!weather.value) return 'mdi:weather-sunny'
  return weatherIcons[weather.value.description] || 'mdi:weather-sunny'
})

const discordActivities = computed<LanyardActivity[]>(() => {
  if (!discord.value) return []

  const rawActivities = discord.value.activities || []

  return rawActivities.filter((activity) => {
    if (!activity) return false
    if (activity.type === 4) return false
    if (activity.name === 'Spotify') return false
    if (activity.name === 'Apple Music') return false
    return true
  })
})

const currentDiscordActivity = computed(() => {
  const acts = discordActivities.value || []

  if (acts.length) {
    const a = acts[0]
    return {
      name: a.name || '',
      type: typeof a.type === 'number' ? a.type : Number(a.type) || 0,
      details: a.details || '',
      state: a.state || '',
      raw: a,
    }
  }

  return null
})

const hasDiscordActivity = computed(() => {
  return !!currentDiscordActivity.value || !!music.value
})

const discordActivityTitle = computed(() => {
  const activity = currentDiscordActivity.value
  if (!activity) return 'Сейчас нет активностей'

  const typeMap: Record<number, string> = {
    0: 'Играет',
    1: 'Стримит',
    2: 'Слушает',
    3: 'Смотрит',
    5: 'Соревнуется',
  }

  const label = typeMap[activity.type] || 'Активность'
  return `${label} ${activity.name || ''}`.trim()
})

const discordActivityText = computed(() => {
  const activity = currentDiscordActivity.value
  if (!activity) return ''

  const parts: string[] = []
  if (activity.details) parts.push(activity.details)
  if (activity.state) parts.push(activity.state)
  if (!parts.length && activity.name) return activity.name

  return parts.join(' — ')
})

const truncatedDiscordActivity = computed(() => {
  const fullText = discordActivityText.value
  const maxLength = 45

  if (!fullText) return ''
  if (fullText.length > maxLength) return `${fullText.slice(0, maxLength)}…`

  return fullText
})

const discordActivityIcon = computed(() => {
  const activity = currentDiscordActivity.value
  if (!activity) return 'mdi:discord'
  if (activity.name === 'VS CODE') return 'mdi:language-javascript'

  const iconMap: Record<number, string> = {
    0: 'mdi:gamepad-variant',
    1: 'mdi:twitch',
    2: 'mdi:headphones',
    3: 'mdi:television-play',
    5: 'mdi:trophy-outline',
  }

  return iconMap[activity.type] || 'mdi:discord'
})

const discordActivityColor = computed(() => {
  const activity = currentDiscordActivity.value
  if (!activity) return 'text-indigo-400 text-2xl'
  if (activity.name === 'VS CODE') return 'text-blue-400 text-2xl'

  const colorMap: Record<number, string> = {
    0: 'text-indigo-400 text-2xl',
    1: 'text-purple-400 text-2xl',
    2: 'text-green-400 text-2xl',
    3: 'text-blue-400 text-2xl',
    5: 'text-yellow-400 text-2xl',
  }

  return colorMap[activity.type] || 'text-indigo-400 text-2xl'
})

const idleIcon = computed(() => 'streamline:sleep-remix')

async function fetchDiscord() {
  try {
    const data = await getDiscordData()
    discord.value = data
    music.value = data.music || null
  } catch (error) {
    console.error('Error fetching discord activity:', error)
  }
}

async function fetchWeatherData() {
  try {
    weather.value = await getWeather()
  } catch (error) {
    console.error('Error fetching weather:', error)
  }
}

onMounted(async () => {
  loading.value = true

  try {
    await Promise.all([fetchDiscord(), fetchWeatherData()])
  } finally {
    loading.value = false
  }

  discordInterval = setInterval(fetchDiscord, 5000)
  weatherInterval = setInterval(fetchWeatherData, 10 * 60 * 1000)

  updateMarqueeState()
  window.addEventListener('resize', updateMarqueeState)
})

onBeforeUnmount(() => {
  stopProgressAnimation()

  if (discordInterval) clearInterval(discordInterval)
  if (weatherInterval) clearInterval(weatherInterval)

  window.removeEventListener('resize', updateMarqueeState)
})
</script>