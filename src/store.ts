import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { avatarModule, AvatarState } from "./modules/avatar/avatarModule";
import { globalModule, GlobalOptions } from "./modules/global/globalModule";
import { buildCss } from "./modules/preview/buildCss";
import { buildPreviewHtml } from "./modules/preview/buildHtml";
import { uiModule, UiState } from "./modules/ui/previewModule";

const STATE_VERSION = "1";
const VERSION_KEY = "bouncychair-version";
const STATE_KEY = "bouncychair-state";

export type AppState = {
  global: GlobalOptions;
  avatar: AvatarState;
  ui: UiState;
};

export const storeKey: InjectionKey<Store<AppState>> = Symbol();

// Create a new store instance.
export const store = createStore<AppState>({
  modules: {
    global: globalModule,
    avatar: avatarModule,
    ui: uiModule,
  },
  mutations: {
    hydrateState(state) {
      try {
        const serializedVersion = window.localStorage.getItem(VERSION_KEY);
        const serializedState = window.localStorage.getItem(STATE_KEY);

        if (
          serializedVersion === null ||
          serializedState === null ||
          serializedVersion !== STATE_VERSION
        ) {
          return;
        }

        const hydratedState = JSON.parse(serializedState);

        Object.assign(state.avatar, hydratedState.avatar);
        Object.assign(state.global, hydratedState.global);
        Object.assign(state.ui, hydratedState.ui);
      } catch (e) {}
    },
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

store.subscribe((_, state) => {
  // TODO consider using the git hash or build number?
  window.localStorage.setItem(VERSION_KEY, STATE_VERSION);
  window.localStorage.setItem(STATE_KEY, JSON.stringify(state));
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(storeKey);
}
