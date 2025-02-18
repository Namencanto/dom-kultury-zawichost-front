<template>
  <div
    :class="
      isAccessibilityMode
        ? 'bg-black text-yellow-300 max-w-7xl mx-auto py-10 px-4'
        : 'bg-white max-w-7xl mx-auto py-10 px-4'
    "
    aria-label="Aktualności"
  >
    <!-- Heading -->
    <h2
      :class="
        isAccessibilityMode
          ? 'text-4xl font-extrabold text-yellow-300 mb-8 text-left'
          : 'text-4xl font-medium text-[#4a4a4a] mb-8 text-left pl-4'
      "
    >
      AKTUALNOŚCI
    </h2>

    <!-- Admin Panel - Add New Event -->
    <div v-if="isAdmin" class="flex justify-end mb-6">
      <button
        @click="goToAddEvent"
        :class="
          isAccessibilityMode
            ? 'px-4 py-2 bg-yellow-300 text-black rounded-lg hover:bg-yellow-400 transition-colors duration-200'
            : 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'
        "
      >
        Dodaj nowe wydarzenie
      </button>
    </div>

    <!-- Search and Filters Section -->
    <div class="flex flex-wrap justify-between items-center mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Wyszukaj..."
        :class="
          isAccessibilityMode
            ? 'w-full md:w-1/3 p-2 border border-yellow-300 bg-black text-yellow-300 placeholder-yellow-300 rounded-md mb-4 md:mb-0'
            : 'w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mb-4 md:mb-0'
        "
      />
      <div class="flex space-x-4">
        <select
          v-model="selectedSection"
          :class="
            isAccessibilityMode
              ? 'p-2 border border-yellow-300 bg-black text-yellow-300 rounded-md'
              : 'p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300'
          "
        >
          <option value="">Wszystkie sekcje</option>
          <option
            v-for="section in uniqueSections"
            :key="section"
            :value="section"
          >
            {{ section }}
          </option>
        </select>
        <select
          v-model="selectedYear"
          :class="
            isAccessibilityMode
              ? 'p-2 border border-yellow-300 bg-black text-yellow-300 rounded-md'
              : 'p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300'
          "
        >
          <option value="">Wszystkie lata</option>
          <option v-for="year in availableYears" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
        <select
          v-model="selectedMonth"
          :class="
            isAccessibilityMode
              ? 'p-2 border border-yellow-300 bg-black text-yellow-300 rounded-md'
              : 'p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300'
          "
        >
          <option value="">Wszystkie miesiące</option>
          <option
            v-for="(monthName, index) in availableMonths"
            :key="index"
            :value="index + 1"
          >
            {{ monthName }}
          </option>
        </select>
      </div>
    </div>

    <!-- Article List -->
    <ContentList path="/aktualnosci" v-slot="{ list }">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <p
          v-if="filteredAndSortedArticles(list).length === 0"
          :class="
            isAccessibilityMode
              ? 'text-center w-full text-yellow-300'
              : 'text-center w-full text-gray-500'
          "
        >
          Brak wyników.
        </p>
        <div
          v-for="article in paginatedArticles(list)"
          :key="article._path"
          :class="
            isAccessibilityMode
              ? 'group bg-black border-4 border-yellow-300 shadow-lg rounded-lg overflow-hidden'
              : 'group bg-white shadow-lg rounded-lg overflow-hidden'
          "
        >
          <!-- Article link and image -->
          <NuxtLink :to="article._path" class="block">
            <img
              :src="article.thumbnail"
              :alt="article.title"
              :class="
                isAccessibilityMode
                  ? 'w-full h-48 object-cover border-b-4 border-yellow-300'
                  : 'w-full h-48 object-cover'
              "
            />
            <div
              :class="
                isAccessibilityMode ? 'p-4 bg-black text-yellow-300' : 'p-4'
              "
            >
              <!-- Article title and details -->
              <h2
                :class="[
                  'text-xl font-medium mb-2',
                  isAccessibilityMode ? '' : 'group-hover:underline',
                ]"
              >
                {{ article.title }}
              </h2>
              <h3
                v-if="getSectionHeading(article.content)"
                :class="
                  isAccessibilityMode
                    ? 'text-xs font-semibold uppercase mb-2 tracking-wide'
                    : 'text-xs font-semibold text-[#757575] uppercase mb-2 tracking-wide'
                "
              >
                {{ getSectionHeading(article.content) }}
              </h3>
              <p
                :class="
                  isAccessibilityMode
                    ? 'text-sm mb-1'
                    : 'text-[#757575] text-sm mb-1'
                "
              >
                <span class="font-semibold">Data publikacji:</span>
                {{ formatDate(article.publishDate) }}
              </p>
              <p
                v-if="article.eventDate"
                :class="
                  isAccessibilityMode
                    ? 'text-sm mb-2'
                    : 'text-[#757575] text-sm mb-2'
                "
              >
                <span class="font-semibold">Data wydarzenia:</span>
                {{ formatDate(article.eventDate) }}
              </p>
              <p
                :class="
                  isAccessibilityMode ? 'text-sm' : 'text-[#4a4a4a] text-sm'
                "
              >
                {{ truncateContent(getFirstParagraph(article.content), 150) }}
              </p>
            </div>
          </NuxtLink>

          <!-- Admin actions (Edit / Delete) -->
          <div v-if="isAdmin" class="flex space-x-4 mt-4 p-4">
            <button
              @click="editEvent(article._path)"
              :class="
                isAccessibilityMode
                  ? 'px-4 py-2 bg-yellow-300 text-black rounded-lg hover:bg-yellow-400 transition-colors duration-200'
                  : 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'
              "
            >
              Edytuj
            </button>
            <button
              @click="deleteEvent(article.title, article.publishDate)"
              :class="
                isAccessibilityMode
                  ? 'px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200'
                  : 'px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200'
              "
            >
              Usuń
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages(list) > 1"
        class="mt-8 flex justify-center space-x-4"
      >
        <button
          @click="prevPage(list)"
          :disabled="currentPage === 1"
          :class="
            isAccessibilityMode
              ? 'px-4 py-2 bg-yellow-300 text-black rounded-lg hover:bg-yellow-400 transition-colors duration-200 disabled:opacity-50'
              : 'px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50'
          "
        >
          Poprzednia
        </button>
        <span
          :class="isAccessibilityMode ? 'text-yellow-300' : 'text-gray-600'"
        >
          Strona {{ currentPage }} z {{ totalPages(list) }}
        </span>
        <button
          @click="nextPage(list)"
          :disabled="currentPage === totalPages(list)"
          :class="
            isAccessibilityMode
              ? 'px-4 py-2 bg-yellow-300 text-black rounded-lg hover:bg-yellow-400 transition-colors duration-200 disabled:opacity-50'
              : 'px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50'
          "
        >
          Następna
        </button>
      </div>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, watchEffect } from "vue";
