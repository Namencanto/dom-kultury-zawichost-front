<template>
  <nav
    :class="
      isAccessibilityMode
        ? 'bg-black text-yellow-300 max-w-7xl mx-auto py-10 px-4'
        : 'bg-white max-w-7xl mx-auto py-10 px-4'
    "
    aria-label="Aktualności"
  >
    <!-- Heading -->
    <h2
      :class="
        isAccessibilityMode
          ? 'text-4xl font-extrabold text-yellow-300 mb-8 text-left font-ubuntu'
          : 'text-4xl font-light text-[#4a4a4a] mb-8 text-left font-ubuntu pl-4'
      "
    >
      AKTUALNOŚCI
    </h2>

    <!-- Main Article and Facebook Widget in Flexbox Layout -->
    <div class="flex flex-col-reverse lg:flex-row lg:gap-4 gap-6 mb-8">
      <!-- Main Article (2/3 width on large screens) -->
      <div class="w-full lg:w-2/3 lg:flex lg:items-stretch">
        <ContentList path="/aktualnosci" v-slot="{ list }">
          <div v-if="list.length > 0" class="w-full">
            <div
              v-for="article in [sortedArticles(list)[0]]"
              :key="article._path"
              :class="[
                'relative group h-full shadow-lg rounded-lg overflow-hidden bg-cover bg-center',
                isAccessibilityMode
                  ? 'bg-black border-4 border-yellow-300'
                  : '',
              ]"
              :style="{ backgroundImage: `url(${article.thumbnail})` }"
            >
              <NuxtLink :to="article._path" class="block h-full w-full group">
                <!-- Right side box with content -->
                <div
                  class="absolute top-4 right-4 bg-opacity-90 p-4 text-right max-w-sm"
                  :class="
                    isAccessibilityMode
                      ? 'text-yellow-300 bg-black'
                      : 'text-gray-800 bg-white'
                  "
                >
                  <h3
                    :class="[
                      'text-lg font-ubuntu font-medium mb-2 transition-all duration-300 group-hover:underline',
                      isAccessibilityMode
                        ? 'text-yellow-300'
                        : 'text-[#4a4a4a]',
                    ]"
                  >
                    {{ article.title }}
                  </h3>

                  <p
                    :class="[
                      'mb-2 font-ubuntu font-normal',
                      isAccessibilityMode
                        ? 'text-yellow-300'
                        : 'text-[#757575]',
                    ]"
                  >
                    {{ formatDate(article.publishDate) }}
                  </p>

                  <p
                    v-if="article.eventDate"
                    :class="[
                      'mb-2 font-ubuntu font-normal',
                      isAccessibilityMode
                        ? 'text-yellow-300'
                        : 'text-[#4a4a4a]',
                    ]"
                  >
                    {{ formatDate(article.eventDate) }}
                  </p>

                  <p
                    :class="[
                      'font-ubuntu font-normal',
                      isAccessibilityMode
                        ? 'text-yellow-300'
                        : 'text-[#4a4a4a]',
                    ]"
                  >
                    {{
                      truncateContent(getFirstParagraph(article.content), 100)
                    }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </ContentList>
      </div>

      <!-- Facebook Widget (1/3 width on large screens) -->
      <div class="w-full lg:w-1/3 lg:flex lg:items-stretch">
        <div
          :class="
            isAccessibilityMode
              ? 'bg-black border-4 border-yellow-300 shadow-lg rounded-lg p-6 text-yellow-300'
              : 'bg-gray-50 shadow-lg rounded-lg p-6'
          "
          class="flex-grow"
        >
          <FacebookWidget />
        </div>
      </div>
    </div>

    <!-- Additional Articles -->
    <ContentList path="/aktualnosci" v-slot="{ list }">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(article, index) in sortedArticles(list)"
          :key="article._path"
          :class="[
            isAccessibilityMode
              ? 'group bg-black border-4 border-yellow-300 shadow-lg rounded-lg overflow-hidden'
              : 'group bg-white shadow-lg rounded-lg overflow-hidden',
            { 'lg:hidden': index === 0 },
          ]"
        >
          <NuxtLink :to="article._path" class="block">
            <img
              :src="article.thumbnail"
              :alt="article.title"
              :class="
                isAccessibilityMode
                  ? 'w-full h-48 object-cover border-b-4 border-yellow-300'
                  : 'w-full h-48 object-cover'
              "
            />
            <div
              :class="
                isAccessibilityMode ? 'p-4 bg-black text-yellow-300' : 'p-4'
              "
            >
              <h2
                :class="[
                  'text-xl font-medium mb-2 font-ubuntu',
                  isAccessibilityMode ? '' : 'group-hover:underline',
                ]"
              >
                {{ article.title }}
              </h2>
              <h3
                v-if="getSectionHeading(article.content)"
                :class="
                  isAccessibilityMode
                    ? 'text-xs font-semibold uppercase mb-2 tracking-wide font-ubuntu'
                    : 'text-xs font-semibold text-[#757575] uppercase mb-2 tracking-wide font-ubuntu'
                "
              >
                {{ getSectionHeading(article.content) }}
              </h3>
              <p
                :class="
                  isAccessibilityMode
                    ? 'text-sm mb-1 font-ubuntu'
                    : 'text-[#757575] text-sm mb-1 font-ubuntu'
                "
              >
                <span class="font-semibold font-ubuntu">Data publikacji:</span>
                {{ formatDate(article.publishDate) }}
              </p>
              <p
                v-if="article.eventDate"
                :class="
                  isAccessibilityMode
                    ? 'text-sm mb-2 font-ubuntu'
                    : 'text-[#757575] text-sm mb-2 font-ubuntu'
                "
              >
                <span class="font-semibold font-ubuntu">Data wydarzenia:</span>
                {{ formatDate(article.eventDate) }}
              </p>
              <p
                :class="
                  isAccessibilityMode
                    ? 'text-sm font-ubuntu'
                    : 'text-[#4a4a4a] text-sm font-ubuntu'
                "
              >
                {{ truncateContent(getFirstParagraph(article.content), 150) }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- More News Button -->
      <div class="mt-8 flex justify-center">
        <NuxtLink
          to="/aktualnosci"
          :class="
            isAccessibilityMode
              ? 'px-6 py-3 text-lg font-extrabold border-2 border-yellow-300 rounded-lg hover:bg-yellow-300 hover:text-black transition-colors duration-200 font-ubuntu'
              : 'px-6 py-3 text-lg font-medium text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-ubuntu'
          "
        >
          Więcej aktualności
        </NuxtLink>
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
  return date ? format(new Date(date), "dd.MM.yyyy", { locale: pl }) : "";
};

const isValidDate = (date: string): boolean => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};

const getFirstParagraph = (content: ContentBlock[]): string => {
  const paragraphs = content.filter((item) => item.type === "paragraph");
  if (paragraphs.length === 0) return "";
  let text = paragraphs[0].text || "";
  if (text.length < 80 && paragraphs.length > 1) {
    text += " " + (paragraphs[1].text || "");
  }
  return text;
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;700&display=swap");

.font-ubuntu {
  font-family: "Ubuntu", sans-serif;
}
</style>
