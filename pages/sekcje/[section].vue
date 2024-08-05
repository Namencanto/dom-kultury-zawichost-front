<template>
  <div class="container mx-auto py-6 px-6">
    <h2 class="text-3xl font-bold mb-6 text-center">{{ sectionName }}</h2>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const sectionName = ref(route.params.section.toUpperCase());
</script>
