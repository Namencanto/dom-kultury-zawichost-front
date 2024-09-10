<template>
  <div class="flex justify-center bg-gray-50 text-gray-900 py-8">
    <section
      class="event-calendar p-6 rounded-lg shadow-lg flex items-start bg-white max-w-screen-lg w-full lg:max-w-[1000px]"
      aria-labelledby="calendar-heading"
    >
      <NuxtLink
        to="/kalendarz-wydarzen"
        class="image-section relative w-1/3 max-w-xs mr-6 cursor-pointer transition-transform transform hover:scale-105"
        aria-label="Przejdź do kalendarza wydarzeń"
      >
        <img
          :src="calendarImage"
          alt="Kalendarz wydarzeń"
          class="w-full h-auto object-cover rounded-lg shadow-md"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-center justify-center text-center p-4 rounded-lg"
        ></div>
      </NuxtLink>

      <section class="events-section flex-1">
        <div class="header mb-6 flex items-center text-primary">
          <svg
            class="w-8 h-8 mr-2"
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
          <h2 id="calendar-heading" class="text-2xl font-semibold">
            Nadchodzące Wydarzenia
          </h2>
        </div>

        <ul class="space-y-5">
          <li
            v-for="event in events"
            :key="event.eventDate"
            class="flex items-center"
          >
            <span
              class="date text-primary font-medium text-base w-28 text-right mr-6"
            >
              {{ formatDate(event.eventDate) }}
            </span>
            <NuxtLink
              :to="generateEventLink(event)"
              class="event-title text-lg font-medium hover:text-primary-dark transition-colors"
              aria-label="Przejdź do szczegółów wydarzenia: {{ event.title }}"
            >
              {{ truncateTitle(event.title) }}
            </NuxtLink>
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

const calendarImage = "/kalendarz-wydarzen.png";

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
  background-color: #ffffff;
  color: #1f2937;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 1160px;
  width: 100%;
}

.header svg {
  color: #3b82f6;
}

.image-section {
  width: 100%;
  max-width: 14rem;
}

.image-section img {
  border-radius: 0.5rem;
  object-fit: cover;
  transition: object-position 0.3s ease;
}

.bg-primary {
  background-color: #3b82f6;
}

.text-primary {
  color: #3b82f6;
}

.text-primary-dark {
  color: #2563eb;
}

.date {
  color: #3b82f6;
}

.events-section ul {
  list-style: none;
  padding: 0;
}

.event-title {
  transition: color 0.3s ease-in-out;
}

.event-title:hover {
  color: #2563eb;
}

@media (max-width: 768px) {
  .event-calendar {
    flex-direction: column;
    align-items: center;
  }

  .image-section {
    margin-bottom: 1.5rem;
    width: 100%;
  }

  .events-section {
    width: 100%;
  }
}
</style>
