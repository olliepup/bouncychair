<template>
  <button @click.prevent="toggleShowGlobalSettings">
    {{
      showGlobalSettings
        ? "Hide Global Settings"
        : "Show Global Settings (advanced)"
    }}
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "ToggleGlobalSettingsButton",
  setup: () => {
    const { state, commit } = useStore();

    const showGlobalSettings = computed(() => state.ui.showGlobalSettings);

    const toggleShowGlobalSettings = () => commit("toggleShowGlobalSettings");

    return {
      showGlobalSettings,
      toggleShowGlobalSettings,
    };
  },
});
</script>

<style scoped></style>
