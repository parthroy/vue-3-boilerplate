import { defineAsyncComponent } from "vue";
import isLoadingCompont from "@/components/isLoading.vue";
import notFoundComponent from "@/components/404.vue";
import store from "@/stores";

export default [
  {
    path: "/",
    name: "home",
    component: () => lazyLoadView(import("@/views/HomeView.vue")),
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters.loggedIn) {
          // Redirect to the home page instead
          next();
        } else {
          // Continue to the login page
          next({ name: "login" });
        }
      },
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => lazyLoadView(import("@/views/login.vue")),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        console.log("store", store.getters.loggedIn);
        if (store.getters.loggedIn) {
          // Redirect to the home page instead
          next({ name: "home" });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../components/404.vue"),
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    // props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  // {
  //   path: "*",
  //   component: () => import("../components/notFound.vue"),
  // },
];

const lazyLoadView = (AsyncView) =>
  defineAsyncComponent({
    loader: () => AsyncView,
    loadingComponent: isLoadingCompont /* shows while loading */,
    errorComponent: notFoundComponent /* shows if there's an error */,
    delay: 1000 /* delay in ms before showing loading component */,
    timeout: 3000 /* timeout after this many ms */,
  });
