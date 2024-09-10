<template>
  <section
    :class="accessibilityClasses"
    class="flex flex-col min-h-screen"
    aria-label="Główna sekcja strony"
  >
    <Header />

    <main class="flex-grow" aria-label="Główna zawartość">
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
      Tryb Dostępności
    </button>
  </section>
</template>

<script lang="ts" setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import { useAccessibilityStore } from "~/stores/accessibility";

const accessibilityStore = useAccessibilityStore();

const toggleAccessibilityMode = () => {
  accessibilityStore.toggleAccessibilityMode();
};

const isAccessibilityMode = accessibilityStore.isAccessibilityMode;

const accessibilityClasses = computed(() => ({
  "high-contrast": isAccessibilityMode,
  "large-font": isAccessibilityMode,
  "underline-links": isAccessibilityMode,
  "highlight-buttons": isAccessibilityMode,
}));

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
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { charset: "UTF-8" },
  ],
});
</script>

<style>
.high-contrast {
  background-color: #000000 !important;
  color: #ffffff !important;
}

.high-contrast button,
.high-contrast input,
.high-contrast textarea,
.high-contrast select {
  background-color: #ffffff !important;
  color: #000000 !important;
  border: 2px solid #ffffff;
}

.high-contrast a {
  color: #00ffff !important;
  text-decoration: underline !important;
}

.large-font {
  font-size: 1.2em !important;
  line-height: 1.6 !important;
}

.underline-links a {
  text-decoration: underline !important;
}

.highlight-buttons button {
  border: 2px solid #ffffff !important;
  box-shadow: 0 0 4px #ffffff !important;
}
</style>
