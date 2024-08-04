<template>
  <div class="container mx-auto py-6 px-6">
    <h2 class="text-3xl font-bold mb-6 text-center">Wszystkie Aktualności</h2>

    <div class="flex justify-between items-center mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Szukaj..."
        class="border rounded px-4 py-2 w-full max-w-md"
      />
      <select v-model="filterYear" class="border rounded px-4 py-2 ml-4">
        <option value="">Wszystkie lata</option>
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
      <select v-model="filterMonth" class="border rounded px-4 py-2 ml-4">
        <option value="">Wszystkie miesiące</option>
        <option v-for="month in months" :key="month" :value="month">
          {{ month }}
        </option>
      </select>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="newsItem in filteredNews"
        :key="newsItem.title"
        :to="`/aktualnosci/${newsItem.title
          .replaceAll(' ', '-')
          .toLowerCase()}`"
        class="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105"
      >
        <div class="relative h-48 bg-gray-200 overflow-hidden">
          <img
            v-if="newsItem.images.length"
            :src="`/${newsItem.images[0].localPath}`"
            :alt="newsItem.images[0].description"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div class="p-6">
          <p class="text-xs uppercase text-blue-500 mb-2">
            {{ newsItem.category || "Aktualności" }}
          </p>
          <h3 class="text-xl font-semibold mb-2">{{ newsItem.title }}</h3>
          <div
            class="text-gray-700 mb-4 content"
            v-html="newsItem.content"
          ></div>
          <p class="text-sm text-gray-500">{{ formatDate(newsItem.date) }}</p>
        </div>
      </NuxtLink>
    </div>

    <div v-if="loading" class="flex justify-center mt-6">
      <p>Ładowanie...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import newsjson from "~/public/news.json";
import { ref, computed, onMounted } from "vue";

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
  category?: string;
  images: Image[];
}

const news = ref<NewsItem[]>(newsjson);
const searchQuery = ref("");
const filterYear = ref("");
const filterMonth = ref("");
const itemsPerPage = ref(9);
const displayedItems = ref(itemsPerPage.value);
const loading = ref(false);

const years = computed(() => {
  return [...new Set(news.value.map((item) => item.year))].sort(
    (a, b) => b - a
  );
});

const months = computed(() => {
  return [
    "styczeń",
    "luty",
    "marzec",
    "kwiecień",
    "maj",
    "czerwiec",
    "lipiec",
    "sierpień",
    "wrzesień",
    "październik",
    "listopad",
    "grudzień",
  ];
});

const filteredNews = computed(() => {
  return news.value
    .filter((item) => {
      return (
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
        (filterYear.value === "" || item.year === parseInt(filterYear.value)) &&
        (filterMonth.value === "" ||
          item.month.toLowerCase().includes(filterMonth.value.toLowerCase()))
      );
    })
    .slice(0, displayedItems.value);
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

const loadMore = () => {
  if (loading.value) return;
  loading.value = true;
  setTimeout(() => {
    displayedItems.value += itemsPerPage.value;
    loading.value = false;
  }, 1000);
};

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    loadMore();
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<style scoped>
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
