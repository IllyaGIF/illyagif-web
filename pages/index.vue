<template>
  <div class="flex flex-col items-center justify-center min-h-screen pt-20 sm:pt-0 px-4 pb-24 sm:pb-0">
    <div class="flex flex-col sm:flex-row items-center justify-center w-full max-w-screen-md gap-8">
      <div class="flex flex-col text-center items-center md:items-start sm:text-left px-2 sm:px-4">
        <div class="flex md:hidden mb-2 w-full max-w-[320px]">
          <MeCard class="w-full" />
        </div>

        <div class="flex flex-col items-center sm:items-start mt-2 w-full">
          <h1 class="text-white text-lg sm:text-xl leading-6 max-w-[35ch] sm:max-w-[70ch]">
            Привет! Я <span class="text-[#ff8d8d]">IllyaGIF</span>&nbsp;<span class="text-[#ff8d8d]">{{ ageFormatted }}</span> летний developer из Кропивницкого
          </h1>

          <p class="text-neutral-400 text-base sm:text-lg leading-6">
            Я увлекаюсь любительским coding на C, C++, Rust, Go и создаю сайты на Vue

            <br class="sm:hidden">

            <span
              v-for="tech in techList"
              :key="tech.name"
              class="inline-flex items-center gap-1 ml-2"
            >
              <Icon :name="tech.icon" /> {{ tech.name }}
            </span>
          </p>

          <p class="text-neutral-400 text-md leading-6">
            Ранее в основном занимался бездельем, сейчас же моя деятельность совершенно разнообразна, начиная c
            <a
              href="https://github.com/illya1122/amazingnetwork"
              target="_blank"
              rel="noopener noreferrer"
              class="items-center gap-1 inline-flex !text-neutral-300 hover:scale-[102%] hover:!text-white duration-500"
            >
              простого инструмента для проверки сети
            </a>
            заканчивая
          </p>

          <div class="relative inline-block mt-0">
            <span
              class="cursor-default text-neutral-400 hover:text-white transition-colors duration-300"
              @mouseenter="showTooltip"
              @mouseleave="hideTooltip"
            >
              полноценным сайтом
            </span>

            <transition name="tooltip-fade">
              <span
                v-if="showHere"
                class="absolute left-1/2 bottom-full mb-0 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900/95 px-3 py-1 text-xs text-white shadow-lg"
              >
                ты уже тут
              </span>
            </transition>
          </div>

          <div class="mt-2 flex justify-center sm:justify-start">
            <button
              type="button"
              @click="showContinue = !showContinue"
              class="inline-flex items-center gap-1 rounded-full border border-neutral-700/60 bg-neutral-900/40 px-0 -my-1 text-xs text-neutral-300 transition-all duration-300 hover:border-neutral-500 hover:bg-neutral-800/70 hover:text-white hover:scale-105"
            >
              <span>{{ showContinue ? 'Скрыть' : 'Подробнее' }}</span>
              <Icon
                name="material-symbols:keyboard-arrow-down-rounded"
                class="transition-transform duration-300"
                :class="{ 'rotate-180': showContinue }"
              />
            </button>
          </div>

          <div class="mt-2 max-w-[70ch] text-neutral-400 text-md leading-6">
            <transition name="expand-down">
              <div
                v-if="showContinue"
                class="max-w-[70ch] text-neutral-400 text-md leading-6 overflow-hidden"
              >
                Я разработчик из Кропивницкого. Изучаю системное администрирование и программирование
                разработку приложений и веб-сайтов. Создаю проекты на C, C++, Rust, Go, Python и Nuxt,
                а также изучаю Linux и работу серверов
              </div>
            </transition>
          </div>

          <Ipinfo />
        </div>

        <div
        
          class="mt-5 grid grid-cols-1 md:grid-cols-3 gap-x-8 md:gap-x-3 gap-y-5 w-full sm:w-max max-w-xl sm:max-w-3xl justify-center items-center mx-auto text-white font-semibold"
        >
          <NuxtLink
            v-for="card in linkCards"
            :key="card.to"
            :to="card.to"
            class="grid px-5 py-2 h-full rounded-xl ring-1 ring-neutral-700/40 hover:scale-[103%] transition duration-500"
          >
            <div>
              <div class="flex text-xl">
                <div class="flex rounded-md ring-1 ring-neutral-700/50 mr-3 p-1.5 h-max">
                  <Icon class="text-1xl" :name="card.icon" />
                </div>
                <p>{{ card.title }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="hidden md:flex shrink-0 w-full max-w-[320px]">
        <MeCard class="w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useHead } from '#imports'

const birthDate = new Date('2012-01-01T00:00:00Z')

function calculateAge(bd: Date): number {
  const now = new Date()
  const diffMs = now.getTime() - bd.getTime()
  const msInYear = 1000 * 60 * 60 * 24 * 365.25
  return diffMs / msInYear
}

const age = ref<number>(calculateAge(birthDate))
const ageFormatted = computed(() => age.value.toFixed(7))

let intervalId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  intervalId = setInterval(() => {
    age.value = calculateAge(birthDate)
  }, 1000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})

