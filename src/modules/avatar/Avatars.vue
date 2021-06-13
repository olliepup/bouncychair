<template>
  <div class="space-y-4">
    <draggable
      tag="ul"
      v-model="avatarIds"
      class="space-y-4"
      handle=".handle"
      itemKey="getAvatarKey"
    >
      <template #item="{ element }">
        <li>
          <div class="width-50"><Avatar :id="element" /></div>
        </li>
      </template>
    </draggable>

    <div class="mx-auto flex content-center w-max space-x-1 my-4">
      <button v-on:click="addAvatar" class="w-100 mx-auto">Add Avatar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";
import draggable from "vuedraggable";

import Avatar from "./Avatar.vue";

export default defineComponent({
  name: "Avatars",
  components: {
    Avatar,
    draggable,
  },
  setup: () => {
    const { commit, state } = useStore();

    const avatarIds = computed({
      get: () => state.avatar.avatarIds,
      set: (avatarIds) => {
        commit("reorderAvatars", avatarIds);
      },
    });

    const getAvatarKey = (r: string) => r;

    const addAvatar = () => commit("addAvatar");

    return {
      getAvatarKey,
      addAvatar,
      avatarIds,
    };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
