import { Module } from "vuex";

export type UiState = {
  showCss: boolean;
  showGlobalSettings: boolean;
};

export const uiModule: Module<UiState, any> = {
  state: () => {
    return {
      showCss: false,
      showGlobalSettings: false,
    };
  },
  mutations: {
    toggleShowCss(state) {
      state.showCss = !state.showCss;
    },
    toggleShowGlobalSettings(state) {
      state.showGlobalSettings = !state.showGlobalSettings;
    },
  },
};
