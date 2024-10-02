<template>
  <div
    :class="[
      'container mx-auto py-6 px-6',
      isAccessibilityMode ? 'bg-black text-yellow-300' : 'bg-white text-black',
    ]"
  >
    <!-- Header -->
    <h2
      :class="[
        'text-center mb-6',
        isAccessibilityMode ? 'text-4xl font-extrabold' : 'text-3xl font-bold',
      ]"
    >
      RODO
    </h2>

    <!-- Main Content -->
    <p :class="isAccessibilityMode ? 'text-lg mb-4' : 'mb-4'">
      Klauzula informacyjna ogólna dla uczestników Miejsko Gminnego Ośrodka
      Kultury w Zawichoście
    </p>
    <p :class="isAccessibilityMode ? 'text-lg mb-4' : 'mb-4'">
      Zgodnie z art. 13 ust. 1 Rozporządzenia Parlamentu Europejskiego i Rady
      (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych
      w związku z przetwarzaniem danych osobowych i w sprawie swobodnego
      przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne
      rozporządzenie o ochronie danych) (Dz. U. UE L 119 z dnia 04.05.2016 r.),
      zwanego dalej „RODO” informuje się uczestników Miejsko Gminnego Ośrodka
      Kultury w Zawichoście, że:
    </p>

    <!-- RODO Information List -->
    <ul
      :class="isAccessibilityMode ? 'list-disc ml-6 text-lg' : 'list-disc ml-6'"
    >
      <li :class="isAccessibilityMode ? 'mb-4' : 'mb-2'">
        Administratorem zbieranych i przetwarzanych przez Miejsko Gminny Ośrodek
        Kultury w Zawichoście danych osobowych uczestników jest Kierownik
        Miejsko Gminnego Ośrodka Kultury. Adres Miejsko Gminnego Ośrodka
        Kultury: Zawichost ul. Żeromskiego 33, 27-630 Zawichost, tel. (15) 836
        41 64.
      </li>
      <li :class="isAccessibilityMode ? 'mb-4' : 'mb-2'">
        Funkcję Inspektora Ochrony Danych pełni Dawid Dziuba, e-mail:
        dawid.dziuba2@gmail.com
      </li>
      <li :class="isAccessibilityMode ? 'mb-4' : 'mb-2'">
        Dane osobowe uczestników zbierane i przetwarzane są w celu możliwości
        wykonywania przez Miejsko Gminny Ośrodek Kultury ustawowych zadań,
        określonych min. Ustawie z dnia 25 października 1991 r. o organizowaniu
        i prowadzeniu działalności kulturalnej oraz w innych regulacjach.
      </li>
      <li :class="isAccessibilityMode ? 'mb-4' : 'mb-2'">
        Pozyskane od uczestników dane osobowe nie będą udostępniane podmiotom
        innym, niż upoważnione na podstawie przepisów prawa.
      </li>
      <li :class="isAccessibilityMode ? 'mb-4' : 'mb-2'">
        Dane osobowe od momentu pozyskania będą przechowywane przez okres
        wynikający z wewnętrznych regulacji.
      </li>
      <li :class="isAccessibilityMode ? 'mb-4' : 'mb-2'">
        Uczestnicy Ośrodka Kultury mają prawo dostępu do swoich danych osobowych
        oraz możliwość ich sprostowania, usunięcia lub ograniczenia
        przetwarzania oraz prawo do wniesienia sprzeciwu wobec przetwarzania.
      </li>
      <li :class="isAccessibilityMode ? 'mb-4' : 'mb-2'">
        Jeżeli przetwarzanie danych odbywa się na podstawie zgody na
        przetwarzanie, uczestnicy mają prawo do cofnięcia zgody na przetwarzanie
        ich danych osobowych w dowolnym momencie, bez wpływu na zgodność z
        prawem przetwarzania, którego dokonano na podstawie zgody przed jej
        cofnięciem.
      </li>
      <li :class="isAccessibilityMode ? 'mb-4' : 'mb-2'">
        Uczestnicy mają prawo wniesienia skargi do organu nadzorczego (Urzędu
        Ochrony Danych Osobowych).
      </li>
      <li :class="isAccessibilityMode ? 'mb-4' : 'mb-2'">
        W większości przypadków przetwarzanie danych osobowych wynika z
        przepisów prawa, a ich podawanie przez uczestnika jest obowiązkowe. W
        sytuacji dobrowolności podawania danych osobowych uczestnicy zostaną o
        tym fakcie poinformowani.
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAccessibilityStore } from "~/stores/accessibility";

const accessibilityStore = useAccessibilityStore();
const isAccessibilityMode = computed(
  () => accessibilityStore.isAccessibilityMode
);

useHead({
  title: "RODO - M-GOK Zawichost",
  meta: [
    {
      name: "description",
      content:
        "Informacje dotyczące przetwarzania danych osobowych uczestników Miejsko Gminnego Ośrodka Kultury w Zawichoście.",
    },
    {
      property: "og:title",
      content: "RODO - M-GOK Zawichost",
    },
    {
      property: "og:description",
      content:
        "Dowiedz się więcej o zasadach przetwarzania danych osobowych w Miejsko Gminnym Ośrodku Kultury w Zawichoście.",
    },
  ],
});
</script>
