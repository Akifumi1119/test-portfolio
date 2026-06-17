<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import AppLayout from "../../components/AppLayout.vue";
import api from "../../api/axios";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const fieldErrors = ref<Record<string, string[]>>({});
const isCheckingApi = ref(true);

onMounted(async () => {
  try {
    await api.get("/health");
  } catch {
    // any response (even 404) means the server is up
  } finally {
    isCheckingApi.value = false;
  }
});

const submit = async () => {
  fieldErrors.value = {};
  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push("/pets");
  } catch (err: any) {
    if (err.response?.status === 422) {
      fieldErrors.value = err.response.data.errors ?? {};
    }
  }
};
</script>

<template>
  <div v-if="isCheckingApi" class="loading-overlay"></div>
  <AppLayout>
    <div class="page">
      <div class="card">
        <h1 class="login">ログイン</h1>

        <div v-if="isCheckingApi" class="api-loading">
          <div class="spinner"></div>
          <p>サーバーを起動中です。しばらくお待ちください...</p>
        </div>

        <form v-else @submit.prevent="submit">
          <div class="form-group">
            <label>メールアドレス</label>
            <input v-model="email" type="email" autocomplete="email" />
            <span v-if="fieldErrors.email" class="error">{{
              fieldErrors.email[0]
            }}</span>
          </div>

          <div class="form-group">
            <label>パスワード</label>
            <input
              v-model="password"
              type="password"
              autocomplete="current-password"
            />
            <span v-if="fieldErrors.password" class="error">{{
              fieldErrors.password[0]
            }}</span>
          </div>

          <button type="submit">ログイン</button>
        </form>

        <p class="link">
          アカウントをお持ちでない方は
          <router-link to="/register">新規登録</router-link>
        </p>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.login {
  color: #000;
}

.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.card {
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  width: 360px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 24px;
  font-size: 1.4rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  margin-bottom: 4px;
  font-size: 0.9rem;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.error {
  color: #e53e3e;
  font-size: 0.8rem;
  margin-top: 4px;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background: #555;
}

.link {
  margin-top: 16px;
  font-size: 0.85rem;
  text-align: center;
}

.api-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 0;
  color: #555;
  font-size: 0.9rem;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e5e5;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  cursor: wait;
}
</style>
