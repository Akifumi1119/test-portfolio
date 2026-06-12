import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { authApi, type User, type RegisterPayload, type LoginPayload } from "../api/authApi";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  const isAuthenticated = computed(() => token.value !== null);

  const initFromStorage = async () => {
    const stored = localStorage.getItem("token");
    if (!stored) return;
    token.value = stored;
    try {
      user.value = await authApi.me();
    } catch {
      token.value = null;
      localStorage.removeItem("token");
    }
  };

  const register = async (payload: RegisterPayload) => {
    const data = await authApi.register(payload);
    token.value = data.token;
    user.value = data.user;
    localStorage.setItem("token", data.token);
  };

  const login = async (payload: LoginPayload) => {
    const data = await authApi.login(payload);
    token.value = data.token;
    user.value = data.user;
    localStorage.setItem("token", data.token);
  };

  const logout = async () => {
    await authApi.logout();
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
  };

  return { user, token, isAuthenticated, initFromStorage, register, login, logout };
});
