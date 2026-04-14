<template>
  <div class="flex flex-col items-center justify-center min-h-screen pt-20 sm:pt-0 px-4">
    <div class="flex flex-col sm:flex-row items-center justify-center w-full max-w-screen-md gap-8">
      <div class="flex flex-col text-center items-center md:items-start sm:text-left px-2 sm:px-4">
        <MeCard class="flex md:hidden mb-2" />

        <div class="flex flex-col items-center sm:items-start mt-2">
          <p class="text-white text-lg sm:text-xl leading-6 max-w-[35ch] sm:max-w-[70ch]">
            Привет! Я <span class="text-[#ff8d8d]">{{ ageFormatted }}</span> летний балбес из Кропивницкого
          </p>

          <p class="text-neutral-400 text-base sm:text-lg leading-6">
            Я занимаюсь любительскими проектами по типу прошивок на C и сайтов
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
              class="items-center gap-1 inline-flex hover:scale-[102%] hover:text-white duration-500"
            >
              простого инструмента для проверки сети
              <Icon name="material-symbols:link-rounded" />
            </a>,
            заканчивая
            <a
              href="#"
              class="items-center gap-1 inline-flex hover:scale-[102%] hover:text-white duration-500"
            >
              полноценным сайтом
              <Icon name="material-symbols:link-rounded" />
            </a>.
          </p>

          <Ipinfo />
        </div>

        <div
          class="mt-5 grid grid-cols-1 md:grid-cols-3 gap-x-8 md:gap-x-3 gap-y-7 w-full sm:w-max max-w-xl sm:max-w-3xl justify-center items-center mx-auto text-white font-semibold"
        >
          <NuxtLink
            v-for="card in linkCards"
            :key="card.to"
            :to="card.to"
            class="grid px-5 py-2 h-full rounded-xl ring-2 ring-neutral-700/40 hover:scale-[103%] transition duration-500"
          >
            <div>
              <div class="flex text-xl">
                <div class="flex rounded-md ring-2 ring-neutral-700/50 mr-3 p-1.5 h-max">
                  <Icon class="text-1xl" :name="card.icon" />
                </div>
                <p>{{ card.title }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="hidden md:flex">
        <MeCard />
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

const description = computed(
  () => `illyagif.com >> Привет! Мне ${ageFormatted.value} лет. Этот head, кстати, динамически обновляется`,
)

useHead({
  title: '@IllyaGIF > AboutMe',
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: '@IllyaGIF > AboutMe' },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://illyagif.dpdns.org/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '@IllyaGIF > AboutMe' },
    { name: 'twitter:description', content: description },
  ],
  link: [{ rel: 'canonical', href: 'https://illyagif.dpdns.org/' }],
})
</script>