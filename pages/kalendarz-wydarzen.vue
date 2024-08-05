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
import { useNewsStore } from "~/stores/news";

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

function createSchedules(news: any[]) {
  return news.map((item) => {
    const date = new Date(item.eventDate);
    return {
      title: item.title,
      start: date.toISOString().split("T")[0],
      url: item.link,
    };
  });
}

function handleEventClick(info: any) {
  info.jsEvent.preventDefault();
  window.open(info.event.url, "_blank");
}

const newsStore = useNewsStore();

onMounted(() => {
  newsStore.loadNews();
  calendarOptions.value.events = createSchedules(newsStore.news);
});
</script>
