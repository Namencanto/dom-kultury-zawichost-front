<template>
  <header
    :class="[isAccessibilityMode ? 'text-white' : 'text-gray-800', 'shadow-md']"
  >
    <!-- Top Information Bar -->
    <div
      :class="[
        isAccessibilityMode ? 'text-yellow-300' : 'text-gray-600 bg-white',
        'py-4 border-b border-gray-300 bg-black',
      ]"
    >
      <div
        class="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0"
      >
        <!-- Date and Weather -->
        <div
          :class="[
            isAccessibilityMode ? 'text-yellow-300' : 'text-gray-600',
            'flex items-center justify-center space-x-2 md:space-x-4 text-sm md:text-base',
          ]"
        >
          <span>{{ currentDay }}, {{ currentDate }}</span>
          <span>{{ temperature }}°C</span>
        </div>

        <!-- Social and Accessibility Links -->
        <div class="flex justify-center md:justify-end items-center space-x-4">
          <a
            href="https://www.facebook.com/mgokzawichost"
            :class="[
              isAccessibilityMode
                ? 'text-yellow-300 hover:text-white'
                : 'text-gray-600 hover:text-gray-900',
            ]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="ion:social-facebook" class="h-6 w-6" />
          </a>
          <span
            style="cursor: pointer"
            @click="toggleAccessibilityMode"
            :class="[
              isAccessibilityMode
                ? 'text-yellow-300 hover:text-white'
                : 'text-gray-600 hover:text-gray-900',
            ]"
          >
            <Icon name="uil:eye" class="h-6 w-6" />
          </span>
          <a
            href="/rss.xml"
            :class="[
              isAccessibilityMode
                ? 'text-yellow-300 hover:text-white'
                : 'text-gray-600 hover:text-gray-900',
            ]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="mdi:rss" class="h-6 w-6" />
          </a>

          <!-- Font Size Adjuster -->
          <div class="flex items-center space-x-1">
            <button
              @click="setFontSize('normal')"
              :class="[
                'font-size-button',
                currentFontSize === 'normal'
                  ? isAccessibilityMode
                    ? 'bg-yellow-300 text-black'
                    : 'bg-gray-600 text-white'
                  : isAccessibilityMode
                    ? 'bg-black text-yellow-300'
                    : 'bg-white text-gray-600',
              ]"
            >
              A
            </button>
            <button
              @click="setFontSize('large')"
              :class="[
                'font-size-button',
                currentFontSize === 'large'
                  ? isAccessibilityMode
                    ? 'bg-yellow-300 text-black'
                    : 'bg-gray-600 text-white'
                  : isAccessibilityMode
                    ? 'bg-black text-yellow-300'
                    : 'bg-white text-gray-600',
              ]"
            >
              A+
            </button>
            <button
              @click="setFontSize('x-large')"
              :class="[
                'font-size-button',
                currentFontSize === 'x-large'
                  ? isAccessibilityMode
                    ? 'bg-yellow-300 text-black'
                    : 'bg-gray-600 text-white'
                  : isAccessibilityMode
                    ? 'bg-black text-yellow-300'
                    : 'bg-white text-gray-600',
              ]"
            >
              A++
            </button>
          </div>

          <!-- ADMIN Status -->
          <div
            v-if="authStatus"
            :class="[
              isAccessibilityMode ? 'text-red-300' : 'text-red-500 font-bold',
            ]"
          >
            ADMIN
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <nav :class="[isAccessibilityMode ? 'bg-yellow-300' : 'bg-white', 'py-4']">
      <div
        class="container mx-auto flex flex-wrap justify-center space-x-4 md:space-x-8"
      >
        <NuxtLink
          :class="[
            isAccessibilityMode
              ? 'text-black font-bold hover:bg-yellow-300 hover:text-black py-1 rounded'
              : 'text-lg text-gray-700 hover:text-black font-medium',
            fontSizeClass,
          ]"
          to="/"
        >
          M-GOK
        </NuxtLink>
        <NuxtLink
          :class="[
            isAccessibilityMode
              ? 'text-black font-bold hover:bg-yellow-300 hover:text-black py-1 rounded'
              : 'text-lg text-gray-700 hover:text-black font-medium',
            fontSizeClass,
          ]"
          to="/aktualnosci"
        >
          AKTUALNOŚCI
        </NuxtLink>
        <a
          :class="[
            isAccessibilityMode
              ? 'text-black font-bold hover:bg-yellow-300 hover:text-black py-1 rounded'
              : 'text-lg text-gray-700 hover:text-black font-medium',
            fontSizeClass,
          ]"
          href="https://mgok-zawichost.biuletyn.net/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Odwiedź Biuletyn Informacji Publicznej"
        >
          BIP
        </a>
        <NuxtLink
          :class="[
            isAccessibilityMode
              ? 'text-black font-bold hover:bg-yellow-300 hover:text-black py-1 rounded'
              : 'text-lg text-gray-700 hover:text-black font-medium',
            fontSizeClass,
          ]"
          to="/kalendarz-wydarzen"
        >
          KALENDARZ WYDARZEŃ
        </NuxtLink>
        <NuxtLink
          :class="[
            isAccessibilityMode
              ? 'text-black font-bold hover:bg-yellow-300 hover:text-black py-1 rounded'
              : 'text-lg text-gray-700 hover:text-black font-medium',
            fontSizeClass,
          ]"
          to="/tablica-ogloszen"
        >
          TABLICA OGŁOSZEŃ
        </NuxtLink>
        <NuxtLink
          :class="[
            isAccessibilityMode
              ? 'text-black font-bold hover:bg-yellow-300 hover:text-black py-1 rounded'
              : 'text-lg text-gray-700 hover:text-black font-medium',
            fontSizeClass,
          ]"
          to="/rodo"
        >
          RODO
        </NuxtLink>

        <!-- Dynamic Dropdown for Sections -->
        <div class="relative group inline-block">
          <NuxtLink
            :class="[
              isAccessibilityMode
                ? 'text-black font-bold hover:bg-yellow-300 hover:text-black py-1 rounded inline-block align-middle'
                : 'text-lg text-gray-700 hover:text-black font-medium',
              fontSizeClass,
            ]"
            to="/sekcje/teatr"
          >
            SEKCJE
          </NuxtLink>

          <ul
            class="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-200 shadow-lg z-20 w-60 text-sm rounded-md"
          >
            <li
              v-for="(section, index) in uniqueSections"
              :key="index"
              :class="[
                isAccessibilityMode
                  ? 'hover:bg-yellow-300 hover:text-black'
                  : 'hover:bg-gray-200 hover:text-black',
                'py-3 px-4',
              ]"
            >
              <NuxtLink
                :to="`/sekcje/${section.toLowerCase()}`"
                :class="[fontSizeClass]"
                :title="section"
              >
                {{ truncateText(section) }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useAccessibilityStore } from "~/stores/accessibility";
