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
    <header class="header">
      <div class="header-left">
        <span class="logo" @click="router.push('/pets')">PetCare Diary</span>
        <nav v-if="authStore.isAuthenticated">
          <router-link to="/pets">ペット一覧</router-link>
          <router-link to="/pets/create">ペット登録</router-link>
        </nav>
      </div>

      <div class="header-right">
        <span class="user-name">{{ authStore.user?.name }}</span>
        <button
          v-if="authStore.isAuthenticated"
          class="logout-btn"
          @click="logout"
        >
          ログアウト
        </button>
      </div>
    </header>

    <main class="content">
      <slot />
    </main>

    <footer class="footer">
      <p>© 2026 Akifumi Doi</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.logo {
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  color: #111;
}

nav {
  display: flex;
  gap: 24px;
}

nav a {
  text-decoration: none;
  color: #555;
  font-size: 0.95rem;
}

nav a.router-link-active {
  color: #111;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-name {
  font-size: 0.9rem;
  color: #555;
}

.logout-btn {
  padding: 6px 14px;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  color: #555;
}

.logout-btn:hover {
  background: #f5f5f5;
}

.content {
  flex: 1;
  padding: 32px;
}

.footer {
  text-align: center;
  padding: 16px;
  font-size: 0.8rem;
  color: #999;
  border-top: 1px solid #e5e5e5;
  background: #fff;
}
</style>
