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
    <h1>ペット一覧</h1>

    <button @click="router.push('/pets/create')">＋ペットを登録</button>

    <PetCard
      v-for="pet in pets"
      :key="pet.id"
      :id="pet.id"
      :name="pet.name"
      :type="pet.type"
      :birthday="formatDate(pet.birthday)"
    />
  </AppLayout>
</template>
