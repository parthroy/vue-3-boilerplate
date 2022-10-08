import { createLogger, createStore } from "vuex";
import auth from "./modules/auth";
import users from "./modules/user";
import VuexPersist from "vuex-persist";

const debug = process.env.NODE_ENV !== "production";

const vuexLocalStorage = new VuexPersist({
  key: "vue_app", // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: (state) => ({
  //   auth: state.auth,
  //   user: state.user,
  // }),
  modules: ["auth", "user"],
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});

const plugins = [vuexLocalStorage.plugin];
if (debug) {
  plugins.push(createLogger());
}
const store = createStore({
  modules: {
    auth,
    user: users,
  },
  strict: debug,
  plugins: plugins,
});

export default store;
