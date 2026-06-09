import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/auth/Login.vue";
import RegisterView from "../views/auth/Register.vue";

import PetListView from "../views/pets/PetList.vue";
import PetCreateView from "../views/pets/PetCreate.vue";
import PetDetailView from "../views/pets/PetDetail.vue";
import PetEditView from "../views/pets/PetEdit.vue";

import RecordListView from "../views/records/RecordList.vue";
import RecordCreateView from "../views/records/RecordCreate.vue";

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
      path: "/pets/:id",
      component: PetDetailView,
    },
    {
      path: "/pets/:id/edit",
      component: PetEditView,
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
