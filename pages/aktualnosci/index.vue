<template>
  <div class="max-w-6xl mx-auto py-8">
    <!-- Admin Panel - Dodaj Nowe Wydarzenie -->
    <div v-if="isAdmin" class="flex justify-end mb-6">
      <el-button
        type="primary"
        icon="el-icon-circle-plus"
        @click="goToAddEvent"
        class="add-event-button"
      >
        Dodaj nowe wydarzenie
      </el-button>
    </div>

    <div class="flex justify-between items-center mb-6">
      <el-input
        v-model="searchQuery"
        placeholder="Wyszukaj..."
        prefix-icon="el-icon-search"
        class="w-full md:w-1/3"
      />
      <el-select
        v-model="selectedYear"
        placeholder="Wszystkie lata"
        class="ml-4"
      >
        <el-option label="Wszystkie lata" value=""></el-option>
        <el-option
          v-for="year in availableYears"
          :key="year"
          :label="year"
          :value="year"
        ></el-option>
      </el-select>
      <el-select
        v-model="selectedMonth"
        placeholder="Wszystkie miesiące"
        class="ml-4"
      >
        <el-option label="Wszystkie miesiące" value=""></el-option>
        <el-option
          v-for="(monthName, index) in availableMonths"
          :key="index"
          :label="monthName"
          :value="index + 1"
        ></el-option>
      </el-select>
    </div>

    <ContentList path="/aktualnosci" v-slot="{ list }">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <p
          v-if="filteredAndSortedArticles(list).length === 0"
          class="text-center w-full text-gray-500"
        >
          Brak wyników.
        </p>
        <div
          v-for="article in paginatedArticles(list)"
          :key="article._path"
          class="bg-white shadow-lg rounded-lg overflow-hidden relative hover:shadow-xl transition-shadow duration-300"
        >
          <img
            :src="article.thumbnail"
            :alt="article.title"
            class="w-full h-56 object-cover"
          />
          <div class="p-6">
            <h2 class="text-xl font-bold mb-2 text-gray-800">
              <a :href="article._path" class="hover:underline">
                {{ article.title }}
              </a>
            </h2>
            <h3
              v-if="getSectionHeading(article.content)"
              class="text-lg font-semibold text-gray-700 mb-2"
            >
              {{ getSectionHeading(article.content) }}
            </h3>

            <p class="text-gray-600 mb-2">
              <span class="font-semibold">Data publikacji:</span>
              {{ formatDate(article.publishDate) }}
            </p>
            <p class="text-gray-600 mb-4">
              <span class="font-semibold">Data wydarzenia:</span>
              {{ formatDate(article.eventDate) }}
            </p>
            <p class="text-gray-700 text-sm">
              {{ truncateContent(getFirstParagraph(article.content), 100) }}
            </p>

            <!-- Admin Actions (Edytuj / Usuń) -->
            <div v-if="isAdmin" class="flex space-x-4 mt-4">
              <el-button
                type="warning"
                icon="el-icon-edit"
                @click="editEvent(article._path)"
              >
                Edytuj
              </el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteEvent(article.title, article.publishDate)"
              >
                Usuń
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="totalPages(list) > 1"
        class="mt-6 flex justify-center space-x-4"
      >
        <el-button
          @click="prevPage(list)"
          :disabled="currentPage === 1"
          type="primary"
          plain
        >
          Poprzednia
        </el-button>
        <span class="text-gray-600">
          Strona {{ currentPage }} z {{ totalPages(list) }}
        </span>
        <el-button
          @click="nextPage(list)"
          :disabled="currentPage === totalPages(list)"
          type="primary"
          plain
        >
          Następna
        </el-button>
      </div>
    </ContentList>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { format, isValid } from "date-fns";
import { pl } from "date-fns/locale";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import axios from "axios";

const router = useRouter();
const authStore = useAuthStore();
const isAdmin = ref(false);

watchEffect(async () => {
  isAdmin.value = await authStore.getAuthAdminStatus;
});
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const searchQuery = ref("");
const selectedYear = ref(currentYear);
const selectedMonth = ref("");
const currentPage = ref(1);
const itemsPerPage = 9;

const availableMonths = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const availableYears = [];

for (let year = currentYear; year >= 2012; year--) {
  availableYears.push(year);
}
const getFirstParagraph = (content) => {
  const paragraph = content.find((item) => item.type === "paragraph");
  return paragraph ? paragraph.text || "" : "";
};
const truncateContent = (text, length) => {
  if (text.length <= length) return text;
  const truncated = text.slice(0, length).trim();
  return truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
};
const formatDate = (date) => {
  const parsedDate = new Date(date);
  if (isValid(parsedDate)) {
    return format(parsedDate, "dd MMMM yyyy", { locale: pl });
  }
  return "Nieznana data";
};

const getSectionHeading = (content) => {
  const heading = content.find(
    (block) => block.type === "heading" && block.level === 3
  );
  return heading ? heading.text : null;
};

const filteredAndSortedArticles = (list) => {
  if (!list || list.length === 0) return [];

  return list
    .filter((article) => {
      const matchesSearch = article.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
      const matchesYear = selectedYear.value
        ? new Date(article.publishDate).getFullYear() ===
          parseInt(selectedYear.value)
        : true;
      const matchesMonth = selectedMonth.value
        ? new Date(article.publishDate).getMonth() + 1 ===
          parseInt(selectedMonth.value)
        : true;
      return matchesSearch && matchesYear && matchesMonth;
    })
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
};

const totalPages = (list) => {
  return Math.ceil(filteredAndSortedArticles(list).length / itemsPerPage);
};

const paginatedArticles = (list) => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredAndSortedArticles(list).slice(startIndex, endIndex);
};

const nextPage = (list) => {
  if (currentPage.value < totalPages(list)) {
    currentPage.value++;
  }
};

const prevPage = (list) => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToAddEvent = () => {
  router.push("/nowe-wydarzenie");
};

const editEvent = (eventPath) => {
  router.push(`/nowe-wydarzenie?path=${encodeURIComponent(eventPath)}`);
};

const deleteEvent = async (title, publishDate) => {
  try {
    console.log(title);
    await useFetch(`/api/event/${title}/${publishDate}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Błąd podczas usuwania wydarzenia:", error);
  }
};

watch([selectedYear, selectedMonth, searchQuery], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.add-event-button {
  margin-right: 1rem;
}
</style>
