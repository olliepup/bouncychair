<template>
  <div class="space-y-4">
    <ul class="space-y-4">
      <li v-for="avatarId in avatarIds" :key="avatarId">
        <div class="width-50"><Avatar :id="avatarId" /></div>
      </li>
    </ul>

    <div class="mx-auto flex content-center w-max space-x-1 my-4">
      <button v-on:click="addAvatar" class="w-100 mx-auto">Add Avatar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";
import Avatar from "./Avatar.vue";

export default defineComponent({
  name: "Avatars",
  components: {
    Avatar,
  },
  setup: () => {
    const { commit, state } = useStore();

    const avatarIds = computed(() => state.avatar.avatarIds);

    const addAvatar = () => commit("addAvatar");

    return {
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
