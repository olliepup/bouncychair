<template>
  <div class="mx-auto min-w-min">
    <header>
      <img class="w-96 mx-auto" src="/logo.png" />
    </header>

    <main class="mx-auto w-min space-y-4 py-4">
      <div class="mx-auto w-min h-min">
        <Preview />
      </div>

      <div class="mx-auto flex content-center w-max space-x-1 my-4">
        <ToggleCssButton />

        <CopyCssToClipboardButton />

        <ToggleGlobalSettingsButton />
      </div>

      <GlobalSettings v-show="showGlobalSettings" />

      <Avatars />
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Avatars from "./modules/avatar/Avatars.vue";
import GlobalSettings from "./modules/global/GlobalSettings.vue";
import CopyCssToClipboardButton from "./modules/preview/CopyCssToClipboardButton.vue";
import Preview from "./modules/preview/Preview.vue";
import ToggleCssButton from "./modules/ui/ToggleCssButton.vue";
import ToggleGlobalSettingsButton from "./modules/ui/ToggleGlobalSettingsButton.vue";
import { useStore } from "./store";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    Avatars,
    Preview,
    CopyCssToClipboardButton,
    ToggleCssButton,
    ToggleGlobalSettingsButton,
    GlobalSettings,
    // Avatar,
  },
  setup() {
    const { state } = useStore();

    const showGlobalSettings = computed(() => state.ui.showGlobalSettings);

    return {
      showGlobalSettings,
    };
  },
});
</script>

<style>
main {
  /* height: calc(1080px * 0.6); */
  /* width: calc(1920px * 0.6); */
}
</style>
