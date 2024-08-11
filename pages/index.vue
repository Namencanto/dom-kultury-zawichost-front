<template>
  <LatestNews />
  <!-- <div class="content-container">
    <ContentDoc path="/aktualnosci/aktualnosc_1" />
  </div> -->
</template>
<script lang="ts" setup>
import LatestNews from "~/components/LatestNews.vue";
</script>

<style scoped>
.content-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.content-container :deep(h1),
.content-container :deep(h2),
.content-container :deep(h3) {
  color: #333;
  margin-bottom: 16px;
}

.content-container :deep(p) {
  line-height: 1.6;
  margin-bottom: 16px;
  color: #555;
}

.content-container :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 20px;
}

.content-container :deep(a) {
  color: #3498db;
  text-decoration: none;
}

.content-container :deep(a:hover) {
  text-decoration: underline;
}
</style>
