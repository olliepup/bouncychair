<template>
  <button @click.prevent="toggleShowCss">
    {{ showCss ? "Show Desktop" : "Show CSS" }}
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "ToggleCssButton",
  setup: () => {
    const { state, commit } = useStore();

    const showCss = computed(() => state.ui.showCss);

    const toggleShowCss = () => commit("toggleShowCss");

    return {
      showCss,
      toggleShowCss,
    };
  },
});
</script>

<style scoped></style>
