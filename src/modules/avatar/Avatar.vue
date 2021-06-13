<template>
  <article
    class="text-left max-w rounded overflow-hidden shadow-lg bg-purple-200 p-4"
  >
    <h1 class="text-xl mb-2">Avatar {{ avatar.order }}</h1>

    <div class="grid grid-cols-1 gap-6 text-left">
      <label>
        Discord ID
        <input
          type="text"
          placeholder="123456789012345678"
          :value="avatar.discordId"
          @change.prevent="updateDiscordId($event)"
        />
      </label>

      <label>
        Idle Image URL
        <input
          type="text"
          placeholder="http://www.example.com/idle.png"
          :value="avatar.idleImageUrl"
          @change.prevent="updateIdleImageUrl($event)"
        />
      </label>

      <label>
        Speaking Image URL
        <input
          type="text"
          placeholder="http://www.example.com/speaking.png"
          :value="avatar.speakingImageUrl"
          @change.prevent="updateSpeakingImageUrl($event)"
        />
      </label>

      <button @click="removeAvatar">Remove</button>
    </div>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";
import { useStore } from "../../store";
import { Avatar } from "./avatarModule";

export default defineComponent({
  name: "Avatar",
  props: {
    id: { type: String, required: true },
  },
  setup: (props) => {
    const { id } = toRefs(props);
    const { commit, state } = useStore();

    const avatar = computed(() => state.avatar.avatarsById[id.value]);

    const updateAvatar = (changes: Partial<Avatar>) =>
      commit("updateAvatar", {
        id: id.value,
        changes,
      });

    const updateDiscordId = (event: Event) =>
      updateAvatar({
        discordId: (<HTMLInputElement>event.target).value,
      });

    const updateIdleImageUrl = (event: Event) =>
      updateAvatar({
        idleImageUrl: (<HTMLInputElement>event.target).value,
      });

    const updateSpeakingImageUrl = (event: Event) =>
      updateAvatar({
        speakingImageUrl: (<HTMLInputElement>event.target).value,
      });

    const removeAvatar = () => commit("removeAvatar", id.value);

    return {
      avatar,
      updateDiscordId,
      updateIdleImageUrl,
      updateSpeakingImageUrl,
      removeAvatar,
    };
  },
});
</script>

<style scoped></style>
