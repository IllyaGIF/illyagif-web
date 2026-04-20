<template>
  <div class="flex flex-col animate-slideDownOpen smooth-transition max-w-screen-xl items-center mx-auto mb-10 duration-500">
    
    <div class="flex-row items-center mx-auto mt-5">
      <NuxtLink to="/" class="flex flex-row px-5 py-2 bg-neutral-800/25 rounded-xl ring-2 ring-neutral-700/40 hover:scale-[102%] smooth-transition duration-500 hover:bg-neutral-800/30">
        <div class="flex items-center">
          <div class="flex rounded-md bg-neutral-700/30 ring-2 ring-neutral-700/50 h-7 w-7 mr-3 p-1">
            <Icon class="text-xl text-white flex mx-auto my-auto" name="material-symbols:arrow-back-rounded"/>
          </div>
          <div class="text-white/50">
            <p>Вернуться назад</p>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div class="flex flex-col mx-5 xl:mx-0 w-full">
      
      <div class="flex items-start text-left mt-10">
        <p class="text-4xl text-white font-semibold">Мои проекты</p>
      </div>

      <div class="relative max-h-[20rem] bg-neutral-950 rounded-xl ring-2 ring-neutral-800/80 duration-700 hover:scale-[101%] overflow-hidden flex my-4">
        <div class="relative flex-1">
          <NuxtImg src="https://i.imgur.com/MMvEe9h.jpeg" quality="10" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-950/70 to-neutral-950" />
        </div>

        <div class="flex flex-col my-3 bg-neutral-950 text-white">
          <NuxtLink to="https://illyagif.xyz" target="_blank" class="flex flex-row h-max text-neutral-400 duration-500 hover:text-neutral-200 gap-4 hover:scale-[102%]">
            <div class="bg-neutral-850 p-2 rounded-2xl">
              <NuxtImg src="https://raw.githubusercontent.com/axetuz/vault/91f3ef723edb47a37ef8acaf3b4276e72004d684/axetuz/landing/VERMEULEN_Shape_17%201.png" quality="1" class="max-w-[50px] -m-1 -mr-2" />
            </div>
            <div class="flex-col justify-center mb-1">
              <p class="text-2xl">IllyaGIF.com</p>
              <p class="text-sm">https://illyagif.xyz</p>
            </div>
          </NuxtLink>

          <div class="flex flex-col text-neutral-500 mt-3 mx-1">
            <p class="max-w-[40ch] cursor-default">
              Мой сайт портфолио с информацией обо мне, моих проектах и моих активностях. Делается for fun и для демонстрации навыков.
            </p>
          </div>

          <div class="text-neutral-500 mt-1 flex flex-row items-center gap-1">
            <div class="flex animate-pulse bg-green-700 w-2 h-2 rounded-full mt-0.5" />
            <p class="text-sm">latest, stable</p>
          </div>

          <div class="flex flex-row gap-3">
            <div class="text-neutral-500 mt-1 flex flex-row items-center gap-1">
              <Icon name="devicon:nuxt" />
              <p class="text-sm">nuxt 4.2.1</p>
            </div>
            <div class="text-neutral-500 mt-1 flex flex-row items-center gap-1">
              <Icon name="vscode-icons:file-type-unocss" />
              <p class="text-sm">unoCSS</p>
            </div>
            <div class="text-neutral-500 mt-1 flex flex-row items-center gap-1">
              <Icon name="skill-icons:golang" />
              <p class="text-sm">golang</p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative bg-neutral-950 rounded-xl ring-2 ring-neutral-800/80 duration-700 hover:scale-[101%] overflow-hidden flex my-4">
        <div class="relative flex-1">
          <NuxtImg src="https://i.imgur.com/LbxsDgw.png" quality="10" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-950/70 to-neutral-950" />
        </div>
        <div class="flex flex-col my-3 bg-neutral-950 text-white">
          <NuxtLink to="https://github.com/illya1122/amazingnetwork" target="_blank" class="flex flex-row h-max text-neutral-400 duration-500 hover:text-neutral-200 gap-4 hover:scale-[102%]">
            <div class="bg-neutral-850 p-2 rounded-2xl">
              <NuxtImg src="https://i.imgur.com/W0jpmRe.jpeg" quality="1" class="max-w-[50px] -m-1" />
            </div>
            <div class="flex-col justify-center mb-1">
              <p class="text-2xl">AmazingNetwork</p>
            </div>
          </NuxtLink>
          <div class="flex flex-col ring-1 ring-neutral-500/50 bg-neutral-700/30 w-max px-2 py-0.5 rounded-xl text-neutral-500 mt-1 mx-1">
            <p class="cursor-default">2026</p>
          </div>
          <div class="flex flex-col text-neutral-500 mt-3 mx-1">
            <p class="max-w-[40ch] cursor-default">
              Инструмент для сканирования сети, мониторинга хостов и отображения информации о подключениях.
            </p>
          </div>
          <div class="text-neutral-500 mt-1 flex flex-row items-center gap-1">
            <div class="flex animate-pulse bg-green-700 w-2 h-2 rounded-full mt-0.5" />
            <p class="text-sm">latest, stable</p>
          </div>
                      <div class="text-neutral-500 mt-1 flex flex-row items-center gap-1">
              <Icon name="simple-icons:rust" />
              <p class="text-sm">Rust</p>
            </div>
        </div>
      </div>


<div class="relative bg-neutral-950 rounded-xl ring-2 ring-neutral-800/80 duration-700 hover:scale-[101%] overflow-hidden flex my-4">
        <div class="relative flex-1">
          <NuxtImg src="https://i.imgur.com/Bqhz7jQ.png" quality="10" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-950/70 to-neutral-950" />
        </div>
        <div class="flex flex-col my-3 bg-neutral-950 text-white">
          <NuxtLink to="https://github.com/illya1122/yaproxy" target="_blank" class="flex flex-row h-max text-neutral-400 duration-500 hover:text-neutral-200 gap-4 hover:scale-[102%]">
            <div class="bg-neutral-850 p-2 rounded-2xl">
              <NuxtImg src="https://i.imgur.com/lnEEXoc.png" quality="1" class="max-w-[50px] -m-1" />
            </div>
            <div class="flex-col justify-center mb-1">
              <p class="text-2xl">Yet Another Proxy</p>
            </div>
          </NuxtLink>
          <div class="flex flex-col ring-1 ring-neutral-500/50 bg-neutral-700/30 w-max px-2 py-0.5 rounded-xl text-neutral-500 mt-1 mx-1">
            <p class="cursor-default">2026</p>
          </div>
          <div class="flex flex-col text-neutral-500 mt-3 mx-1">
            <p class="max-w-[40ch] cursor-default">
              Инструмент, который автоматически скачивает и проверяет SOCKS5-прокси, выбирая самые стабильные и быстрые, и предоставляет готовый рабочий прокси
            </p>
          </div>
          <div class="text-neutral-500 mt-1 flex flex-row items-center gap-1">
            <div class="flex animate-pulse bg-green-700 w-2 h-2 rounded-full mt-0.5" />
            <p class="text-sm">latest, stable</p>
          </div>
                      <div class="text-neutral-500 mt-1 flex flex-row items-center gap-1">
              <Icon name="simple-icons:python" />
              <p class="text-sm">Python</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
