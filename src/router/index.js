import Vue from "vue";
import VueRouter from "vue-router";
import TodosView from "../views/TodosView.vue";
import LoginView from "../views/LoginView.vue";
import TranslateView from "../views/TranslateView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/todos",
    name: "todos",
    component: TodosView,
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: "/translate",
    name: "translate",
    component: TranslateView,
    meta: {
      requiresLogin: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
