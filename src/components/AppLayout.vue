<template>
  <div class="layout">
    <aside class="sidebar">
      <h2>PetCare Diary</h2>

      <nav>
        <router-link to="/pets">ペット一覧</router-link>

        <router-link to="/pets/create"> ペット登録 </router-link>

        <router-link to="/records"> 記録一覧 </router-link>

        <router-link to="/records/create"> 記録登録 </router-link>
      </nav>
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
}

.sidebar h2 {
  color: #000;
  margin-bottom: 24px;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar a {
  text-decoration: none;
  color: #333;
}

.content {
  flex: 1;
  padding: 24px;
}
</style>
