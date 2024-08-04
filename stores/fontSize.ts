import { defineStore } from "pinia";

export const useFontSizeStore = defineStore("fontSize", {
  state: () => ({
    fontSize: "normal",
  }),
  actions: {
    setFontSize(size: string) {
      switch (size) {
        case "normal":
          document.documentElement.style.fontSize = "16px";
          break;
        case "large":
          document.documentElement.style.fontSize = "18px";
          break;
        case "x-large":
          document.documentElement.style.fontSize = "20px";
          break;
        default:
          document.documentElement.style.fontSize = "16px";
      }
      this.fontSize = size;
    },
  },
});
