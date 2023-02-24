import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from './i18n'

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresLogin)) {
    if (localStorage.getItem("authToken") == null) {
      next({ name: "login" });
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
  render: (h) => h(App)
}).$mount("#app");
