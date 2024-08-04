<template>
  <div class="container mx-auto py-6 px-6">
    <div v-if="newsItem">
      <h1 class="text-3xl font-bold mb-4">{{ newsItem.title }}</h1>
      <p class="text-gray-500 mb-4">{{ newsItem.date }}</p>
      <div v-if="newsItem.images.length" class="mb-6">
        <img
          v-for="image in newsItem.images"
          :key="image.localPath"
          :src="`/${image.localPath}`"
          :alt="image.description"
          class="w-full h-auto object-cover"
          style="max-height: 500px"
        />
      </div>
      <div v-html="newsItem.content" class="text-gray-700"></div>
    </div>
    <div v-else>
      <p>Aktualność nie została znaleziona.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import newsjson from "~/public/news.json";

// Definicja typów
interface Image {
  description: string;
  localPath: string;
}

interface NewsItem {
  year: number;
  month: string;
  title: string;
  link?: string;
  date?: string;
  content: string;
  images: Image[];
}

const route = useRoute();
const newsItem = ref<NewsItem | null>(null);

onMounted(() => {
  const newsTitle = route.params.name as string;
  const formattedTitle = newsTitle.replace(/-/g, " ").toLowerCase();
  const foundItem = newsjson.find((item) => {
    console.log(
      item.title.replaceAll(" ", "-").toLowerCase(),
      formattedTitle.toLowerCase()
    );
    return (
      item.title.replaceAll(" ", "-").toLowerCase() === newsTitle.toLowerCase()
    );
  });
  console.log("foundItem", foundItem);
  if (foundItem) {
    newsItem.value = foundItem;
  }
});
</script>
