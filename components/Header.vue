<template>
  <header class="bg-white shadow-md relative">
    <div
      class="container mx-auto py-4 px-6 flex flex-col items-center lg:flex-row lg:justify-between"
    >
      <div class="flex items-center space-x-4 mb-4 lg:mb-0">
        <NuxtLink to="/">
          <img src="/logo.jpg" alt="Logo" class="h-32" />
        </NuxtLink>
        <div class="hidden sm:flex flex-col items-start text-left">
          <span class="text-gray-500">sobota</span>
          <span class="text-gray-500">03 sierpnia 2024</span>
          <span class="text-gray-500">14°C</span>
        </div>
      </div>
      <div class="flex flex-col items-center lg:flex-row lg:space-x-4">
        <div class="flex space-x-4 mb-4 lg:mb-0">
          <NuxtLink to="/informacje" class="text-gray-500">
            <Icon name="maki:information" class="h-6 w-6" />
          </NuxtLink>
          <NuxtLink
            to="https://www.facebook.com/mgokzawichost"
            class="text-gray-500"
          >
            <Icon name="ion:social-facebook" class="h-6 w-6" />
          </NuxtLink>
          <NuxtLink to="/widok" class="text-gray-500">
            <Icon name="uil:eye" class="h-6 w-6" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <nav class="bg-gray-100">
      <div
        class="container mx-auto flex flex-col items-center lg:flex-row lg:justify-between py-2 px-6 relative"
      >
        <div class="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
          <div class="flex space-x-4 mb-4 lg:mb-0">
            <NuxtLink to="/" class="text-gray-700">M-GOK</NuxtLink>
            <NuxtLink to="/aktualnosci" class="text-gray-700"
              >AKTUALNOŚCI</NuxtLink
            >
            <NuxtLink to="/kalendarz-wydarzen" class="text-gray-700"
              >KALENDARZ WYDARZEŃ</NuxtLink
            >
            <NuxtLink to="/wystawy" class="text-gray-700">WYSTAWY</NuxtLink>
            <NuxtLink to="/sekcje" class="text-gray-700">SEKCJE</NuxtLink>
            <NuxtLink to="/kontakt" class="text-gray-700">KONTAKT</NuxtLink>
            <NuxtLink to="/lamus" class="text-gray-700">LAMUS</NuxtLink>
            <NuxtLink to="/tablica-ogloszen" class="text-gray-700"
              >TABLICA OGŁOSZEŃ</NuxtLink
            >
            <NuxtLink to="/rodo" class="text-gray-700">RODO</NuxtLink>
          </div>
        </div>
        <div class="relative">
          <input
            type="text"
            placeholder="Szukaj..."
            class="border rounded px-2 py-1"
          />
          <div class="absolute top-[-2rem] right-0 flex space-x-2">
            <button @click="setFontSize('normal')" class="text-gray-500">
              A
            </button>
            <button @click="setFontSize('large')" class="text-gray-500">
              A+
            </button>
            <button @click="setFontSize('x-large')" class="text-gray-500">
              A++
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { useFontSizeStore } from "~/stores/fontSize";

const fontSizeStore = useFontSizeStore();

const setFontSize = (size: string) => {
  fontSizeStore.setFontSize(size);
};
</script>
