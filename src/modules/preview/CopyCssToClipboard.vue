<template>
  <button @click.prevent="copyToClipboard">Copy to Clipboard</button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "CopyCssToClipboard",
  setup: () => {
    const { getters } = useStore();

    const css = computed(() => getters.css);

    const copyCssToClipboard = async () => {
      const permission = await navigator.permissions.query({
        name: "clipboard-write",
      });

      if (permission.state === "granted" || permission.state === "prompt") {
        navigator.clipboard.writeText(css.value);
      }
    };

    return {
      copyCssToClipboard,
    };
  },
});
</script>

<style scoped></style>
