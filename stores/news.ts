// stores/newsStore.ts
import { defineStore } from "pinia";
import newsData from "~/public/news.json";
import { NewsItem } from "~/types/news";

export const useNewsStore = defineStore("news", {
  state: () => ({
    news: [] as NewsItem[],
  }),
  actions: {
    loadNews() {
      if (this.news.length === 0) {
        this.news = newsData.slice().reverse();
      }
    },
  },
});
