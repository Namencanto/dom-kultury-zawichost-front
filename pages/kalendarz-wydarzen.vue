<template>
  <div
    :class="[
      'container mx-auto py-6 px-6',
      isAccessibilityMode ? 'bg-black text-yellow-300' : 'bg-white text-black',
    ]"
  >
    <h2
      :class="[
        'text-center mb-6',
        isAccessibilityMode ? 'text-4xl font-extrabold' : 'text-3xl font-bold',
      ]"
    >
      Kalendarz wydarzeń
    </h2>
    <div :class="isAccessibilityMode ? 'calendar-accessible' : ''">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import plLocale from "@fullcalendar/core/locales/pl";
import { useAccessibilityStore } from "~/stores/accessibility";

interface Event {
  title: string;
  start: string;
  url: string;
}

useHead({
  title: "Kalendarz Wydarzeń - Miejsko-Gminny Ośrodek Kultury w Zawichoście",
  meta: [
    {
      property: "og:title",
      content:
        "Kalendarz Wydarzeń - Miejsko-Gminny Ośrodek Kultury w Zawichoście",
    },
    {
      property: "og:description",
      content:
        "Aktualny kalendarz wydarzeń organizowanych przez Miejsko-Gminny Ośrodek Kultury w Zawichoście.",
    },
  ],
});

const accessibilityStore = useAccessibilityStore();
const isAccessibilityMode = computed(
  () => accessibilityStore.isAccessibilityMode
);

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  weekends: true,
  locale: plLocale,
  events: [] as Event[],
  eventClick: handleEventClick,
  themeSystem: isAccessibilityMode.value ? "bootstrap" : "standard",
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,dayGridWeek",
  },
  buttonText: {
    today: isAccessibilityMode.value ? "Dziś" : "Dziś",
    month: isAccessibilityMode.value ? "Miesiąc" : "Miesiąc",
    week: isAccessibilityMode.value ? "Tydzień" : "Tydzień",
  },

  eventDisplay: isAccessibilityMode.value ? "block" : "list-item",
});

function createSchedules(news: any[]) {
  return news
    .filter((item) => {
      const date = new Date(item.eventDate);
      return !isNaN(date.getTime());
    })
    .map((item) => {
      const date = new Date(item.eventDate);

      const pathParts = item._path.split("/");
      const year = pathParts[2];
      const month = pathParts[3];
      const slug = pathParts[4];

      return {
        title: item.title,
        start: date.toISOString().split("T")[0],
        url: `/aktualnosci/${year}/${month}/${slug}`,
      };
    });
}

function handleEventClick(info: any) {
  info.jsEvent.preventDefault();
  window.open(info.event.url, "_blank");
}

const news = ref<any[]>([]);

onMounted(async () => {
  try {
    const result = await queryContent("aktualnosci").find();

    if (result && Array.isArray(result)) {
      news.value = result;
      calendarOptions.value.events = createSchedules(news.value);
    } else {
      console.error("No data returned or data is not an array.");
    }
  } catch (error) {
    console.error("Error fetching content:", error);
  }
});
</script>

<style scoped>
.calendar-accessible {
  background-color: black;
  color: yellow;
}

.calendar-accessible .fc {
  color: yellow;
  border-color: yellow;
}

.calendar-accessible .fc-button-primary {
  background-color: yellow;
  color: black;
  border: 1px solid yellow;
}

.calendar-accessible .fc .fc-daygrid-day {
  background-color: black;
  border-color: yellow;
}

.calendar-accessible .fc .fc-toolbar-title {
  color: yellow;
}
</style>
