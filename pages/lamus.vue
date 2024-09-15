<template>
  <div
    :class="[
      'container mx-auto py-6 px-6',
      isAccessibilityMode ? 'bg-black text-yellow-300' : 'bg-white text-black',
    ]"
  >
    <h2
      :class="[
        'text-center mb-6',
        isAccessibilityMode ? 'text-4xl font-extrabold' : 'text-3xl font-bold',
      ]"
    >
      Zawichojski Lamus Kultury Dawnej – Żywe Muzeum Etnograficzne Powiśla
      Zawichojskiego
    </h2>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAccessibilityStore } from "~/stores/accessibility";

const accessibilityStore = useAccessibilityStore();
const isAccessibilityMode = computed(
  () => accessibilityStore.isAccessibilityMode
);

useHead({
  title: "Zawichojski Lamus Kultury Dawnej",
  meta: [
    {
      name: "description",
      content:
        "Zawichojski Lamus Kultury Dawnej – Żywe Muzeum Etnograficzne Powiśla Zawichojskiego, które prezentuje unikalne tradycje i kulturę regionu.",
    },
    {
      property: "og:title",
      content: "Zawichojski Lamus Kultury Dawnej",
    },
    {
      property: "og:description",
      content:
        "Poznaj Żywe Muzeum Etnograficzne Powiśla Zawichojskiego i odkryj bogactwo tradycji kulturowych regionu.",
    },
  ],
});
</script>
