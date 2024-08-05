<template>
  <div>
    <header class="bg-white shadow-md relative">
      <div
        class="container mx-auto py-4 px-6 flex flex-col items-center lg:flex-row lg:justify-between"
      >
        <div class="flex items-center space-x-4 mb-4 lg:mb-0">
          <NuxtLink to="/">
            <img src="/logo.jpg" alt="Logo" class="h-32" />
          </NuxtLink>
          <div class="flex flex-col items-start text-left">
            <span
              class="text-2xl font-bold text-gray-800 text-center lg:text-left"
            >
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
        <div class="flex flex-col items-center lg:flex-row lg:space-x-4">
          <div class="flex space-x-4 mb-4 lg:mb-0">
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
      <nav class="bg-gray-100">
        <div
          class="container mx-auto flex flex-col items-center lg:flex-row lg:justify-between py-2 px-6 relative"
        >
          <div class="flex flex-wrap lg:space-x-4">
            <NuxtLink to="/" class="text-gray-700">M-GOK</NuxtLink>
            <a
              href="https://mgok-zawichost.biuletyn.net"
              class="text-gray-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              BIP
            </a>
            <NuxtLink to="/aktualnosci" class="text-gray-700"
              >AKTUALNOŚCI</NuxtLink
            >
            <NuxtLink to="/kalendarz-wydarzen" class="text-gray-700"
              >KALENDARZ WYDARZEŃ</NuxtLink
            >
            <!-- Dropdown for SEKCJE -->
            <div class="relative group">
              <NuxtLink to="/sekcje/teatr" class="text-gray-700"
                >SEKCJE</NuxtLink
              >
              <ul
                class="absolute hidden group-hover:flex flex-col bg-white border shadow-lg z-10"
              >
                <li>
                  <NuxtLink
                    to="/sekcje/teatr"
                    class="py-2 px-4 hover:bg-gray-200"
                    >TEATR</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/sekcje/plastyka"
                    class="py-2 px-4 hover:bg-gray-200"
                    >PLASTYKA</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/sekcje/gitara"
                    class="py-2 px-4 hover:bg-gray-200"
                    >GITARA</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/sekcje/pianino"
                    class="py-2 px-4 hover:bg-gray-200"
                    >PIANINO</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/sekcje/perkusja"
                    class="py-2 px-4 hover:bg-gray-200"
                    >PERKUSJA</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/sekcje/spiew"
                    class="py-2 px-4 hover:bg-gray-200"
                    >ŚPIEW</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/sekcje/taniec"
                    class="py-2 px-4 hover:bg-gray-200"
                    >TANIEC</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/sekcje/nasi"
                    class="py-2 px-4 hover:bg-gray-200"
                    >NASI</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/sekcje/folklor"
                    class="py-2 px-4 hover:bg-gray-200"
                    >FOLKLOR</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/sekcje/filmozercy"
                    class="py-2 px-4 hover:bg-gray-200"
                    >FILMOŻERCY</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/sekcje/redakcyjna"
                    class="py-2 px-4 hover:bg-gray-200"
                    >REDAKCYJNA</NuxtLink
                  >
                </li>
              </ul>
            </div>

            <NuxtLink to="/lamus" class="text-gray-700">LAMUS</NuxtLink>
            <NuxtLink to="/tablica-ogloszen" class="text-gray-700"
              >TABLICA OGŁOSZEŃ</NuxtLink
            >
            <NuxtLink to="/rodo" class="text-gray-700">RODO</NuxtLink>
          </div>
          <div class="relative mt-4 lg:mt-0">
            <input
              type="text"
              placeholder="Szukaj..."
              class="border rounded px-2 py-1"
            />
            <div class="absolute top-[-2rem] right-0 flex space-x-2">
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
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useFontSizeStore } from "~/stores/fontSize";

const fontSizeStore = useFontSizeStore();

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

onMounted(() => {
  formatDate();
  fetchTemperature();
});
</script>

<style scoped>
.group:hover .group-hover\:flex,
.group-hover\:flex:hover {
  display: flex;
}

.group-hover\:flex {
  display: none;
}

.relative .group-hover\:flex {
  top: 100%;
}

.group-hover\:flex > li {
  display: block;
}

.group-hover\:flex > li > a {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
}

.group-hover\:flex > li > a:hover {
  background-color: #e2e8f0;
}

@media (max-width: 768px) {
  .flex-col {
    flex-direction: column;
  }

  .space-x-4 {
    margin-top: 1rem;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .lg\:flex-nowrap {
    flex-wrap: nowrap;
  }

  .flex-col .text-gray-700 {
    width: 100%;
    text-align: center;
  }

  .flex-col .group {
    width: 100%;
    text-align: center;
  }
}
</style>
