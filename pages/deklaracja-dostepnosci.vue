<template>
  <div
    :class="[
      'container mx-auto py-6 px-6 min-h-screen',
      isAccessibilityMode ? 'bg-black text-yellow-300' : 'bg-white text-black',
    ]"
  >
    <!-- Header Title -->
    <h1
      :class="
        isAccessibilityMode
          ? 'text-4xl font-extrabold mb-6'
          : 'text-3xl font-bold mb-6'
      "
    >
      Deklaracja Dostępności
    </h1>

    <!-- Accessibility Instructions -->
    <section>
      <h2
        :class="
          isAccessibilityMode
            ? 'text-3xl font-bold mb-4'
            : 'text-2xl font-semibold mb-4'
        "
      >
        Jak włączyć tryb dostępności
      </h2>
      <p :class="isAccessibilityMode ? 'text-lg mb-4' : 'mb-4'">
        Tryb dostępności można włączyć klikając ikonę oka w nagłówku strony lub
        przycisk "Tryb dostępności" w prawym dolnym rogu ekranu. Gdy tryb
        dostępności jest aktywny, strona zmienia się na bardziej kontrastową z
        czarnym tłem i żółtym tekstem, aby ułatwić czytanie osobom
        słabowidzącym.
      </p>
    </section>

    <!-- Navigation Instructions -->
    <section>
      <h2
        :class="
          isAccessibilityMode
            ? 'text-3xl font-bold mb-4'
            : 'text-2xl font-semibold mb-4'
        "
      >
        Jak poruszać się po stronie
      </h2>
      <p :class="isAccessibilityMode ? 'text-lg mb-4' : 'mb-4'">
        Możesz poruszać się po stronie za pomocą klawiatury: użyj klawisza
        <strong>Tab</strong> aby przechodzić do kolejnych elementów
        interaktywnych, takich jak linki, przyciski czy pola formularzy. Aby
        powrócić do poprzedniego elementu, użyj kombinacji klawiszy
        <strong>Shift + Tab</strong>.
      </p>
      <p :class="isAccessibilityMode ? 'text-lg mb-4' : 'mb-4'">
        Wszystkie linki i przyciski mają jasne etykiety, które można odczytać za
        pomocą czytników ekranu. Jeśli potrzebujesz dalszych instrukcji
        dotyczących nawigacji po stronie, skontaktuj się z naszym zespołem.
      </p>
    </section>

    <!-- Information About Accessibility -->
    <section>
      <h2
        :class="
          isAccessibilityMode
            ? 'text-3xl font-bold mb-4'
            : 'text-2xl font-semibold mb-4'
        "
      >
        Informacje o dostępności
      </h2>
      <p :class="isAccessibilityMode ? 'text-lg mb-4' : 'mb-4'">
        Nasza strona jest zgodna z wytycznymi WCAG 2.1 na poziomie AA, co
        oznacza, że staramy się zapewnić dostępność dla jak najszerszej grupy
        użytkowników, w tym osób z różnymi niepełnosprawnościami. Nasze funkcje
        dostępności obejmują:
      </p>
      <ul
        :class="
          isAccessibilityMode
            ? 'list-disc ml-6 text-lg mb-4'
            : 'list-disc ml-6 mb-4'
        "
      >
        <li :class="isAccessibilityMode ? 'mb-2' : 'mb-1'">
          Wysoki kontrast tekstu i tła.
        </li>
        <li :class="isAccessibilityMode ? 'mb-2' : 'mb-1'">
          Czytelne czcionki o odpowiedniej wielkości.
        </li>
        <li :class="isAccessibilityMode ? 'mb-2' : 'mb-1'">
          Obsługa nawigacji za pomocą klawiatury.
        </li>
        <li :class="isAccessibilityMode ? 'mb-2' : 'mb-1'">
          Teksty alternatywne dla obrazów.
        </li>
        <li :class="isAccessibilityMode ? 'mb-2' : 'mb-1'">
          Czytelne etykiety dla linków i przycisków.
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAccessibilityStore } from "~/stores/accessibility";

// Store for managing accessibility mode
const accessibilityStore = useAccessibilityStore();
const isAccessibilityMode = computed(
  () => accessibilityStore.isAccessibilityMode
);

// Head metadata for SEO and accessibility
useHead({
  title: "Deklaracja Dostępności - Dom Kultury w Zawichoście",
  meta: [
    {
      name: "description",
      content:
        "Informacje na temat dostępności strony Domu Kultury w Zawichoście.",
    },
    {
      name: "keywords",
      content:
        "dostępność, accessibility, Dom Kultury, Zawichost, WCAG, instrukcja",
    },
  ],
});
</script>
