<template>
  <div>
    <header class="bg-white shadow-md relative">
      <div
        class="container mx-auto py-4 px-6 flex flex-col items-center lg:flex-row lg:justify-between"
      >
        <!-- Logo and Info -->
        <div class="flex items-center space-x-4 mb-4 lg:mb-0">
          <NuxtLink to="/">
            <img src="/logo.jpg" alt="Logo" class="h-32" />
          </NuxtLink>
          <div class="flex flex-col items-start text-left">
            <span class="text-2xl font-bold text-gray-800 lg:text-left">
              Miejsko Gminny Ośrodek Kultury Zawichost
            </span>
            <div
              class="flex flex-col items-start text-left mt-2 hidden sm:flex"
            >
              <span class="text-gray-500">{{ currentDay }}</span>
              <span class="text-gray-500">{{ currentDate }}</span>
              <span class="text-gray-500">{{ temperature }}°C</span>
            </div>
          </div>
        </div>
        <!-- Navigation -->
        <div class="flex flex-col items-center lg:flex-row lg:space-x-4">
          <div class="flex space-x-4 mb-4 lg:mb-0">
            <!-- Links and Icons -->
            <NuxtLink to="/informacje" class="text-gray-500">
              <Icon name="maki:information" class="h-6 w-6" />
            </NuxtLink>
            <a
              href="https://www.facebook.com/mgokzawichost"
              class="text-gray-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="ion:social-facebook" class="h-6 w-6" />
            </a>
            <NuxtLink to="/widok" class="text-gray-500">
              <Icon name="uil:eye" class="h-6 w-6" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Main Navigation with Dynamic Sections -->
      <nav class="bg-gray-100">
        <div
          class="container mx-auto flex flex-col items-center lg:flex-row lg:justify-between py-3 px-6"
        >
          <div class="flex flex-wrap lg:space-x-4">
            <!-- Static Links -->
            <NuxtLink to="/" class="text-gray-700">M-GOK</NuxtLink>
            <a
              href="https://mgok-zawichost.biuletyn.net"
              class="text-gray-700"
              target="_blank"
              rel="noopener noreferrer"
              >BIP</a
            >
            <NuxtLink to="/aktualnosci" class="text-gray-700"
              >AKTUALNOŚCI</NuxtLink
            >
            <NuxtLink to="/kalendarz-wydarzen" class="text-gray-700"
              >KALENDARZ WYDARZEŃ</NuxtLink
            >

            <!-- Dynamic Dropdown for SEKCJE -->
            <div class="relative group">
              <NuxtLink to="/sekcje/teatr" class="text-gray-700"
                >SEKCJE</NuxtLink
              >
              <ul
                class="absolute hidden group-hover:flex flex-col bg-white border shadow-lg z-10"
              >
                <li v-for="(section, index) in uniqueSections" :key="index">
                  <NuxtLink
                    :to="`/sekcje/${section.toLowerCase()}`"
                    class="py-2 px-4 hover:bg-gray-200"
                    >{{ section }}</NuxtLink
                  >
                </li>
              </ul>
            </div>

            <!-- Static Links -->
            <NuxtLink to="/lamus" class="text-gray-700">LAMUS</NuxtLink>
            <NuxtLink to="/tablica-ogloszen" class="text-gray-700"
              >TABLICA OGŁOSZEŃ</NuxtLink
            >
            <NuxtLink to="/rodo" class="text-gray-700">RODO</NuxtLink>
          </div>
          <!-- Font Size Adjuster and Admin Status -->
          <div class="relative mt-4 lg:mt-0">
            <div class="absolute top-[-3rem] right-0 flex space-x-2">
              <button @click="setFontSize('normal')" class="text-gray-500">
                A
              </button>
              <button @click="setFontSize('large')" class="text-gray-500">
                A+
              </button>
              <button @click="setFontSize('x-large')" class="text-gray-500">
                A++
              </button>
            </div>
            <div v-if="authStatus" class="text-red-500 font-bold">ADMIN</div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useFontSizeStore } from "~/stores/fontSize";
import { useAuthStore } from "~/stores/auth";

const fontSizeStore = useFontSizeStore();
const authStore = useAuthStore();
const authStatus = ref(false);
const uniqueSections = ref<string[]>([]); // To store unique sections

const setFontSize = (size: string) => {
  fontSizeStore.setFontSize(size);
};

const currentDay = ref("");
const currentDate = ref("");
const temperature = ref("");

const formatDate = () => {
  const days = [
    "niedziela",
    "poniedziałek",
    "wtorek",
    "środa",
    "czwartek",
    "piątek",
    "sobota",
  ];
  const months = [
    "styczeń",
    "luty",
    "marzec",
    "kwiecień",
    "maj",
    "czerwiec",
    "lipiec",
    "sierpień",
    "wrzesień",
    "październik",
    "listopad",
    "grudzień",
  ];

  const now = new Date();
  currentDay.value = days[now.getDay()];
  currentDate.value = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
};

const fetchTemperature = async () => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=50.7848&longitude=21.6838&current_weather=true`;
  const { data, error } = await useFetch(url);
  if (error.value) {
    console.error("Error fetching temperature data:", error.value);
    return;
  }
  temperature.value = data.value.current_weather.temperature;
};

const fetchUniqueSections = async () => {
  try {
    const result = await queryContent("aktualnosci").find();
    if (result && Array.isArray(result)) {
      // Find unique headings of level 3
      const sectionsSet = new Set<string>();
      result.forEach((item) => {
        // Ensure item.content is an array before filtering
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
      console.error("Brak danych lub dane nie są tablicą.");
    }
  } catch (error) {
    console.error("Error fetching unique sections:", error);
  }
};

onMounted(async () => {
  formatDate();
  fetchUniqueSections(); // Fetch sections on mount
  setTimeout(() => fetchTemperature(), 1);
  authStatus.value = await authStore.getAuthAdminStatus;
});
</script>
