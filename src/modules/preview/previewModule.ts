import { Module } from "vuex";

export type PreviewState = {
  showCss: boolean;
};

export const previewModule: Module<PreviewState, any> = {
  state: () => {
    return {
      showCss: false,
    };
  },
  mutations: {
    toggleCss(state) {
      state.showCss = !state.showCss;
    },
  },
};
