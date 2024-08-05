<template>
  <div class="container mx-auto py-6 px-6">
    <div v-if="newsItem">
      <h1 class="text-3xl font-bold mb-4">{{ newsItem.title }}</h1>
      <p class="text-gray-500 mb-4">
        Data publikacji: {{ formatDate(newsItem.publicationDate) }}
      </p>
      <p class="text-gray-500 mb-4">
        Data wydarzenia: {{ formatDate(newsItem.eventDate) }}
      </p>
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
      <div v-html="newsItem.eventDescription" class="text-gray-700"></div>
    </div>
    <div v-else>
      <p>Aktualność nie została znaleziona.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNewsStore } from "~/stores/news";
import { NewsItem } from "../../types/news";

const route = useRoute();
const newsStore = useNewsStore();
const newsItem = ref<NewsItem | null>(null);

onMounted(() => {
  newsStore.loadNews();
  const newsTitle = route.params.name as string;
  console.log(newsTitle);
  const foundItem = newsStore.news.find((item) => {
    return item.link === newsTitle.toLowerCase();
  });
  if (foundItem) {
    newsItem.value = foundItem;
  }
});

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  if (date < new Date("2024-08-01")) {
    return `${month} ${year}`;
  }
  return date.toLocaleDateString();
};
</script>
