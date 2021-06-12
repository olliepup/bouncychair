import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { avatarModule, AvatarState } from "./modules/avatar/avatarModule";
import { globalModule, GlobalOptions } from "./modules/global/globalModule";
import { buildCss } from "./modules/preview/buildCss";
import { buildPreviewHtml } from "./modules/preview/buildHtml";
import { previewModule, PreviewState } from "./modules/preview/previewModule";

export type AppState = {
  global: GlobalOptions;
  avatar: AvatarState;
  preview: PreviewState;
};

export const storeKey: InjectionKey<Store<AppState>> = Symbol();

// Create a new store instance.
export const store = createStore<AppState>({
  modules: {
    global: globalModule,
    avatar: avatarModule,
    preview: previewModule,
  },
  getters: {
    allAvatars: (state) => {
      return state.avatar.avatarIds.map((r) => state.avatar.avatarsById[r]);
    },

    css: (state, getters) => {
      return buildCss(state.global, getters.allAvatars);
    },

    previewHtml: (state, getters) => {
      return buildPreviewHtml(state.global, getters.allAvatars);
    },
  },
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(storeKey);
}