import { useFontSizeStore } from "~/stores/fontSize";
import { useAuthStore } from "~/stores/auth";

const toggleAccessibilityMode = () => {
  accessibilityStore.toggleAccessibilityMode();
};

const accessibilityStore = useAccessibilityStore();
const fontSizeStore = useFontSizeStore();
const authStore = useAuthStore();

const currentDay = ref("");
const currentDate = ref("");
const temperature = ref("");
const uniqueSections = ref<string[]>([]);
const dropdownOpen = ref(false);

const currentFontSize = computed(() => fontSizeStore.currentFontSize);
const fontSizeClass = computed(() => {
  if (fontSizeStore.currentFontSize === "large") return "text-xl";
  if (fontSizeStore.currentFontSize === "x-large") return "text-2xl";
  return "text-lg";
});

const toggleDropdown = (open: boolean) => {
  dropdownOpen.value = open;
};

const setFontSize = (size: string) => {
  fontSizeStore.setFontSize(size);
};

const isAccessibilityMode = computed(
  () => accessibilityStore.isAccessibilityMode
);

const authStatus = ref(false);

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
  currentDate.value = `${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;
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
      console.error("No data or the data is not in an array.");
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
  setTimeout(() => {
    fetchTemperature();
  }, 1);
  fetchUniqueSections();
  authStatus.value = await authStore.getAuthAdminStatus();
});
</script>

<style scoped>
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Font Size Adjuster Buttons */
.font-size-button {
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: bold;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.font-size-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
