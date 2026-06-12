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
onMounted(async () => {
  pets.value = await petApi.getAll();
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

    <div class="grid">
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
</style>
