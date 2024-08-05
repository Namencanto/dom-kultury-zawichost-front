<template>
  <div class="container mx-auto py-6 px-6">
    <h2 class="text-3xl font-bold mb-6 text-center">Wszystkie Aktualności</h2>

    <div
      class="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0"
    >
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Szukaj..."
        class="border rounded px-4 py-2 w-full lg:max-w-md"
      />
      <div class="flex space-x-4">
        <select v-model="filterYear" class="border rounded px-4 py-2">
          <option value="">Wszystkie lata</option>
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
        <select v-model="filterMonth" class="border rounded px-4 py-2">
          <option value="">Wszystkie miesiące</option>
          <option v-for="month in months" :key="month" :value="month">
            {{ month }}
          </option>
        </select>
        <div class="flex items-center space-x-2">
          <label>
            <input type="radio" value="" v-model="filterType" />
            Wszystko
          </label>
          <label>
            <input type="radio" value="news" v-model="filterType" />
            Aktualności
          </label>
          <label>
            <input type="radio" value="exhibition" v-model="filterType" />
            Wystawy
          </label>
        </div>
      </div>
    </div>

    <div v-if="filteredNews.length === 0" class="text-center text-gray-500">
      Nie znaleziono wydarzeń.
    </div>

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="newsItem in filteredNews"
        :key="newsItem.title"
        :to="`/aktualnosci/${newsItem.link}`"
        class="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105"
      >
        <div class="relative h-48 bg-gray-200 overflow-hidden">
          <img
            v-if="newsItem.images && newsItem.images.length"
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
          <div class="text-gray-700 mb-4 content">
            {{ truncateDescription(newsItem.eventDescription) }}
          </div>
          <p class="text-sm text-gray-500">
            Data publikacji: {{ formatDate(newsItem.publicationDate) }}
          </p>
          <p class="text-sm text-gray-500">
            Data wydarzenia: {{ formatDate(newsItem.eventDate) }}
          </p>
        </div>
      </NuxtLink>
    </div>

    <div v-if="loading" class="flex justify-center mt-6">
      <p>Ładowanie...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useNewsStore } from "~/stores/news";

const newsStore = useNewsStore();
newsStore.loadNews();

const searchQuery = ref("");
const filterYear = ref("");
const filterMonth = ref("");
const filterType = ref(""); // Nowa zmienna do filtrowania według typu
const itemsPerPage = ref(9);
const displayedItems = ref(itemsPerPage.value);
const loading = ref(false);

const years = computed(() => {
  return [
    ...new Set(
      newsStore.news.map((item) => new Date(item.eventDate).getFullYear())
    ),
  ].sort((a, b) => b - a);
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
  return newsStore.news
    .filter((item) => {
      const itemYear = new Date(item.eventDate).getFullYear();
      const itemMonth = new Date(item.eventDate).toLocaleString("default", {
        month: "long",
      });
      return (
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
        (filterYear.value === "" || itemYear === parseInt(filterYear.value)) &&
        (filterMonth.value === "" ||
          itemMonth.toLowerCase().includes(filterMonth.value.toLowerCase())) &&
        (filterType.value === "" || item.type === filterType.value)
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

const truncateDescription = (
  description: string | undefined,
  maxLength = 128
) => {
  if (!description || description.length <= maxLength) return description || "";

  const truncated = description.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  return (
    (lastSpaceIndex > -1 ? truncated.substring(0, lastSpaceIndex) : truncated) +
    "..."
  );
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
