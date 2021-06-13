<template>
  <article
    class="text-left max-w rounded overflow-hidden shadow-lg bg-purple-200 p-4"
  >
    <h1 class="text-xl mb-2">Global Settings</h1>

    <h2 class="text-l mb-2">For nerds only!</h2>

    <div class="grid grid-cols-1 gap-6 text-left">
      <label>
        Avatar Width
        <input
          type="text"
          placeholder="250px"
          :value="globalSettings.avatarWidth"
          @change.prevent="setAvatarWidth($event)"
        />
      </label>

      <label>
        Avatar Overscan
        <input
          type="text"
          placeholder="10px"
          :value="globalSettings.avatarOverscan"
          @change.prevent="setAvatarOverscan($event)"
        />
      </label>

      <label>
        Avatar Bounce
        <input
          type="text"
          placeholder="10px"
          :value="globalSettings.avatarBounce"
          @change.prevent="setAvatarBounce($event)"
        />
      </label>

      <!-- TODO: Add warning if bounce and overscan don't match -->

      <label>
        Avatar Enthusiasm
        <input
          type="text"
          placeholder="1s"
          :value="globalSettings.avatarEnthusiasm"
          @change.prevent="setAvatarEnthusiasm($event)"
        />
      </label>

      <label>
        Avatar Idle Brightness
        <input
          type="text"
          placeholder="75%"
          :value="globalSettings.avatarIdleBrightness"
          @change.prevent="setAvatarIdleBrightness($event)"
        />
      </label>

      <label>
        Avatar Separation
        <input
          type="text"
          placeholder="0"
          :value="globalSettings.avatarSeparation"
          @change.prevent="setAvatarSeparation($event)"
        />
      </label>

      <button @click="resetGlobalSettings">Reset to Defaults</button>
    </div>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "GlobalSettings",
  setup: () => {
    const { commit, state } = useStore();

    const globalSettings = computed(() => state.global);

    const setAvatarWidth = (event: Event) =>
      commit("setAvatarWidth", (<HTMLInputElement>event.target).value);

    const setAvatarOverscan = (event: Event) =>
      commit("setAvatarOverscan", (<HTMLInputElement>event.target).value);

    const setAvatarBounce = (event: Event) =>
      commit("setAvatarBounce", (<HTMLInputElement>event.target).value);

    const setAvatarEnthusiasm = (event: Event) =>
      commit("setAvatarEnthusiasm", (<HTMLInputElement>event.target).value);

    const setAvatarIdleBrightness = (event: Event) =>
      commit("setAvatarIdleBrightness", (<HTMLInputElement>event.target).value);

    const setAvatarSeparation = (event: Event) =>
      commit("setAvatarSeparation", (<HTMLInputElement>event.target).value);

    const resetGlobalSettings = () => commit("resetGlobalSettings");

    return {
      globalSettings,
      setAvatarWidth,
      setAvatarOverscan,
      setAvatarBounce,
      setAvatarEnthusiasm,
      setAvatarIdleBrightness,
      setAvatarSeparation,
      resetGlobalSettings,
    };
  },
});
</script>

<style scoped></style>
