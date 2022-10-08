import axios from "axios";
import authAPI from "@/api/auth";
import { STATUS } from "@/stores/const";

const init = {
  tokens: {
    access: {
      token: null,
      expires: null,
    },
    refresh: {
      token: null,
      expires: null,
    },
  },
  auth: false,
  status: "init", //init|request|success|reject,
  ui: {
    loading: false,
  },
  error: null,
};
export const state = init;

export const mutations = {
  REQUEST_TOKEN(state) {
    state.auth = false;
    state.ui.loading = true;
    state.error = null;
    state.status = STATUS.REQUEST;
  },
  SET_TOKEN(state, newValue) {
    state.ui.loading = false;
    state.status = STATUS.SUCCESS;
    state.tokens = newValue;
    state.auth = true;
    setDefaultAuthHeaders(state);
  },
  REJECT_TOKEN(state, payload) {
    state.auth = false;
    state.ui.loading = false;
    state.error = payload;
    state.status = STATUS.REJECT;
  },
  RESET_TOKEN(state) {
    state.tokens = init.tokens;
    state.auth = false;
    state.ui.loading = false;
    state.error = null;
    state.status = STATUS.INIT;
  },
};

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.auth;
  },
};

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state);
    dispatch("validate");
  },

  // Logs in the current user.
  async logIn({ commit, dispatch, getters }, payload = {}) {
    commit("REQUEST_TOKEN");
    try {
      const response = await authAPI.login(payload);
      this.$toast("Login Successful");
      commit("SET_TOKEN", response.data.tokens);
      this.$router.replace("/");
    } catch (error) {
      console.error(error);
      this.$toast(error.response?.data?.message);
      commit("REJECT_TOKEN", error.response?.data?.message);
    }
  },

  // Logs out the current user.
  logOut({ commit }) {
    commit("RESET_TOKEN");
    this.$router.replace("/login");
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  async validate({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null);

    try {
      const response = await axios.get("/api/session");
      const { user } = response.data;
      commit("SET_CURRENT_USER", user);
      return user;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        commit("SET_CURRENT_USER", null);
      } else {
        console.warn(error);
      }
      return null;
    }
  },
};

// ===
// Private helpers
// ===

function setDefaultAuthHeaders(state) {
  axios.defaults.headers.common.Authorization = state.auth
    ? state.auth.tokens
    : "";
}

export default { state, mutations, actions, getters };
