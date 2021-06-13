<template>
  <div>
    <div class="iframeContainer" v-show="!showCss">
      <iframe :srcdoc="preview" width="1920" height="1080" class="rounded" />
    </div>

    <pre
      class="
        iframeContainer
        text-left
        bg-purple-200
        rounded
        overflow-y-scroll
        p-4
      "
      v-show="showCss"
      >{{ css }}</pre
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "Preview",
  setup: () => {
    const { state, getters } = useStore();

    const css = computed(() => getters.css);
    const preview = computed(() => getters.previewHtml);

    const showCss = computed(() => state.ui.showCss);

    return {
      css,
      preview,
      showCss,
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
