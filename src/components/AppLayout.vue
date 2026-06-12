<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <h2>PetCare Diary</h2>

      <nav>
        <router-link to="/pets">ペット一覧</router-link>
        <router-link to="/pets/create">ペット登録</router-link>
      </nav>

      <div class="sidebar-footer">
        <p class="user-name">{{ authStore.user?.name }}</p>
        <button class="logout-btn" @click="logout">ログアウト</button>
      </div>
    </aside>

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 240px;
  background: #f5f5f5;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.sidebar h2 {
  color: #000;
  margin-bottom: 24px;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.sidebar a {
  text-decoration: none;
  color: #333;
}

.sidebar-footer {
  border-top: 1px solid #ddd;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-name {
  font-size: 0.9rem;
  color: #555;
  margin: 0;
}

.logout-btn {
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #999;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  color: #555;
}

.logout-btn:hover {
  background: #e5e5e5;
}

.content {
  flex: 1;
  padding: 24px;
}
</style>
