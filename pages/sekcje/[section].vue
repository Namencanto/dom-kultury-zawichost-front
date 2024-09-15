<template>
  <div class="container mx-auto py-6 px-6">
    <h2 class="text-3xl font-bold mb-6 text-center">{{ sectionName }}</h2>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const sectionName = ref(route.params.section.toUpperCase());

useHead({
  title: `Sekcja: ${sectionName.value} - M-GOK Zawichost`,
  meta: [
    {
      name: "description",
      content: `Strona sekcji ${sectionName.value} Miejsko Gminnego Ośrodka Kultury w Zawichoście.`,
    },
    {
      property: "og:title",
      content: `Sekcja: ${sectionName.value} - M-GOK Zawichost`,
    },
    {
      property: "og:description",
      content: `Dowiedz się więcej o sekcji ${sectionName.value} w Miejsko Gminnym Ośrodku Kultury w Zawichoście.`,
    },
  ],
});

watch(
  () => route.params.section,
  (newSection) => {
    sectionName.value = newSection.toUpperCase();
  }
);
</script>
