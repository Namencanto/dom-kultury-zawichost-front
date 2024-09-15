<template>
  <div>
    <header
      :class="[
        isAccessibilityMode ? 'bg-black text-white' : 'bg-white shadow-md',
        'sticky top-0 z-50',
      ]"
      aria-label="Nagłówek strony"
    >
      <div
        class="container mx-auto py-4 px-6 flex flex-col items-center lg:flex-row lg:justify-between"
      >
        <!-- Logo and Info -->
        <div
          class="flex flex-col items-center lg:flex-row lg:items-center space-y-4 lg:space-y-0 mb-6 lg:mb-0 w-full lg:w-auto"
        >
          <NuxtLink to="/" class="flex justify-center mb-2 lg:mb-0">
            <nuxt-img
              :class="isAccessibilityMode ? 'h-40' : 'h-32'"
              src="/logo.jpg"
              alt="Logo"
            />
          </NuxtLink>
          <div
            class="flex flex-col items-center lg:items-start text-center lg:text-left mt-2 lg:mt-0 lg:ml-4"
          >
            <span
              :class="[
                isAccessibilityMode
                  ? 'text-3xl font-extrabold text-yellow-300'
                  : 'text-2xl font-bold text-gray-800',
              ]"
            >
              Miejsko Gminny Ośrodek Kultury Zawichost
            </span>
            <div
              class="flex flex-col items-center lg:items-start text-center lg:text-left mt-2"
            >
              <span
                :class="
                  isAccessibilityMode ? 'text-yellow-300' : 'text-gray-500'
                "
                >{{ currentDay }}</span
              >
              <span
                :class="
                  isAccessibilityMode ? 'text-yellow-300' : 'text-gray-500'
                "
                >{{ currentDate }}</span
              >
              <span
                :class="
                  isAccessibilityMode ? 'text-yellow-300' : 'text-gray-500'
                "
                >{{ temperature }}°C</span
              >
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div
          class="flex flex-wrap items-center justify-center lg:justify-end w-full lg:w-auto mt-4 lg:mt-0"
        >
          <!-- Links and Icons -->
          <div
            class="flex space-x-8 sm:space-x-10 md:space-x-12 lg:space-x-6 mb-4 lg:mb-0"
          >
            <NuxtLink
              :class="
                isAccessibilityMode
                  ? 'text-yellow-300 hover:text-white'
                  : 'text-gray-500 hover:text-gray-800'
              "
              to="/informacje"
            >
              <Icon
                name="maki:information"
                :class="isAccessibilityMode ? 'h-8 w-8' : 'h-6 w-6'"
              />
            </NuxtLink>
            <a
              href="https://www.facebook.com/mgokzawichost"
              :class="
                isAccessibilityMode
                  ? 'text-yellow-300 hover:text-white'
                  : 'text-gray-500 hover:text-gray-800'
              "
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                name="ion:social-facebook"
                :class="isAccessibilityMode ? 'h-8 w-8' : 'h-6 w-6'"
              />
            </a>
            <span
              style="cursor: pointer"
              @click="toggleAccessibilityMode"
              :class="
                isAccessibilityMode
                  ? 'text-yellow-300 hover:text-white'
                  : 'text-gray-500 hover:text-gray-800'
              "
            >
              <Icon
                name="uil:eye"
                :class="isAccessibilityMode ? 'h-8 w-8' : 'h-6 w-6'"
              />
            </span>
            <a
              href="/rss.xml"
              :class="
                isAccessibilityMode
                  ? 'text-yellow-300 hover:text-white'
                  : 'text-gray-500 hover:text-gray-800'
              "
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                name="mdi:rss"
                :class="isAccessibilityMode ? 'h-8 w-8' : 'h-6 w-6'"
              />
            </a>
          </div>
        </div>
      </div>

      <!-- Main Navigation with Dynamic Sections -->
      <nav :class="[isAccessibilityMode ? 'bg-yellow-300' : 'bg-gray-100']">
        <div
          class="container mx-auto flex flex-col items-center lg:flex-row lg:justify-between py-3 px-6"
        >
          <div
            class="flex flex-wrap justify-center lg:justify-start w-full lg:w-auto gap-6 lg:gap-8"
          >
            <!-- Static Links -->
            <NuxtLink
              :class="
                isAccessibilityMode
                  ? 'text-black font-bold hover:bg-yellow-300 hover:text-black  py-1 rounded'
                  : 'text-gray-700 hover:text-black'
              "
              to="/"
              >M-GOK</NuxtLink
            >
            <a
              href="https://mgok-zawichost.biuletyn.net"
              :class="
                isAccessibilityMode
                  ? 'text-black font-bold hover:bg-yellow-300 hover:text-black py-1 rounded'
                  : 'text-gray-700 hover:text-black'
              "
              target="_blank"
              rel="noopener noreferrer"
              >BIP</a
            >
            <NuxtLink
              :class="
                isAccessibilityMode
                  ? 'text-black font-bold hover:bg-yellow-300 hover:text-black py-1 rounded'
                  : 'text-gray-700 hover:text-black'
              "
              to="/aktualnosci"
              >AKTUALNOŚCI</NuxtLink
            >
            <NuxtLink
              :class="
                isAccessibilityMode
                  ? 'text-black font-bold hover:bg-yellow-300 hover:text-black py-1 rounded'
                  : 'text-gray-700 hover:text-black'
              "
              to="/kalendarz-wydarzen"
              >KALENDARZ WYDARZEŃ</NuxtLink
            >

            <!-- Dynamic Dropdown for SEKCJE -->
            <div class="relative group inline-block">
              <NuxtLink
                :class="
                  isAccessibilityMode
                    ? 'text-black font-bold hover:bg-yellow-300 hover:text-black py-1 rounded inline-block align-middle'
                    : 'text-gray-700 hover:text-black'
                "
                to="/sekcje/teatr"
              >
                SEKCJE
              </NuxtLink>
              <ul
                :class="
                  isAccessibilityMode
                    ? 'absolute hidden group-hover:flex flex-col bg-black border-yellow-300 border shadow-lg z-10 w-60 max-w-xs text-sm rounded-md'
                    : 'absolute hidden group-hover:flex flex-col bg-white border shadow-lg z-10 w-60 max-w-xs text-sm rounded-md'
                "
              >
                <li
                  v-for="(section, index) in uniqueSections"
                  :key="index"
                  :class="
                    isAccessibilityMode
                      ? 'hover:bg-yellow-300 hover:text-black w-full'
                      : 'hover:bg-gray-200 hover:text-black w-full'
                  "
                >
                  <NuxtLink
                    :to="`/sekcje/${section.toLowerCase()}`"
                    :class="
                      isAccessibilityMode
                        ? 'block py-3 px-4 text-yellow-300 hover:text-black'
                        : 'block py-3 px-4 hover:bg-gray-200 hover:text-black'
                    "
                    :title="section"
                  >
                    {{ truncateText(section) }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Static Links -->
            <NuxtLink
              :class="
                isAccessibilityMode
                  ? 'text-black font-bold hover:bg-yellow-300 hover:text-black py-1 rounded'
                  : 'text-gray-700 hover:text-black'
              "
              to="/lamus"
              >LAMUS</NuxtLink
            >
            <NuxtLink
              :class="
                isAccessibilityMode
                  ? 'text-black font-bold hover:bg-yellow-300 hover:text-black py-1 rounded'
                  : 'text-gray-700 hover:text-black'
              "
              to="/tablica-ogloszen"
              >TABLICA OGŁOSZEŃ</NuxtLink
            >
            <NuxtLink
              :class="
                isAccessibilityMode
                  ? 'text-black font-bold hover:bg-yellow-300 hover:text-black py-1 rounded'
                  : 'text-gray-700 hover:text-black'
              "
              to="/rodo"
              >RODO</NuxtLink
            >
          </div>

          <!-- Font Size Adjuster and Admin Status -->
          <div
            class="relative mt-4 lg:mt-0 flex justify-center lg:justify-end space-x-8 sm:space-x-10 md:space-x-12 lg:space-x-4"
          >
            <button
              @click="setFontSize('normal')"
              :class="
                isAccessibilityMode
                  ? 'text-black bg-yellow-300 hover:bg-yellow-500 hover:text-black rounded-full px-4 py-2'
                  : 'text-gray-500 bg-white hover:bg-gray-200 hover:text-black rounded-full px-4 py-2'
              "
              class="focus:outline-none focus:ring-2"
            >
              A
            </button>
            <button
              @click="setFontSize('large')"
              :class="
                isAccessibilityMode
                  ? 'text-black bg-yellow-300 hover:bg-yellow-500 hover:text-black rounded-full px-4 py-2'
                  : 'text-gray-500 bg-white hover:bg-gray-200 hover:text-black rounded-full px-4 py-2'
              "
              class="focus:outline-none focus:ring-2"
            >
              A+
            </button>
            <button
              @click="setFontSize('x-large')"
              :class="
                isAccessibilityMode
                  ? 'text-black bg-yellow-300 hover:bg-yellow-500 hover:text-black rounded-full px-4 py-2'
                  : 'text-gray-500 bg-white hover:bg-gray-200 hover:text-black rounded-full px-4 py-2'
              "
              class="focus:outline-none focus:ring-2"
            >
              A++
            </button>

            <div
              v-if="authStatus"
              :class="
                isAccessibilityMode ? 'text-red-300' : 'text-red-500 font-bold'
              "
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
import { ref, onMounted, computed } from "vue";
import { useFontSizeStore } from "~/stores/fontSize";
import { useAuthStore } from "~/stores/auth";
import { useAccessibilityStore } from "~/stores/accessibility";

const toggleAccessibilityMode = () => {
  accessibilityStore.toggleAccessibilityMode();
};
const fontSizeStore = useFontSizeStore();
const authStore = useAuthStore();
const accessibilityStore = useAccessibilityStore();

const authStatus = ref(false);
const uniqueSections = ref<string[]>([]);

const setFontSize = (size: string) => {
  fontSizeStore.setFontSize(size);
};

const currentDay = ref("");
const currentDate = ref("");
const temperature = ref("");

const isAccessibilityMode = computed(
  () => accessibilityStore.isAccessibilityMode
);

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

const truncateText = (text: string, maxLength: number = 20) => {
  if (text.length <= maxLength) return text;
  const spaceIndex = text.indexOf(" ", maxLength);
  return spaceIndex === -1 ? text : text.slice(0, spaceIndex) + "...";
};

onMounted(async () => {
  formatDate();
  fetchUniqueSections();
  setTimeout(() => fetchTemperature(), 1);
  authStatus.value = await authStore.getAuthAdminStatus;
});
</script>
