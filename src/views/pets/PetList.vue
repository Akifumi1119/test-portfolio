<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import AppLayout from "../../components/AppLayout.vue";
import PetCard from "../../components/PetCard.vue";
import { petApi } from "../../api/petApi";
import { formatDate } from "../../utils/date";

const router = useRouter();

interface Pet {
  id: number;
  name: string;
  type: string;
  birthday: string;
}

const pets = ref<Pet[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    pets.value = await petApi.getAll();
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <AppLayout>
    <div class="header">
      <h1>ペット一覧</h1>
      <button class="register-button" @click="router.push('/pets/create')">
        ＋ペットを登録
      </button>
    </div>

    <div v-if="isLoading" class="loading">読み込み中...</div>

    <div v-else-if="pets.length === 0" class="empty">ペットが登録されていません</div>

    <div v-else class="grid">
      <PetCard
        v-for="pet in pets"
        :key="pet.id"
        :id="pet.id"
        :name="pet.name"
        :type="pet.type"
        :birthday="formatDate(pet.birthday)"
      />
    </div>
  </AppLayout>
</template>

<style scoped>
.register-button {
  margin-top: 1rem;
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.header h1 {
  margin: 0;
}

.loading,
.empty {
  text-align: center;
  padding: 64px;
  color: #999;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
</style>
