import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";

Vue.config.productionTip = false;

//deny access to pages that require login to non-logged users
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresLogin)) {
    if (localStorage.getItem("authToken") == null) {
      next({ name: "error" });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
