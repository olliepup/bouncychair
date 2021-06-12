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
          @change.prevent="updateAvatar({ discordId: $event.target.value })"
        />
      </label>

      <label>
        Idle Image URL
        <input
          type="text"
          placeholder="http://www.example.com/idle.png"
          :value="avatar.idleImageUrl"
          @change.prevent="updateAvatar({ idleImageUrl: $event.target.value })"
        />
      </label>

      <label>
        Speaking Image URL
        <input
          type="text"
          placeholder="http://www.example.com/speaking.png"
          :value="avatar.speakingImageUrl"
          @change.prevent="
            updateAvatar({ speakingImageUrl: $event.target.value })
          "
        />
      </label>

      <button @click="removeAvatar">Remove</button>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
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

    const avatar = state.avatar.avatarsById[id.value];

    const updateAvatar = (changes: Partial<Avatar>) =>
      commit("updateAvatar", {
        id: id.value,
        changes,
      });

    const removeAvatar = () => commit("removeAvatar", id.value);

    return {
      avatar,
      updateAvatar,
      removeAvatar,
    };
  },
});
</script>

<style scoped></style>
