<template>
  <div>
    <div class="iframeContainer" v-show="!showCss">
      <iframe :srcdoc="preview" width="1920" height="1080" class="rounded" />
    </div>

    <pre
      class="iframeContainer text-left bg-purple-200 rounded overflow-y-scroll"
      v-show="showCss"
    >
      {{ css }}
    </pre>

    <div class="mx-auto flex content-center w-max space-x-1 my-4">
      <button @click.prevent="toggleCss">
        {{ showCss ? "Preview Overlay" : "View CSS" }}
      </button>
      <button @click.prevent="copyCssToClipboard">Copy CSS to Clipboard</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../../store";
import { buildPreviewHtml } from "../preview/buildHtml";
import { buildCss } from "./buildCss";

export default defineComponent({
  name: "Preview",
  setup: () => {
    const { state, getters } = useStore();

    const showCss = ref(false);

    const css = computed(() => getters.css);
    const preview = computed(() => getters.previewHtml);

    // const allAvatars = computed(() =>
    //   state.avatar.avatarIds.map((r) => state.avatar.avatarsById[r])
    // );

    // const preview = computed(() =>
    //   buildPreviewHtml(state.global, allAvatars.value)
    // );

    // const css = computed(() => buildCss(state.global, allAvatars.value));

    const toggleCss = () => (showCss.value = !showCss.value);

    const copyCssToClipboard = async () => {
      const permission = await navigator.permissions.query({
        name: "clipboard-write",
      });

      if (permission.state === "granted" || permission.state === "prompt") {
        navigator.clipboard.writeText(css.value);
      }
    };

    return {
      css,
      preview,
      showCss,
      toggleCss,
      copyCssToClipboard,
    };
  },
});
</script>

<style scoped>
.iframeContainer {
  height: calc(1080px * 0.6);
  width: calc(1920px * 0.6);
}

iframe {
  /* border-radius: 4px;
  border: 0; */
  transform: scale(60%);
  transform-origin: top left;
}
</style>
