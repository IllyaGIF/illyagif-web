<template>
  <div class="flex flex-col animate-slideDownOpen smooth-transition max-w-screen-xl items-center mx-auto mb-10 duration-500">
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
          <NuxtLink 
            to="https://t.me/send?start=IVGDNjlz3brM" 
            external 
            target="_blank" 
            class="flex-row bg-neutral-700/40 px-3 py-1 rounded-xl ring-2 ring-neutral-700/80 justify-center duration-300 mx-5 mb-1 hover:scale-[98%]"
          >
            <p class="text-white/80 text-2xl -mt-1">
              @send
              <Icon name="material-symbols:open-in-new" class="w-6 h-6 -mb-1 text-white/50" />
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>