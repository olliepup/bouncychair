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
    // discordId: "",
    // idleImageUrl: "",
    // speakingImageUrl: "",
    // order,
    discordId: uuid(),
    idleImageUrl: "https://i.imgur.com/HfjdCuo.png",
    speakingImageUrl: "https://i.imgur.com/dSTQAfC.png",
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
  },
};
