<template>
  <section class="flex flex-col min-h-screen" aria-label="Główna sekcja strony">
    <Header />
    <Baner />

    <main
      :class="isAccessibilityMode ? 'bg-black' : ''"
      class="flex-grow"
      aria-label="Główna zawartość"
    >
      <NuxtPage />
    </main>

    <Footer />

    <button
      type="button"
      @click="toggleAccessibilityMode"
      class="fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-md shadow-md z-50"
      :aria-pressed="isAccessibilityMode.toString()"
      aria-label="Toggle Accessibility Mode"
      aria-live="polite"
    >
      {{ buttonLabel }}
    </button>
  </section>
</template>

<script lang="ts" setup>
import Baner from "~/components/Baner.vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import { useAccessibilityStore } from "~/stores/accessibility";

const accessibilityStore = useAccessibilityStore();

const toggleAccessibilityMode = () => {
  accessibilityStore.toggleAccessibilityMode();
};

const isAccessibilityMode = computed(
  () => accessibilityStore.isAccessibilityMode
);

const buttonLabel = computed(() =>
  isAccessibilityMode.value ? "Tryb Normalny" : "Tryb Dostępności"
);

useHead({
  htmlAttrs: {
    lang: "pl",
  },
  title: "Dom Kultury w Zawichoście",
  meta: [
    {
      name: "description",
      content:
        "Dom Kultury w Zawichoście - wydarzenia, warsztaty, i kultura dla wszystkich.",
    },
    {
      name: "keywords",
      content: "dom kultury, Zawichost, wydarzenia, kultura, warsztaty, sztuka",
    },
    {
      name: "author",
      content: "Mateusz Ordon | https://www.linkedin.com/in/mateusz-ordon",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { charset: "UTF-8" },
  ],
  link: [
    { rel: "icon", type: "image/jpeg", href: "/logo.jpg" },
    { rel: "apple-touch-icon", href: "/logo.jpg" },
    {
      rel: "author",
      href: "https://www.linkedin.com/in/mateusz-ordon/",
    },
  ],
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap");
</style>
