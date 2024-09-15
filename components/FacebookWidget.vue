<template>
  <div class="facebook-widget-container">
    <div
      class="fb-page"
      data-href="https://www.facebook.com/mgokzawichost"
      data-tabs="timeline"
      data-width="400"
      data-height="500"
      data-small-header="false"
      data-adapt-container-width="true"
      data-hide-cover="false"
      data-show-facepile="true"
    >
      <blockquote
        cite="https://www.facebook.com/mgokzawichost"
        class="fb-xfbml-parse-ignore"
      >
        <a href="https://www.facebook.com/mgokzawichost">Facebook Page Name</a>
      </blockquote>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

interface FacebookSDK {
  init: (config: { xfbml: boolean; version: string }) => void;
  XFBML: {
    parse: () => void;
  };
}

declare global {
  interface Window {
    FB?: FacebookSDK;
  }
}

onMounted(() => {
  if (!window.FB) {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src =
        "https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v17.0";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  window.fbAsyncInit = function () {
    if (window.FB) {
      window.FB.init({
        xfbml: true,
        version: "v17.0",
      });
    }
  };

  if (window.FB) {
    window.FB.XFBML.parse();
  }
});
</script>

<style scoped>
.facebook-widget-container {
  max-width: 100%;
  overflow: auto;
}

.fb-page {
  width: 100% !important;
}
</style>
