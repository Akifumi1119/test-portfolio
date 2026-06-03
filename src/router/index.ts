import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";

import PetListView from "../views/pets/PetListView.vue";
import PetCreateView from "../views/pets/PetCreateView.vue";

import RecordListView from "../views/records/RecordListView.vue";
import RecordCreateView from "../views/records/RecordCreateView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/pets",
    },
    {
      path: "/login",
      component: LoginView,
    },
    {
      path: "/register",
      component: RegisterView,
    },
    {
      path: "/pets",
      component: PetListView,
    },
    {
      path: "/pets/create",
      component: PetCreateView,
    },
    {
      path: "/records",
      component: RecordListView,
    },
    {
      path: "/records/create",
      component: RecordCreateView,
    },
  ],
});

export default router;