const showContinue = ref(false)

const linkCards = [
  {
    to: '/projects',
    title: 'Мои проекты',
    icon: 'material-symbols:folder-check-2-rounded',
  },
  {
    to: '/donate',
    title: 'Поддержать',
    icon: 'material-symbols:payments-outline',
  },
  {
    to: '/me',
    title: 'Контакты',
    icon: 'material-symbols:phone-in-talk-watchface-indicator',
  },
]

const showHere = ref(false)

function showTooltip() {
  showHere.value = true
}

function hideTooltip() {
  showHere.value = false
}

const techList = [
  { name: 'C', icon: 'logos:c' },
  { name: 'C++', icon: 'logos:c-plusplus' },
  { name: 'ASM', icon: 'material-symbols:code' },
  { name: 'Rust', icon: 'simple-icons:rust' },
  { name: 'Golang', icon: 'skill-icons:golang' },
  { name: 'Objective-C', icon: 'simple-icons:apple' },
  { name: 'Python', icon: 'material-icon-theme:python' },
  { name: 'Nuxt', icon: 'devicon:nuxt' },
  { name: 'Node.js', icon: 'devicon:nodejs' },
  { name: 'unoCSS', icon: 'vscode-icons:file-type-unocss' },
  { name: 'nginx', icon: 'material-icon-theme:nginx' },
  { name: 'Docker', icon: 'devicon:docker' },
  { name: 'GitHub', icon: 'akar-icons:github-fill' },
  { name: 'git', icon: 'logos:git-icon' },
  { name: 'Linux', icon: 'logos:linux-tux' },
  { name: 'Fedora', icon: 'logos:fedora' },
  { name: 'VS Code', icon: 'vscode-icons:file-type-vscode' },
]

const description = 'Личный сайт IllyaGIF: проекты на C, Go, Rust, Nuxt, контакты и заметки.'

useHead({
  title: 'IllyaGIF — разработчик, проекты и контакты',
  meta: [
    { name: 'description', content: description },
    { name: 'robots', content: 'index,follow,max-image-preview:large' },
    { property: 'og:title', content: 'IllyaGIF — разработчик, проекты и контакты' },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://illyagif.xyz/' },
    { property: 'og:site_name', content: 'IllyaGIF' },
    { property: 'og:image', content: 'https://i.imgur.com/1nbI75I.jpeg' },
    { name: 'twitter:site', content: '@IllyaGIF' },
    { name: 'twitter:creator', content: '@IllyaGIF' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'IllyaGIF — разработчик, проекты и контакты' },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: 'https://i.imgur.com/1nbI75I.jpeg' },
  ],
  link: [{ rel: 'canonical', href: 'https://illyagif.xyz/' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'IllyaGIF',
        url: 'https://illyagif.xyz/',
        image: 'https://i.imgur.com/1nbI75I.jpeg',
        sameAs: [
          'https://github.com/illya1122/amazingnetwork',
          'https://discord.com/users/1348261371653128255',
        ],
        jobTitle: 'Разработчик',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Кропивницкий',
          addressCountry: 'UA',
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'IllyaGIF',
        url: 'https://illyagif.xyz/',
      }),
    },
  ],
})
</script>

<style>
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(6px);
}

.tooltip-fade-enter-to,
.tooltip-fade-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.expand-down-enter-active,
.expand-down-leave-active {
  overflow: hidden;
  transition:
    max-height 0.45s ease,
    opacity 0.35s ease,
    transform 0.45s ease,
    margin-top 0.45s ease;
}

.expand-down-enter-from,
.expand-down-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-8px);
  margin-top: 0;
}

.expand-down-enter-to,
.expand-down-leave-from {
  max-height: 180px;
  opacity: 1;
  transform: translateY(0);
}
</style>