import { format, isValid } from "date-fns";
import { pl } from "date-fns/locale";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { useAccessibilityStore } from "~/stores/accessibility";

const router = useRouter();
const authStore = useAuthStore();
const accessibilityStore = useAccessibilityStore();
const isAdmin = ref(false);

const isAccessibilityMode = computed(
  () => accessibilityStore.isAccessibilityMode
);

watchEffect(async () => {
  isAdmin.value = await authStore.getAuthAdminStatus;
});

useHead({
  title: "Lista aktualności",
  meta: [
    {
      property: "og:title",
      content: "Lista aktualności",
    },
    {
      property: "og:description",
      content:
        "Sprawdź aktualne wydarzenia organizowane przez Miejsko-Gminny Ośrodek Kultury w Zawichoście.",
    },
  ],
});

const currentYear = new Date().getFullYear();
const searchQuery = ref<string>("");
const selectedYear = ref<string>("");
const selectedMonth = ref<string>("");
const selectedSection = ref<string>("");
const currentPage = ref<number>(1);
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

const availableYears: number[] = [];
for (let year = currentYear; year >= 2012; year--) {
  availableYears.push(year);
}

const uniqueSections = ref<string[]>([]);

const fetchUniqueSections = async () => {
  try {
    const result = await queryContent("aktualnosci").find();
    if (result && Array.isArray(result)) {
      const sectionsSet = new Set<string>();
      result.forEach((item) => {
        if (item.content && Array.isArray(item.content)) {
          item.content
            .filter(
              (block: any) => block.type === "heading" && block.level === 3
            )
            .forEach((block: any) => sectionsSet.add(block.text));
        }
      });
      uniqueSections.value = Array.from(sectionsSet);
    } else {
      console.error("No data or the data is not in an array.");
    }
  } catch (error) {
    console.error("Error fetching unique sections:", error);
  }
};

fetchUniqueSections();

const getFirstParagraph = (content: any[]) => {
  const paragraph = content.find((item) => item.type === "paragraph");
  return paragraph ? paragraph.text || "" : "";
};

const truncateContent = (text: string, length: number) => {
  if (text.length <= length) return text;
  const truncated = text.slice(0, length).trim();
  return truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
};

const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  if (isValid(parsedDate)) {
    return format(parsedDate, "dd MMMM yyyy", { locale: pl });
  }
  return "Nieznana data";
};

const getSectionHeading = (content: any[]) => {
  const heading = content.find(
    (block) => block.type === "heading" && block.level === 3
  );
  return heading ? heading.text : null;
};

const filteredAndSortedArticles = (list: any[]) => {
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
      const matchesSection = selectedSection.value
        ? getSectionHeading(article.content) === selectedSection.value
        : true;

      return matchesSearch && matchesYear && matchesMonth && matchesSection;
    })
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
};

const totalPages = (list: any[]) =>
  Math.ceil(filteredAndSortedArticles(list).length / itemsPerPage);
const paginatedArticles = (list: any[]) => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredAndSortedArticles(list).slice(startIndex, endIndex);
};

const nextPage = (list: any[]) => {
  if (currentPage.value < totalPages(list)) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const goToAddEvent = () => {
  router.push("/nowe-wydarzenie");
};

const editEvent = (eventPath: string) => {
  router.push(`/nowe-wydarzenie?path=${encodeURIComponent(eventPath)}`);
};

// Delete event action
const deleteEvent = async (title: string, publishDate: string) => {
  try {
    const confirmDeletion = confirm(
      `Czy na pewno chcesz usunąć wydarzenie "${title}"?`
    );
    if (!confirmDeletion) return;

    await useFetch(`/api/event/${title}/${publishDate}`, {
      method: "DELETE",
    });

    alert(
      `Wydarzenie "${title}" zostało usunięte! Zmiany będą widoczne za około 5 minut.`
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    alert("Wystąpił błąd podczas usuwania wydarzenia.");
  }
};

watch([selectedYear, selectedMonth, searchQuery, selectedSection], () => {
  currentPage.value = 1;
});
</script>
