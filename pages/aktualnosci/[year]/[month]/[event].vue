<template>
  <article class="max-w-4xl mx-auto py-6 px-4 lg:px-8 bg-white">
    <ContentDoc :path="formattedSlug" v-slot="{ doc }">
      <!-- Header -->
      <header class="mb-12">
        <div class="relative">
          <img
            v-if="doc.thumbnail"
            :src="doc.thumbnail"
            :alt="doc.title"
            class="w-full h-[400px] lg:h-[500px] object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
            @click="openModalWithImage(doc.thumbnail)"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <h1
              class="text-4xl lg:text-5xl font-extrabold text-white text-center leading-tight"
            >
              {{ doc.title }}
            </h1>
          </div>
        </div>
      </header>

      <!-- Publication and Event Dates -->
      <div class="flex justify-start gap-4 mb-6 text-sm text-gray-600">
        <p>
          <span class="font-semibold">Data publikacji:</span>
          {{ formatDate(doc.publishDate) }}
        </p>
        <p>
          <span class="font-semibold">Data wydarzenia:</span>
          {{ formatDate(doc.eventDate) }}
        </p>
      </div>

      <!-- Content -->
      <div class="prose max-w-none text-lg text-gray-900 leading-relaxed mb-12">
        <div v-for="(block, index) in doc.content" :key="index" class="mb-10">
          <h1
            v-if="block.type === 'heading' && block.level === 1"
            class="text-3xl lg:text-4xl font-bold mb-6"
          >
            {{ block.text }}
          </h1>
          <h2
            v-if="block.type === 'heading' && block.level === 2"
            class="text-2xl font-semibold mb-4"
          >
            {{ block.text }}
          </h2>
          <h3
            v-if="block.type === 'heading' && block.level === 3"
            class="text-xl font-semibold mb-3"
          >
            {{ block.text }}
          </h3>
          <p v-if="block.type === 'paragraph'" class="text-base leading-7 mb-6">
            {{ block.text }}
          </p>
          <blockquote
            v-if="block.type === 'blockquote'"
            class="border-l-4 pl-4 text-gray-600 italic font-light bg-gray-100 py-4 px-6 mb-8"
          >
            {{ block.text }}
          </blockquote>
          <ul v-if="block.type === 'list'" class="list-disc list-inside mb-6">
            <li v-for="(item, index) in block.items" :key="index">
              {{ item }}
            </li>
          </ul>
          <a
            v-if="block.type === 'link'"
            :href="block.href"
            class="text-blue-600 underline mb-6 block"
            target="_blank"
          >
            {{ block.text }}
          </a>
          <img
            v-if="block.type === 'image'"
            :src="block.src"
            :alt="block.alt"
            class="w-full h-auto rounded-lg my-8 transition-transform duration-500 hover:scale-105 cursor-pointer"
            @click="openModalWithImage(block.src)"
          />
        </div>
      </div>

      <!-- Image Gallery -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <img
          v-for="(image, index) in doc.images"
          :key="index"
          :src="image"
          :alt="`Image ${index + 1}`"
          class="w-full h-56 object-cover rounded-lg cursor-pointer transition-transform duration-500 hover:scale-105"
          @click="openModalWithGallery(index)"
        />
      </div>
    </ContentDoc>

    <!-- Fullscreen Image Modal -->
    <VueFinalModal
      v-model="isModalOpen"
      :overlay-click-close="true"
      :esc-press-close="true"
      class="vfm--fullscreen vfm--fade flex items-center justify-center"
    >
      <div class="relative flex items-center justify-center w-full h-full">
        <button
          @click="closeModal"
          class="absolute top-6 right-6 text-white text-3xl font-bold"
        >
          &times;
        </button>

        <img
          :src="currentImage"
          alt="Fullscreen Image"
          class="max-w-[90vw] max-h-[85vh] object-contain"
        />
      </div>
    </VueFinalModal>
  </article>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { VueFinalModal } from "vue-final-modal";

export default {
  components: {
    VueFinalModal,
  },
  setup() {
    const route = useRoute();
    const year = route.params.year;
    const month = route.params.month;
    const event = route.params.event;

    const formattedSlug = computed(
      () => `/aktualnosci/${year}/${month}/${event.toLowerCase()}`
    );

    const formatDate = (date: string) =>
      format(new Date(date), "dd MMMM yyyy", { locale: pl });

    // Modal state and image gallery logic
    const isModalOpen = ref(false);
    const modalImageIndex = ref(0);
    const galleryImages = ref<string[]>([]);

    const openModalWithImage = (imageSrc: string) => {
      galleryImages.value = [imageSrc];
      modalImageIndex.value = 0;
      isModalOpen.value = true;
    };

    const openModalWithGallery = (index: number) => {
      galleryImages.value = [...doc.value.images];
      modalImageIndex.value = index;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const currentImage = computed(
      () => galleryImages.value[modalImageIndex.value]
    );

    return {
      formattedSlug,
      formatDate,
      isModalOpen,
      currentImage,
      openModalWithImage,
      openModalWithGallery,
      closeModal,
    };
  },
};
</script>

<style scoped>
.vfm--fullscreen img {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
}

.vfm--fullscreen button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
