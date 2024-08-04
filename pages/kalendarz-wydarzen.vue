<template>
  <div class="container mx-auto py-6 px-6">
    <h2 class="text-3xl font-bold mb-6 text-center">Kalendarz wydarzeń</h2>
    <FullCalendar
      :plugins="[dayGridPlugin, interactionPlugin]"
      initialView="dayGridMonth"
      :events="schedules"
      @eventClick="handleEventClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import newsjson from "~/public/news.json";

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
  images: Image[];
}

const news = ref<NewsItem[]>(newsjson);
const schedules = ref([] as any[]);

const createSchedules = () => {
  return news.value.map((item) => {
    const date = new Date(item.date);
    return {
      title: item.title,
      start: date,
      url: item.link,
    };
  });
};

onMounted(() => {
  schedules.value = createSchedules();
});

const handleEventClick = (info: any) => {
  info.jsEvent.preventDefault();
  window.open(info.event.url, "_blank");
};
</script>

<style scoped>
/* Dostosowanie stylu kalendarza */
</style>
