<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const fieldErrors = ref<Record<string, string[]>>({});

const submit = async () => {
  fieldErrors.value = {};
  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    });
    router.push("/pets");
  } catch (err: any) {
    if (err.response?.status === 422) {
      fieldErrors.value = err.response.data.errors ?? {};
    }
  }
};
</script>

<template>
  <div class="page">
    <div class="card">
      <h1 class="user-register">新規登録</h1>

      <form @submit.prevent="submit">
        <div class="form-group">
          <label>名前</label>
          <input v-model="name" type="text" autocomplete="name" />
          <span v-if="fieldErrors.name" class="error">{{
            fieldErrors.name[0]
          }}</span>
        </div>

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
            autocomplete="new-password"
          />
          <span v-if="fieldErrors.password" class="error">{{
            fieldErrors.password[0]
          }}</span>
        </div>

        <div class="form-group">
          <label>パスワード（確認）</label>
          <input
            v-model="passwordConfirmation"
            type="password"
            autocomplete="new-password"
          />
          <span v-if="fieldErrors.password_confirmation" class="error">
            {{ fieldErrors.password_confirmation[0] }}
          </span>
        </div>

        <button type="submit">登録</button>
      </form>

      <p class="link">
        すでにアカウントをお持ちの方は
        <router-link to="/login">ログイン</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.user-register {
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
</style>
