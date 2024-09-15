<template>
  <nav
    :class="
      isAccessibilityMode
        ? 'bg-black text-yellow-300 max-w-7xl mx-auto py-10 px-4'
        : 'bg-white max-w-7xl mx-auto py-10 px-4'
    "
    aria-label="Aktualności"
  >
    <h2
      :class="
        isAccessibilityMode
          ? 'text-4xl font-extrabold text-yellow-300 mb-8 text-center'
          : 'text-4xl font-semibold text-gray-900 mb-8 text-center'
      "
    >
      Aktualności
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div
        :class="
          isAccessibilityMode
            ? 'lg:col-span-2 bg-black border-4 border-yellow-300 shadow-md rounded-lg overflow-hidden'
            : 'lg:col-span-2 bg-white shadow-md rounded-lg overflow-hidden'
        "
      >
        <ContentList path="/aktualnosci" v-slot="{ list }">
          <div v-if="list.length > 0">
            <div
              v-for="article in [sortedArticles(list)[0]]"
              :key="article._path"
            >
              <nuxt-img
                :src="article.thumbnail"
                :alt="article.title"
                :class="
                  isAccessibilityMode
                    ? 'w-full h-64 object-cover border-b-4 border-yellow-300'
                    : 'w-full h-64 object-cover'
                "
              />
              <div
                :class="
                  isAccessibilityMode ? 'p-6 bg-black text-yellow-300' : 'p-6'
                "
              >
                <h3
                  :class="
                    isAccessibilityMode
                      ? 'text-xl font-bold mb-2 text-yellow-300'
                      : 'text-xl font-bold mb-2 text-gray-800'
                  "
                >
                  <NuxtLink :to="article._path" class="hover:underline">{{
                    article.title
                  }}</NuxtLink>
                </h3>
                <h4
                  v-if="getSectionHeading(article.content)"
                  :class="
                    isAccessibilityMode
                      ? 'text-sm font-semibold text-yellow-300 uppercase mb-2 tracking-wide'
                      : 'text-sm font-semibold text-gray-500 uppercase mb-2 tracking-wide'
                  "
                >
                  {{ getSectionHeading(article.content) }}
                </h4>

                <p
                  :class="
                    isAccessibilityMode
                      ? 'text-yellow-300 mb-2'
                      : 'text-gray-600 mb-2'
                  "
                >
                  <span class="font-semibold">Data publikacji:</span>
                  {{ formatDate(article.publishDate) }}
                </p>
                <p
                  :class="
                    isAccessibilityMode
                      ? 'text-yellow-300 mb-4'
                      : 'text-gray-600 mb-4'
                  "
                >
                  <span class="font-semibold">Data wydarzenia:</span>
                  {{ formatDate(article.eventDate) }}
                </p>
                <p
                  :class="
                    isAccessibilityMode ? 'text-yellow-300' : 'text-gray-700'
                  "
                >
                  {{ truncateContent(getFirstParagraph(article.content), 500) }}
                </p>
              </div>
            </div>
          </div>
        </ContentList>
      </div>

      <!-- Facebook Widget -->
      <div
        :class="
          isAccessibilityMode
            ? 'bg-black border-4 border-yellow-300 shadow-md rounded-lg p-6 text-yellow-300'
            : 'bg-gray-50 shadow-md rounded-lg p-6'
        "
      >
        <FacebookWidget />
      </div>
    </div>

    <!-- Additional Articles -->
    <ContentList path="/aktualnosci" v-slot="{ list }">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="article in sortedArticles(list).slice(1)"
          :key="article._path"
          :class="
            isAccessibilityMode
              ? 'bg-black border-4 border-yellow-300 shadow-md rounded-lg overflow-hidden'
              : 'bg-white shadow-md rounded-lg overflow-hidden'
          "
        >
          <nuxt-img
            :src="article.thumbnail"
            :alt="article.title"
            :class="
              isAccessibilityMode
                ? 'w-full h-48 object-cover border-b-4 border-yellow-300 rounded-t-lg'
                : 'w-full h-48 object-cover rounded-t-lg'
            "
          />
          <div
            :class="
              isAccessibilityMode ? 'p-4 bg-black text-yellow-300' : 'p-4'
            "
          >
            <h2
              :class="
                isAccessibilityMode
                  ? 'text-lg font-bold text-yellow-300 mb-1'
                  : 'text-lg font-bold text-gray-800 mb-1'
              "
            >
              <NuxtLink :to="article._path" class="hover:underline">{{
                article.title
              }}</NuxtLink>
            </h2>
            <h3
              v-if="getSectionHeading(article.content)"
              :class="
                isAccessibilityMode
                  ? 'text-xs font-semibold text-yellow-300 uppercase mb-2 tracking-wide'
                  : 'text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wide'
              "
            >
              {{ getSectionHeading(article.content) }}
            </h3>
            <p
              :class="
                isAccessibilityMode
                  ? 'text-yellow-300 text-sm mb-1'
                  : 'text-gray-600 text-sm mb-1'
              "
            >
              <span class="font-semibold">Data publikacji:</span>
              {{ formatDate(article.publishDate) }}
            </p>
            <p
              :class="
                isAccessibilityMode
                  ? 'text-yellow-300 text-sm mb-2'
                  : 'text-gray-600 text-sm mb-2'
              "
            >
              <span class="font-semibold">Data wydarzenia:</span>
              {{ formatDate(article.eventDate) }}
            </p>
            <p
              :class="
                isAccessibilityMode
                  ? 'text-yellow-300 text-sm'
                  : 'text-gray-700 text-sm'
              "
            >
              {{ truncateContent(getFirstParagraph(article.content), 100) }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-center">
        <span
          :class="
            isAccessibilityMode
              ? 'px-6 py-3 text-lg font-extrabold text-yellow-300 border border-yellow-300 rounded-lg hover:bg-white hover:text-black transition-colors'
              : 'px-6 py-3 text-lg font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors'
          "
        >
          <NuxtLink
            to="/aktualnosci"
            :class="
              isAccessibilityMode
                ? 'text-yellow-300 hover:text-black'
                : 'text-gray-700'
            "
          >
            Więcej aktualności
          </NuxtLink>
        </span>
      </div>
    </ContentList>
  </nav>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import FacebookWidget from "@/components/FacebookWidget.vue";
import { Event, ContentBlock } from "@/types/events";
import { useAccessibilityStore } from "~/stores/accessibility";

const accessibilityStore = useAccessibilityStore();
const isAccessibilityMode = computed(
  () => accessibilityStore.isAccessibilityMode
);

const sortedArticles = (list: Event[]): Event[] => {
  return list
    .filter((article) => isValidDate(article.publishDate))
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    .slice(0, 10);
};

const formatDate = (date: string): string => {
  return format(new Date(date), "dd.MM.yyyy", { locale: pl });
};

const isValidDate = (date: string): boolean => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};

const getFirstParagraph = (content: ContentBlock[]): string => {
  const paragraph = content.find((item) => item.type === "paragraph");
  return paragraph ? paragraph.text || "" : "";
};

const truncateContent = (text: string, length: number): string => {
  if (text.length <= length) return text;
  const truncated = text.slice(0, length).trim();
  return truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
};

const getSectionHeading = (content: ContentBlock[]): string | null => {
  const heading = content.find(
    (block) => block.type === "heading" && block.level === 3
  );
  return heading ? heading.text || null : null;
};
</script>
