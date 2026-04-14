<template>
  <div class="flex animate-slideDownOpen flex-col smooth-transition max-w-screen-xl items-center mx-auto mb-10 duration-500">
    <div class="flex-row items-center mx-auto mt-5">
      <NuxtLink to="/" class="flex flex-row px-5 py-2 bg-neutral-800/25 rounded-xl ring-2 ring-neutral-700/40 hover:scale-[102%] smooth-transition duration-500 hover:bg-neutral-800/30">
        <div>
          <div class="flex items-center">
            <div class="flex rounded-md bg-neutral-700/30 ring-2 ring-neutral-700/50 h-7 w-7 mr-3 p-1">
              <Icon class="text-xl text-white flex mx-auto my-auto" name="material-symbols:arrow-back-rounded"/>
            </div>
            <div class="text-white/50">
              <p>Вернуться назад</p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 gap-5 mt-10">
      <div class="bg-neutral-900/40 p-4 rounded-md ring-2 ring-neutral-800/80 duration-500 hover:scale-[101%]">
        <div class="flex flex-row items-center">
          <div class="bg-neutral-850 p-2 rounded-2xl ring-2 ring-neutral-800/50">
            <Icon name="mingcute:telegram-fill" class="w-8 h-8 -mb-1 text-white" />
          </div>
          <NuxtLink to="https://t.me/IllyaGIF" external target="_blank" class="flex-row bg-neutral-700/40 px-3 py-1 rounded-xl ring-2 ring-neutral-700/80 justify-center duration-300 mx-5 mb-1 hover:scale-[98%]">
            <p class="text-white/80 text-2xl -mt-1">
              @IllyaGIF
              <Icon name="material-symbols:open-in-new" class="w-6 h-6 -mb-1 text-white/50" />
            </p>
          </NuxtLink>
        </div>
      </div>

      <div class="bg-neutral-900/40 p-4 rounded-md ring-2 ring-neutral-800/80 duration-500 hover:scale-[101%]">
        <div class="flex flex-row items-center">
          <div class="bg-neutral-850 p-2 rounded-2xl ring-2 ring-neutral-800/50">
            <Icon name="ic:baseline-discord" class="w-8 h-8 -mb-1 text-white" />
          </div>
          <a class="flex-row bg-neutral-700/40 px-3 py-1 rounded-xl ring-2 ring-neutral-700/80 justify-center duration-300 mx-5 mb-1 hover:scale-[98%]">
            <p class="text-white/80 text-2xl -mt-1">@IllyaGIF</p>
          </a>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-5 mt-5">
      <a href="https://open.spotify.com/user/31apdqeerpt6275g67msxrs4f5um" target="_blank" class="bg-neutral-900/40 p-4 rounded-md ring-2 ring-neutral-800/80 duration-500 hover:scale-[103%] relative">
        <div class="flex flex-row gap-3 items-center">
          <Icon name="mingcute:spotify-fill" class="w-14 h-14 -m-2 text-green-500" />
          <p class="text-xl text-neutral-400">@IllyaGIF</p>
        </div>
        <Icon name="material-symbols:open-in-new" class="absolute right-0 bottom-1 flex text-2xl text-white" />
      </a>

      <a href="https://www.youtube.com/@IllyaGIF" target="_blank" class="bg-neutral-900/40 p-4 rounded-md ring-2 ring-neutral-800/80 duration-500 hover:scale-[103%] relative">
        <div class="flex flex-row gap-3 items-center">
          <Icon name="tabler:brand-youtube-filled" class="w-14 h-14 -m-2 text-red-600" />
          <p class="text-xl text-neutral-400">@IllyaGIF</p>
        </div>
        <Icon name="material-symbols:open-in-new" class="absolute right-0 bottom-1 flex text-2xl text-white" />
      </a>

      <a href="https://steamcommunity.com/profiles/76561199551851537/" target="_blank" class="bg-neutral-900/40 p-4 rounded-md ring-2 ring-neutral-800/80 duration-500 hover:scale-[103%] relative">
        <div class="flex flex-row gap-3 items-center">
          <Icon name="mdi:steam" class="w-14 h-14 -m-2 text-white" />
          <p class="text-xl text-neutral-400">@IllyaGIF</p>
        </div>
        <Icon name="material-symbols:open-in-new" class="absolute right-0 bottom-1 flex text-2xl text-white" />
      </a>
    </div>
  </div>
</template>