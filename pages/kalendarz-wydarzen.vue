<template>
  <div class="container mx-auto py-6 px-6">
    <h2 class="text-3xl font-bold mb-6 text-center">Kalendarz wydarzeń</h2>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import plLocale from "@fullcalendar/core/locales/pl";

interface Event {
  title: string;
  start: string;
  url: string;
}

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  weekends: true,
  locale: plLocale,
  events: [] as Event[],
  eventClick: handleEventClick,
});

// Function to format events for FullCalendar
function createSchedules(news: any[]) {
  return news
    .filter((item) => {
      // Ensure eventDate is valid
      const date = new Date(item.eventDate);
      return !isNaN(date.getTime()); // Filter out invalid dates
    })
    .map((item) => {
      const date = new Date(item.eventDate);

      // Extract year, month, and slug from the content's path
      const pathParts = item._path.split("/");
      const year = pathParts[2];
      const month = pathParts[3];
      const slug = pathParts[4];

      return {
        title: item.title,
        start: date.toISOString().split("T")[0], // Convert to YYYY-MM-DD format
        url: `/aktualnosci/${year}/${month}/${slug}`,
      };
    });
}

// Handle click events in the calendar
function handleEventClick(info: any) {
  info.jsEvent.preventDefault();
  window.open(info.event.url, "_blank");
}

// Fetch news data from @nuxt/content
const news = ref<any[]>([]);

onMounted(async () => {
  try {
    // Load news from @nuxt/content across all nested directories
    const result = await queryContent("aktualnosci").find();

    if (result && Array.isArray(result)) {
      news.value = result;
      // Populate calendar events
      calendarOptions.value.events = createSchedules(news.value);
    } else {
      console.error("No data returned or data is not an array.");
    }
  } catch (error) {
    console.error("Error fetching content:", error);
  }
});
</script>
