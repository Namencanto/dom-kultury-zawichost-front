import { defineStore } from "pinia";

export const useAccessibilityStore = defineStore("accessibility", {
  state: () => ({
    isAccessibilityMode: false,
  }),
  actions: {
    toggleAccessibilityMode() {
      this.isAccessibilityMode = !this.isAccessibilityMode;

      const body = document.documentElement;

      if (this.isAccessibilityMode) {
        body.classList.add(
          "high-contrast",
          "large-font",
          "underline-links",
          "highlight-buttons"
        );
      } else {
        body.classList.remove(
          "high-contrast",
          "large-font",
          "underline-links",
          "highlight-buttons"
        );
      }
    },
  },
});
