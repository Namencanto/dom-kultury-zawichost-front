<template>
  <footer
    :class="isAccessibilityMode ? 'bg-black text-yellow-300' : 'bg-white'"
    class="shadow-md"
    aria-label="Stopka strony"
  >
    <!-- Non-Accessibility Mode Layout -->
    <div
      v-if="!isAccessibilityMode"
      class="container mx-auto py-6 px-6 flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0"
    >
      <!-- Logo and Address Section -->
      <div
        class="flex flex-col items-start lg:flex-row lg:items-center lg:space-x-4 mb-4 lg:mb-0 w-full lg:w-auto"
      >
        <nuxt-img
          src="/logo.jpg"
          alt="Logo Miejsko-Gminnego Ośrodka Kultury w Zawichoście"
          class="h-16 mb-4 lg:mb-0"
        />
        <address class="not-italic text-left w-full lg:w-auto">
          <p class="text-lg font-bold">
            Miejsko-Gminny Ośrodek Kultury w Zawichoście
          </p>
          <p class="text-gray-700">Adres: Żeromskiego 33, 27-630 Zawichost</p>
          <p class="text-gray-700">
            Czynny: poniedziałek – piątek 8.00 – 20.00
          </p>
          <p class="text-gray-700">
            Telefon: <a href="tel:158364164">15&nbsp;836&nbsp;41&nbsp;64</a>
          </p>
          <p class="text-gray-700">
            Kom.: <a href="tel:508238658">508&nbsp;238&nbsp;658</a>,
            <a href="tel:518902688">518&nbsp;902&nbsp;688</a>
          </p>
          <p class="text-gray-700">NIP: 864-14-60-975</p>
          <p class="text-gray-700">
            Nr konta bankowego:
            09&nbsp;9429&nbsp;0004&nbsp;2001&nbsp;0100&nbsp;1094&nbsp;0001
          </p>
        </address>
      </div>

      <!-- Contact Information Section -->
      <div class="text-gray-700 mb-4 lg:mb-0 lg:ml-4 flex-1">
        <p>
          Dyrektor:
          <a href="mailto:dyrektor.mgok@zawichost.pl" class="text-red-600"
            >dyrektor.mgok@zawichost.pl</a
          ><br />
          Sekretariat:
          <a href="mailto:mgok@zawichost.pl" class="text-red-600"
            >mgok@zawichost.pl</a
          ><br />
          Organizacja MGOK:
          <a href="mailto:e.kedziora.mgok@zawichost.pl" class="text-red-600"
            >e.kedziora.mgok@zawichost.pl</a
          ><br />
          Promocja:
          <a href="mailto:t.chmiel.mgok@zawichost.pl" class="text-red-600"
            >t.chmiel.mgok@zawichost.pl</a
          >
        </p>
      </div>

      <!-- Social Media Icons Section -->
      <div class="flex space-x-4 mt-4 lg:mt-0 lg:ml-4">
        <a
          href="https://www.facebook.com/mgokzawichost"
          class="text-gray-500"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Odwiedź nasz profil na Facebooku"
        >
          <Icon name="ion:social-facebook" class="h-6 w-6 lg:h-8 lg:w-8" />
        </a>
      </div>
    </div>

    <!-- Accessibility Mode Layout -->
    <div
      v-else
      class="container mx-auto py-6 px-6 flex flex-col lg:flex-row lg:justify-between lg:items-start bg-black text-yellow-300 space-y-4 lg:space-y-0"
    >
      <!-- Logo and Address Section for Accessibility Mode -->
      <div
        class="flex flex-col items-start lg:flex-row lg:items-center lg:space-x-4 mb-4 lg:mb-0 w-full lg:w-auto"
      >
        <nuxt-img
          src="/logo.jpg"
          alt="Logo Miejsko-Gminnego Ośrodka Kultury w Zawichoście"
          class="h-24 mb-4 lg:mb-0"
        />
        <address class="not-italic text-left w-full lg:w-auto">
          <p class="text-xl font-extrabold text-yellow-300">
            Miejsko-Gminny Ośrodek Kultury w Zawichoście
          </p>
          <p class="text-yellow-300">Adres: Żeromskiego 33, 27-630 Zawichost</p>
          <p class="text-yellow-300">
            Czynny: poniedziałek – piątek 8.00 – 20.00
          </p>
          <p class="text-yellow-300">
            Telefon:
            <a href="tel:158364164" class="underline text-yellow-300"
              >15&nbsp;836&nbsp;41&nbsp;64</a
            >
          </p>
          <p class="text-yellow-300">
            Kom.:
            <a href="tel:508238658" class="underline text-yellow-300"
              >508&nbsp;238&nbsp;658</a
            >,
            <a href="tel:518902688" class="underline text-yellow-300"
              >518&nbsp;902&nbsp;688</a
            >
          </p>
          <p class="text-yellow-300">NIP: 864-14-60-975</p>
          <p class="text-yellow-300">
            Nr konta bankowego:
            09&nbsp;9429&nbsp;0004&nbsp;2001&nbsp;0100&nbsp;1094&nbsp;0001
          </p>
        </address>
      </div>

      <!-- Contact Information Section for Accessibility Mode -->
      <div class="text-yellow-300 mb-4 lg:mb-0 lg:ml-4 flex-1">
        <p>
          Dyrektor:
          <a
            href="mailto:dyrektor.mgok@zawichost.pl"
            class="underline text-yellow-300"
            >dyrektor.mgok@zawichost.pl</a
          ><br />
          Sekretariat:
          <a href="mailto:mgok@zawichost.pl" class="underline text-yellow-300"
            >mgok@zawichost.pl</a
          ><br />
          Organizacja MGOK:
          <a
            href="mailto:e.kedziora.mgok@zawichost.pl"
            class="underline text-yellow-300"
            >e.kedziora.mgok@zawichost.pl</a
          ><br />
          Promocja:
          <a
            href="mailto:t.chmiel.mgok@zawichost.pl"
            class="underline text-yellow-300"
            >t.chmiel.mgok@zawichost.pl</a
          >
        </p>
      </div>

      <!-- Social Media Icons Section for Accessibility Mode -->
      <div class="flex space-x-4 mt-4 lg:mt-0 lg:ml-4">
        <a
          href="https://www.facebook.com/mgokzawichost"
          class="text-yellow-300"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Odwiedź nasz profil na Facebooku"
        >
          <Icon name="ion:social-facebook" class="h-6 w-6 lg:h-8 lg:w-8" />
        </a>
      </div>
    </div>

    <!-- Footer Bottom Section -->
    <div :class="isAccessibilityMode ? 'bg-black py-2' : 'bg-red-600 py-2'">
      <div
        :class="[
          'container mx-auto flex flex-col items-center lg:flex-row lg:justify-between text-sm space-y-2 lg:space-y-0',
          isAccessibilityMode ? 'text-yellow-300' : 'text-white',
        ]"
      >
        <p :class="isAccessibilityMode ? 'text-yellow-300' : 'text-white'">
          © Projekt i wykonanie:
          <a
            href="https://www.linkedin.com/in/mateusz-ordon"
            target="_blank"
            rel="noopener noreferrer"
            >Mateusz Ordon</a
          >
        </p>
        <nav
          aria-label="Dodatkowe linki"
          :class="
            isAccessibilityMode
              ? 'flex space-x-4 mt-2 lg:mt-0 text-yellow-300'
              : 'flex space-x-4 mt-2 lg:mt-0'
          "
        >
          <a
            href="/sitemap.xml"
            :class="
              isAccessibilityMode
                ? 'underline focus:outline-none focus:ring-2 focus:ring-yellow-300 hover:text-white'
                : 'underline focus:outline-none focus:ring-2 focus:ring-white'
            "
            aria-label="Mapa strony"
            >Mapa strony</a
          >
          <NuxtLink
            to="rodo"
            :class="
              isAccessibilityMode
                ? 'underline focus:outline-none focus:ring-2 focus:ring-yellow-300 hover:text-white'
                : 'underline focus:outline-none focus:ring-2 focus:ring-white'
            "
            aria-label="Polityka prywatności"
            >Polityka prywatności</NuxtLink
          >
          <NuxtLink
            to="deklaracja-dostepnosci"
            :class="
              isAccessibilityMode
                ? 'underline focus:outline-none focus:ring-2 focus:ring-yellow-300 hover:text-white'
                : 'underline focus:outline-none focus:ring-2 focus:ring-white'
            "
            aria-label="Deklaracja dostępności"
            >Deklaracja dostępności</NuxtLink
          >
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useAccessibilityStore } from "~/stores/accessibility";
import { computed } from "vue";

const accessibilityStore = useAccessibilityStore();

const isAccessibilityMode = computed(
  () => accessibilityStore.isAccessibilityMode
);
</script>
