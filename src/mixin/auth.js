import { computed } from "vue";
import { useStore } from "vuex";
import { getProxyData } from "@/utils";
import { mapActions } from "vuex";

export default {
  data() {
    const store = useStore();
    return {
      // all state
      token: computed(() => getProxyData(store.state.auth).tokens.access.token),
      tokenExpires: computed(
        () => getProxyData(store.state.auth).tokens.access.expires
      ),
      refreshToken: computed(
        () => getProxyData(store.state.auth).tokens.refresh.token
      ),
      refreshTokenExpires: computed(
        () => getProxyData(store.state.auth).tokens.refresh.expires
      ),

      // all getters
      isAuth: computed(() => store.getters.loggedIn),
    };
  },
  created: function () {
    this.hello();
  },

  methods: {
    // const store = useStore();
    hello: function () {
      console.log("auth mixin!");
    },
    ...mapActions({
      logOutAction: "logOut",
      logInAction: "logIn",
    }),
  },
};