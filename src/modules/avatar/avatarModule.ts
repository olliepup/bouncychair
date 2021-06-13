import { Module } from "vuex";
import { v4 as uuid } from "uuid";

export type Avatar = {
  id: string;
  discordId: string;
  idleImageUrl: string;
  speakingImageUrl: string;
  order: number;
};

export type AvatarState = {
  avatarsById: { [key: string]: Avatar };
  avatarIds: string[];
};

export function createAvatar(order = 1): Avatar {
  return {
    id: uuid(),
    discordId: uuid(),
    idleImageUrl: "/idle.png",
    speakingImageUrl: "/speaking.png",
    order,
  };
}

export const avatarModule: Module<AvatarState, any> = {
  state: () => {
    return {
      avatarsById: {},
      avatarIds: [],
    };
  },
  mutations: {
    addAvatar(state) {
      const avatar = createAvatar(state.avatarIds.length + 1);

      state.avatarsById[avatar.id] = avatar;
      state.avatarIds.push(avatar.id);
    },
    removeAvatar(state, id: string) {
      state.avatarIds = state.avatarIds.filter((r) => r !== id);
      delete state.avatarsById[id];
    },
    updateAvatar(
      state,
      { id, changes }: { id: string; changes: Partial<Avatar> }
    ) {
      const avatar = state.avatarsById[id];

      if (!avatar) {
        return;
      }

      state.avatarsById[id] = {
        ...avatar,
        ...changes,
      };
    },
    reorderAvatars(state, nextAvatarIds: string[]) {
      nextAvatarIds.forEach((r, idx) => {
        state.avatarsById[r].order = idx + 1;
      });

      state.avatarIds = nextAvatarIds;
    },
  },
};
