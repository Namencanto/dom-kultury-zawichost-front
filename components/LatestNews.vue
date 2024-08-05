<template>
  <div class="container mx-auto py-6 px-6">
    <h2 class="text-3xl font-bold mb-6 text-center">Najnowsze Aktualności</h2>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="newsItem in latestNews"
        :key="newsItem.title"
        :to="`/aktualnosci/${newsItem.link}`"
        class="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105"
      >
        <div class="relative h-48 bg-gray-200 overflow-hidden">
          <img
            v-if="newsItem.images.length"
            :src="`/${newsItem.images[0].localPath}`"
            :alt="newsItem.images[0].description"
            class="w-full h-full object-cover transition-transform duration-500"
          />
        </div>
        <div class="p-6">
          <p class="text-xs uppercase text-blue-500 mb-2">
            {{ newsItem.type === "news" ? "Aktualności" : "Wystawa" }}
          </p>
          <h3 class="text-xl font-semibold mb-2">{{ newsItem.title }}</h3>
          <div
            class="text-gray-700 mb-4 content"
            v-html="newsItem.eventDescription"
          ></div>
          <p class="text-sm text-gray-500">
            Data publikacji: {{ formatDate(newsItem.publicationDate) }}
          </p>
          <p class="text-sm text-gray-500">
            Data wydarzenia: {{ formatDate(newsItem.eventDate) }}
          </p>
        </div>
      </NuxtLink>
    </div>
    <div class="flex justify-center mt-6">
      <NuxtLink
        to="/aktualnosci"
        class="bg-red-500 text-white px-4 py-2 rounded-lg transform transition duration-500 hover:scale-105"
      >
        Zobacz wszystkie aktualności
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useNewsStore } from "~/stores/news";

const newsStore = useNewsStore();

onMounted(() => {
  newsStore.loadNews();
});

const latestNews = computed(() => {
  return newsStore.news.slice(0, 9);
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

<style scoped>
.grid {
  display: grid;
  gap: 1.5rem;
}

.bg-white {
  background-color: white;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.overflow-hidden {
  overflow: hidden;
}

.h-48 {
  height: 12rem;
}

.bg-gray-200 {
  background-color: #e2e8f0;
}

.p-6 {
  padding: 1.5rem;
}

.text-gray-700 {
  color: #4a5568;
}

.text-gray-500 {
  color: #6b7280;
}

.text-blue-500 {
  color: #3b82f6;
}

.hover\:underline:hover {
  text-decoration: underline;
}

.mt-6 {
  margin-top: 1.5rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.bg-teal-500 {
  background-color: #38b2ac;
}

.text-white {
  color: white;
}

.transition {
  transition-property: all;
}

.duration-500 {
  transition-duration: 500ms;
}

.transform {
  transform: scale(1);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.content img {
  width: 100%;
  height: auto;
  object-fit: cover;
  max-height: 300px;
  transition: transform 0.5s;
}

.content img:hover {
  transform: scale(1.05);
}
</style>
