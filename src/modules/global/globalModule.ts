import { Module } from "vuex";

export type GlobalOptions = {
  avatarWidth: string;
  // TODO add warning if overscan and bounce are not equal
  avatarOverscan: string;
  avatarBounce: string;
  avatarEnthusiasm: string;
  avatarIdleBrightness: string;
  avatarSeparation: string;
};

export const globalModule: Module<GlobalOptions, any> = {
  state: () => {
    return {
      avatarWidth: "250px",
      // TODO add warning if overscan and bounce are not equal
      avatarOverscan: "10px",
      avatarBounce: "10px",
      avatarEnthusiasm: "1s",
      avatarIdleBrightness: "75%",
      avatarSeparation: "0",
    };
  },
  mutations: {
    setAvatarWidth(state, width: string) {
      state.avatarWidth = width;
    },

    setAvatarOverscan(state, overscan: string) {
      state.avatarOverscan = overscan;
    },

    setAvatarBounce(state, bounce: string) {
      state.avatarBounce = bounce;
    },

    setAvatarEnthusiasm(state, enthusiasm: string) {
      state.avatarEnthusiasm = enthusiasm;
    },

    setAvatarIdleBrightness(state, idleBrightness: string) {
      state.avatarIdleBrightness = idleBrightness;
    },

    setAvatarSeparation(state, separation: string) {
      state.avatarSeparation = separation;
    },
  },
};
