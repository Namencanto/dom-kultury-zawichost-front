<template>
  <article
    class="bg-white rounded-lg shadow-md overflow-hidden max-w-3xl mx-auto p-6"
  >
    <ContentDoc :path="formattedSlug" v-slot="{ doc }">
      <!-- Header -->
      <header class="relative mb-6">
        <img
          v-if="doc.thumbnail"
          :src="doc.thumbnail"
          :alt="doc.title"
          class="w-full h-80 object-cover object-center cursor-pointer transition-transform duration-300 hover:scale-105"
          @click="openModal(doc.thumbnail)"
        />
        <div
          class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h1 class="text-4xl font-bold text-white text-center drop-shadow-lg">
            {{ doc.title }}
          </h1>
        </div>
      </header>
      <!-- ./ Header -->

      <!-- Content -->
      <div class="prose prose-lg text-gray-800 mx-auto mb-6">
        <div class="text-center mb-4">
          <p class="text-gray-500 text-sm">
            <span class="font-semibold">Data publikacji:</span>
            {{ formatDate(doc.publishDate) }}
          </p>
          <p class="text-gray-500 text-sm">
            <span class="font-semibold">Data wydarzenia:</span>
            {{ formatDate(doc.eventDate) }}
          </p>
        </div>
        <ContentRenderer :value="doc" />
      </div>
      <!-- ./ Content -->

      <!-- Image Gallery -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <img
          v-for="image in doc.images"
          :key="image"
          :src="image"
          :alt="`Image ${image}`"
          class="w-full h-64 object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
          @click="openModal(image)"
        />
      </div>
      <!-- ./ Image Gallery -->
    </ContentDoc>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      @click="closeModal"
    >
      <img
        :src="modalImage"
        alt="Fullscreen Image"
        class="max-w-full max-h-full object-contain"
      />
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-white text-2xl font-bold"
      >
        &times;
      </button>
    </div>
    <!-- ./ Modal -->
  </article>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

export default {
  setup() {
    const route = useRoute();
    const year = route.params.year;
    const month = route.params.month;
    const event = route.params.event;

    // Konstrukcja ścieżki na podstawie parametrów URL
    const formattedSlug = computed(
      () => `/aktualnosci/${year}/${month}/${event.toLowerCase()}`
    );

    // Formatowanie dat
    const formatDate = (date: string) => {
      return format(new Date(date), "dd MMMM yyyy", { locale: pl });
    };

    // Modal state
    const isModalOpen = ref(false);
    const modalImage = ref("");

    const openModal = (imageSrc: string) => {
      modalImage.value = imageSrc;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      modalImage.value = "";
    };

    return {
      formattedSlug,
      formatDate,
      isModalOpen,
      modalImage,
      openModal,
      closeModal,
    };
  },
};
</script>

<style scoped>
/* Stylizacja modala */
.modal img {
  @apply max-w-full max-h-full object-contain;
}

.modal {
  @apply fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50;
}

.modal button {
  @apply absolute top-4 right-4 text-white text-2xl font-bold;
}

/* Stylizacja obrazów w galerii */
.grid img {
  @apply rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105;
}
</style>
