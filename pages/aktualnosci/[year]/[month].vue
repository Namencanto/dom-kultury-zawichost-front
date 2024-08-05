<template>
  <div class="container mx-auto py-6 px-6">
    <h1 class="text-3xl font-bold mb-4">{{ year }} - {{ month }}</h1>
    <div v-for="newsItem in filteredNews" :key="newsItem.title" class="mb-6">
      <h2 class="text-2xl font-semibold">{{ newsItem.title }}</h2>
      <p v-html="newsItem.content"></p>
      <div v-for="image in newsItem.images" :key="image.localPath" class="mt-4">
        <img
          :src="`/${image.localPath}`"
          :alt="image.description"
          class="w-full h-auto"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const year = parseInt(route.params.year as string);
const month = route.params.month as string;

const news = ref([]);

const fetchNews = async () => {
  const response = await fetch("/news.json");
  news.value = await response.json();
};

onMounted(() => {
  fetchNews();
});

const filteredNews = computed(() => {
  return news.value.filter(
    (item) => item.year === year && item.month === month
  );
});
</script>
