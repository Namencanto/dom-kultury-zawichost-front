<template>
  <nav class="max-w-6xl mx-auto py-8">
    <ContentList path="/aktualnosci" v-slot="{ list }">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="article in sortedArticles(list)"
          :key="article._path"
          class="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img
            :src="article.thumbnail"
            :alt="article.title"
            class="w-full h-56 object-cover"
          />
          <div class="p-6">
            <h2 class="text-xl font-bold mb-2">
              <a :href="article._path" class="hover:underline">
                {{ article.title }}
              </a>
            </h2>
            <p class="text-gray-600 mb-2">
              <span class="font-semibold">Data publikacji:</span>
              {{ formatDate(article.publishDate) }}
            </p>
            <p class="text-gray-600 mb-4">
              <span class="font-semibold">Data wydarzenia:</span>
              {{ formatDate(article.eventDate) }}
            </p>
            <p class="text-gray-700">{{ article.description }}</p>
          </div>
        </div>
      </div>
    </ContentList>
  </nav>
</template>

<script setup>
import { format } from "date-fns";
import { pl } from "date-fns/locale"; // Importowanie polskiej lokalizacji

// Funkcja do sortowania artykułów według daty publikacji
const sortedArticles = (list) => {
  return list
    .filter((article) => isValidDate(article.publishDate))
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 9);
};

// Funkcja do formatowania daty
const formatDate = (date) => {
  return format(new Date(date), "dd MMMM yyyy", { locale: pl }); // Używanie polskiej lokalizacji
};

// Funkcja do sprawdzania poprawności daty
const isValidDate = (date) => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};
</script>
