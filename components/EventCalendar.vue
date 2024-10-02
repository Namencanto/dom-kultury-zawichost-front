<template>
  <div
    :class="
      isAccessibilityMode
        ? 'flex justify-center bg-black text-yellow-300 py-8'
        : 'flex justify-center bg-transparent text-gray-900 py-8'
    "
  >
    <section
      :class="
        isAccessibilityMode
          ? 'event-calendar p-6 rounded-lg shadow-lg grid gap-6 bg-black border-4 border-yellow-300 max-w-screen-lg w-full lg:max-w-[1000px]'
          : 'event-calendar p-6 rounded-lg shadow-lg grid gap-6 bg-white max-w-screen-lg w-full lg:max-w-[1000px]'
      "
      style="grid-template-rows: auto 1fr; grid-template-columns: 1fr"
      aria-labelledby="calendar-heading"
    >
      <!-- Nagłówek i linia oddzielająca -->
      <div class="w-full mb-4">
        <div class="flex items-center space-x-2 mb-2">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <h2
            id="calendar-heading"
            :class="
              isAccessibilityMode
                ? 'text-3xl font-bold text-yellow-300'
                : 'text-2xl font-semibold text-gray-900'
            "
          >
            WYDARZENIA
          </h2>
        </div>
        <hr class="border-gray-300" />
      </div>

      <!-- Drugi wiersz: Obrazek i wydarzenia w gridzie -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <!-- Left Section: Obrazek w 33% szerokości -->
        <NuxtLink
          to="/kalendarz-wydarzen"
          :class="
            isAccessibilityMode
              ? 'relative w-full lg:w-auto cursor-pointer transition-transform transform hover:scale-105 border-4 border-yellow-300'
              : 'relative w-full lg:w-auto cursor-pointer transition-transform transform hover:scale-105'
          "
          aria-label="Przejdź do kalendarza wydarzeń"
        >
          <nuxt-img
            :src="calendarImage"
            alt="Kalendarz wydarzeń"
            :class="
              isAccessibilityMode
                ? 'w-full h-auto object-cover rounded-lg shadow-md'
                : 'w-full h-auto object-cover rounded-lg shadow-md'
            "
          />
        </NuxtLink>

        <!-- Right Section: Lista wydarzeń w 66% szerokości -->
        <section
          :class="
            isAccessibilityMode
              ? 'events-section lg:col-span-2 grid gap-6'
              : 'events-section lg:col-span-2 grid gap-6'
          "
        >
          <ul class="space-y-5 md:space-y-0">
            <li
              v-for="event in events"
              :key="event.eventDate"
              :class="
                isAccessibilityMode ? 'flex items-center' : 'flex items-center'
              "
            >
              <span
                class="mt-3"
                :class="
                  isAccessibilityMode
                    ? 'date bg-yellow-300 text-black font-bold px-4 py-2 rounded-lg mr-4'
                    : 'date bg-gray-800 text-white font-bold px-4 py-2 rounded-lg mr-4 shadow-md border border-gray-600'
                "
              >
                {{ formatDate(event.eventDate) }}
              </span>
              <NuxtLink
                :to="generateEventLink(event)"
                :class="
                  isAccessibilityMode
                    ? 'event-title text-lg font-bold hover:text-yellow-500 transition-colors'
                    : 'event-title text-lg font-medium hover:text-gray-300 transition-colors'
                "
                :aria-label="'Przejdź do szczegółów wydarzenia: ' + event.title"
              >
                {{ truncateTitle(event.title) }}
              </NuxtLink>
            </li>
          </ul>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useAccessibilityStore } from "~/stores/accessibility";

const calendarImage = "/kalendarz-wydarzen.png";

const accessibilityStore = useAccessibilityStore();
const isAccessibilityMode = computed(
  () => accessibilityStore.isAccessibilityMode
);

const formatDate = (date: string) => {
  return format(new Date(date), "dd.MM.yyyy", { locale: pl });
};

const events = ref<any[]>([]);

const truncateTitle = (title: string) => {
  if (title.length <= 50) return title;
  const truncated = title.slice(0, 50).trim();
  return truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
};

const generateEventLink = (event: any) => {
  const pathParts = event._path.split("/");
  const year = pathParts[2];
  const month = pathParts[3];
  const slug = pathParts[4];
  return `/aktualnosci/${year}/${month}/${slug}`;
};

onMounted(async () => {
  try {
    const result = await queryContent("aktualnosci").find();

    if (result && Array.isArray(result)) {
      events.value = result
        .filter((item) => {
          const eventDate = new Date(item.eventDate);
          return !isNaN(eventDate.getTime());
        })
        .sort((a, b) => {
          const dateA = new Date(a.eventDate).getTime();
          const dateB = new Date(b.eventDate).getTime();
          return dateB - dateA;
        })
        .slice(0, 4);
    } else {
      console.error("Brak danych lub dane nie są tablicą.");
    }
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
  }
});
</script>

<style scoped>
.event-calendar {
  border-radius: 0.75rem;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 1.5rem;
}

/* Colors for Normal Mode */

.header svg,
.event-title {
  transition: color 0.3s ease-in-out;
}

/* Colors for Accessibility Mode */

@media (max-width: 768px) {
  .event-calendar {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .image-section {
    margin-bottom: 1.5rem;
  }

  .events-section {
    width: 100%;
  }
}
</style>
