<template>
  <div class="container mx-auto py-6 px-6">
    <h2 class="text-3xl font-bold mb-6 text-center">Sekcje</h2>

    <div class="flex justify-between items-center mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Szukaj..."
        class="border rounded px-4 py-2 w-full max-w-md"
      />
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="exhibition in filteredExhibitions"
        :key="exhibition.title"
        :to="`/aktualnosci/${exhibition.title
          .replaceAll(' ', '-')
          .toLowerCase()}`"
        class="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105"
      >
        <div class="relative h-48 bg-gray-200 overflow-hidden">
          <img
            v-if="exhibition.images.length"
            :src="`/${exhibition.images[0].localPath}`"
            :alt="exhibition.images[0].description"
            class="w-full h-full object-cover transition-transform duration-500"
          />
        </div>
        <div class="p-6">
          <p class="text-xs uppercase text-blue-500 mb-2">
            {{ exhibition.category || "Wystawa" }}
          </p>
          <h3 class="text-xl font-semibold mb-2">{{ exhibition.title }}</h3>
          <div class="text-gray-700 mb-4 content">
            {{ truncateDescription(exhibition.eventDescription) }}
            <span v-if="isTruncated(exhibition.eventDescription)">...</span>
          </div>
          <p class="text-sm text-gray-500">
            Data publikacji: {{ formatDate(exhibition.publicationDate) }}
          </p>
          <p class="text-sm text-gray-500">
            Data wydarzenia: {{ formatDate(exhibition.eventDate) }}
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
const searchQuery = ref("");
const itemsPerPage = ref(9);
const displayedItems = ref(itemsPerPage.value);
const loading = ref(false);

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

const truncateDescription = (description: string, maxLength = 128) => {
  if (description.length <= maxLength) return description;
  return description.substring(0, description.lastIndexOf(" ", maxLength));
};

const isTruncated = (description: string, maxLength = 128) => {
  return description.length > maxLength;
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
