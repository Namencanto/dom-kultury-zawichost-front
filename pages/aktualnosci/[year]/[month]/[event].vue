<template>
  <article
    :class="[
      'max-w-4xl mx-auto py-6 px-4 lg:px-8',
      isAccessibilityMode
        ? 'bg-black border-4 border-yellow-300 text-yellow-300'
        : 'bg-white text-gray-900',
    ]"
  >
    <div v-if="doc">
      <!-- Header -->
      <header class="mb-12">
        <div class="relative">
          <img
            v-if="doc.thumbnail"
            :src="doc.thumbnail"
            :alt="doc.title"
            :class="[
              'w-full h-[400px] lg:h-[500px] object-cover cursor-pointer transition-transform duration-500 hover:scale-105',
              isAccessibilityMode ? 'border-b-4 border-yellow-300' : '',
            ]"
            @click="openModalWithImage(doc.thumbnail)"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <h2
              :class="[
                'text-4xl lg:text-5xl font-extrabold text-center leading-tight',
                isAccessibilityMode ? 'text-yellow-300' : 'text-white',
              ]"
            >
              {{ doc.title }}
            </h2>
          </div>
        </div>
      </header>

      <!-- Publication and Event Dates -->
      <div
        :class="[
          'flex justify-start gap-4 mb-6 text-sm',
          isAccessibilityMode ? 'text-yellow-300' : 'text-gray-600',
        ]"
      >
        <p>
          <span class="font-semibold">Data publikacji:</span>
          {{ formatDate(doc.publishDate) }}
        </p>
        <p v-if="doc.eventDate">
          <span class="font-semibold">Data wydarzenia:</span>
          {{ doc.eventDate ? formatDate(doc.eventDate) : "" }}
        </p>
      </div>

      <!-- Content -->
      <div
        :class="[
          'prose max-w-none text-lg leading-relaxed mb-12',
          isAccessibilityMode ? 'text-yellow-300' : 'text-gray-900',
        ]"
      >
        <div v-for="(block, index) in doc.content" :key="index" class="mb-10">
          <!-- Heading Level 1 -->
          <h3
            v-if="block.type === 'heading' && block.level === 1"
            :class="[
              'font-bold mb-6',
              isAccessibilityMode
                ? 'text-3xl lg:text-4xl text-yellow-300'
                : 'text-3xl lg:text-4xl text-gray-900',
            ]"
          >
            {{ block.text }}
          </h3>

          <!-- Paragraph -->
          <p
            v-if="block.type === 'paragraph'"
            :class="[
              'text-base leading-7 mb-6',
              isAccessibilityMode ? 'text-yellow-300' : 'text-gray-900',
            ]"
          >
            {{ block.text }}
          </p>

          <!-- Blockquote -->
          <blockquote
            v-if="block.type === 'blockquote'"
            :class="[
              'border-l-4 pl-4 italic font-light bg-gray-100 py-4 px-6 mb-8',
              isAccessibilityMode
                ? 'text-yellow-300 border-yellow-300 bg-black'
                : 'text-gray-600',
            ]"
          >
            {{ block.text }}
          </blockquote>

          <!-- List -->
          <ul
            v-if="block.type === 'list'"
            :class="[
              'list-disc list-inside mb-6',
              isAccessibilityMode ? 'text-yellow-300' : 'text-gray-900',
            ]"
          >
            <li v-for="(item, index) in block.items" :key="index">
              {{ item }}
            </li>
          </ul>

          <!-- Link -->
          <a
            v-if="block.type === 'link'"
            :href="block.href"
            :class="[
              'underline mb-6 block',
              isAccessibilityMode
                ? 'text-yellow-300 hover:text-white'
                : 'text-blue-600',
            ]"
            target="_blank"
          >
            {{ block.text }}
          </a>

          <!-- Image -->
          <img
            v-if="block.type === 'image'"
            :src="block.src"
            :alt="block.alt"
            :class="[
              'w-full h-auto rounded-lg my-8 transition-transform duration-500 hover:scale-105 cursor-pointer',
              isAccessibilityMode ? 'border-4 border-yellow-300' : '',
            ]"
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
          :alt="`Zdjęcie ${index + 1}`"
          :class="[
            'w-full h-56 object-cover rounded-lg cursor-pointer transition-transform duration-500 hover:scale-105',
            isAccessibilityMode ? 'border-4 border-yellow-300' : '',
          ]"
          @click="openModalWithGallery(index)"
        />
      </div>
    </div>

    <!-- Fullscreen Image Modal -->
    <VueFinalModal
      v-model="isModalOpen"
      :overlay-click-close="true"
      :esc-press-close="true"
      class="vfm--fullscreen vfm--fade flex items-center justify-center"
    >
      <div class="relative flex items-center justify-center w-full h-full">
        <button
          type="button"
          @click="closeModal"
          class="absolute top-6 right-6 text-white text-3xl font-bold"
        >
          &times;
        </button>

        <img
          :src="currentImage"
          alt="Fullscreen Image"
          class="min-w-[50vw] min-h-[45vh] max-w-[90vw] max-h-[85vh] object-contain"
        />
      </div>
    </VueFinalModal>
  </article>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { format, isValid } from "date-fns";
import { pl } from "date-fns/locale";
import { VueFinalModal } from "vue-final-modal";
import { useAccessibilityStore } from "~/stores/accessibility";

const accessibilityStore = useAccessibilityStore();
const isAccessibilityMode = computed(
  () => accessibilityStore.isAccessibilityMode
);

const isModalOpen = ref(false);
const modalImageIndex = ref(0);
const galleryImages = ref<string[]>([]);
const route = useRoute();

const year = route.params.year;
const month = route.params.month;
const event = route.params.event;
const formattedSlug = computed(
  () => `/aktualnosci/${year}/${month}/${event.toLowerCase()}`
);
const doc = ref<any>(null);

onMounted(async () => {
  const data = await queryContent(formattedSlug.value).findOne();
  if (data) {
    doc.value = data;
  } else {
    console.error("Content not found");
  }
});

const formatDate = (date: string) => {
  if (isValid(new Date(date))) {
    return format(date, "dd MMMM yyyy", { locale: pl });
  }
  return "Nieznana data";
};
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

const currentImage = computed(() => galleryImages.value[modalImageIndex.value]);

useHead({
  title: computed(() => "Aktualności: " + (doc.value?.title || "Wydarzenie")),
  meta: [
    { property: "og:title", content: doc.value?.title || "Wydarzenie" },
    {
      property: "og:description",
      content: doc.value?.description || "Opis wydarzenia",
    },
    {
      property: "og:image",
      content: doc.value?.thumbnail || "/default-og-image.jpg",
    },
  ],
});
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
