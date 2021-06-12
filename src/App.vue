<template>
  <header>
    <h1 class="text-xl">Bouncy Chair</h1>
  </header>

  <main class="mx-auto w-min">
    <div class="mx-auto w-min h-min">
      <Preview />
    </div>

    <div class="mx-auto w-min h-min">
      <!-- <ExportCss /> -->
    </div>

    <Avatars />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Avatars from "./modules/avatar/Avatars.vue";
import Avatar from "./modules/avatar/Avatar.vue";
import Preview from "./modules/preview/Preview.vue";
import ExportCss from "./modules/preview/CopyCssToClipboard.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    Avatars,
    Preview,
    ExportCss,
    // Avatar,
  },
});
</script>

<style>
main {
  /* height: calc(1080px * 0.6); */
  /* width: calc(1920px * 0.6); */
}
</style>
