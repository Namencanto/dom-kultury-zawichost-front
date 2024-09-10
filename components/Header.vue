<template>
  <div>
    <header
      class="bg-white shadow-md relative"
      aria-label="Nagłówek strony głównej"
    >
      <div
        class="container mx-auto py-4 px-6 flex flex-col items-center lg:flex-row lg:justify-between"
      >
        <!-- Logo and Info -->
        <div class="flex items-center space-x-4 mb-4 lg:mb-0">
          <NuxtLink to="/" aria-label="Strona główna">
            <img
              src="/logo.jpg"
              alt="Logo Miejsko Gminnego Ośrodka Kultury Zawichost"
              class="h-32"
            />
          </NuxtLink>
          <div class="flex flex-col items-start text-left">
            <h1 class="text-2xl font-bold text-gray-800 lg:text-left">
              Miejsko Gminny Ośrodek Kultury Zawichost
            </h1>
            <div
              class="flex flex-col items-start text-left mt-2 hidden sm:flex"
            >
              <span class="text-gray-700" aria-live="polite">{{
                currentDay
              }}</span>
              <span class="text-gray-700" aria-live="polite">{{
                currentDate
              }}</span>
              <span class="text-gray-700" aria-live="polite"
                >{{ temperature }}°C</span
              >
            </div>
          </div>
        </div>

        <!-- Social and Accessibility Links -->
        <div class="flex flex-col items-center lg:flex-row lg:space-x-4">
          <div class="flex space-x-4 mb-4 lg:mb-0">
            <!-- Links and Icons -->
            <NuxtLink
              to="/informacje"
              class="text-gray-700 py-2 px-3"
              aria-label="Informacje"
            >
              <Icon name="maki:information" class="h-6 w-6" />
            </NuxtLink>
            <a
              href="https://www.facebook.com/mgokzawichost"
              class="text-gray-700 py-2 px-3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Odwiedź nasz profil na Facebooku"
            >
              <Icon name="ion:social-facebook" class="h-6 w-6" />
            </a>
            <NuxtLink
              to="/widok"
              class="text-gray-700 py-2 px-3"
              aria-label="Widok"
            >
              <Icon name="uil:eye" class="h-6 w-6" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Main Navigation with Dynamic Sections -->
      <nav class="bg-gray-100" aria-label="Główna nawigacja">
        <div
          class="container mx-auto flex flex-col items-center lg:flex-row lg:justify-between py-2 px-6"
        >
          <div class="flex flex-wrap lg:space-x-4">
            <!-- Static Links -->
            <NuxtLink
              to="/"
              class="text-gray-800 hover:underline py-1 px-2"
              aria-label="Strona główna"
              >M-GOK</NuxtLink
            >
            <a
              href="https://mgok-zawichost.biuletyn.net"
              class="text-gray-800 hover:underline py-1 px-2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Biuletyn Informacji Publicznej"
              >BIP</a
            >
            <NuxtLink
              to="/aktualnosci"
              class="text-gray-800 hover:underline py-1 px-2"
              aria-label="Aktualności"
              >AKTUALNOŚCI</NuxtLink
            >
            <NuxtLink
              to="/kalendarz-wydarzen"
              class="text-gray-800 hover:underline py-1 px-2"
              aria-label="Kalendarz Wydarzeń"
              >KALENDARZ WYDARZEŃ</NuxtLink
            >

            <!-- Dynamic Dropdown for SEKCJE -->
            <div class="relative group">
              <button
                type="button"
                class="text-gray-800 focus:outline-none py-1 px-2"
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="sekcje-menu"
              >
                SEKCJE
              </button>
              <ul
                id="sekcje-menu"
                class="absolute hidden group-hover:flex flex-col bg-white border shadow-lg z-10"
                role="menu"
              >
                <li v-for="(section, index) in uniqueSections" :key="index">
                  <NuxtLink
                    :to="`/sekcje/${section.toLowerCase()}`"
                    class="py-2 px-4 hover:bg-gray-200"
                    role="menuitem"
                    >{{ section }}</NuxtLink
                  >
                </li>
              </ul>
            </div>

            <!-- Static Links -->
            <NuxtLink
              to="/lamus"
              class="text-gray-800 hover:underline py-1 px-2"
              aria-label="Lamus"
              >LAMUS</NuxtLink
            >
            <NuxtLink
              to="/tablica-ogloszen"
              class="text-gray-800 hover:underline py-1 px-2"
              aria-label="Tablica ogłoszeń"
              >TABLICA OGŁOSZEŃ</NuxtLink
            >
            <NuxtLink
              to="/rodo"
              class="text-gray-800 hover:underline py-1 px-2"
              aria-label="RODO"
              >RODO</NuxtLink
            >
          </div>
          <!-- Font Size Adjuster and Admin Status -->
          <div class="relative mt-4 lg:mt-0">
            <div class="absolute top-[-3.4rem] right-0 flex space-x-2">
              <button
                type="button"
                @click="setFontSize('normal')"
                class="text-gray-800 py-2 px-3"
                aria-label="Normalna wielkość czcionki"
                title="Normalna wielkość czcionki"
                style="min-width: 24px; min-height: 24px"
              >
                A
              </button>
              <button
                type="button"
                @click="setFontSize('large')"
                class="text-gray-800 py-2 px-3"
                aria-label="Duża wielkość czcionki"
                title="Duża wielkość czcionki"
                style="min-width: 24px; min-height: 24px"
              >
                A+
              </button>
              <button
                type="button"
                @click="setFontSize('x-large')"
                class="text-gray-800 py-2 px-3"
                aria-label="Bardzo duża wielkość czcionki"
                title="Bardzo duża wielkość czcionki"
                style="min-width: 24px; min-height: 24px"
              >
                A++
              </button>
            </div>
            <div
              v-if="authStatus"
              class="text-red-500 font-bold"
              aria-live="polite"
            >
              ADMIN
            </div>
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
const uniqueSections = ref<string[]>([]);

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
  fetchUniqueSections();
  setTimeout(() => fetchTemperature(), 1);
  authStatus.value = await authStore.getAuthAdminStatus;
});
</script>
