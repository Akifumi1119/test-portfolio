<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { petApi } from "../../api/petApi";
import { useToast } from "vue-toastification";

import AppLayout from "../../components/AppLayout.vue";

interface Pet {
  id: number;
  name: string;
  type: string;
  birthday: string;
}
const pet = ref<Pet | null>(null);
const route = useRoute();
const router = useRouter();
const toast = useToast();

const deletePet = async () => {
  try {
    await petApi.deletePet(Number(route.params.id));

    toast.success("削除しました");

    router.push("/pets");
  } catch {
    toast.error("削除に失敗しました");
  }
};

onMounted(async () => {
  pet.value = await petApi.getById(Number(route.params.id));
});
</script>

<template>
  <AppLayout>
    <div v-if="pet">
      <h1>{{ pet?.name }}</h1>

      <p>種類: {{ pet.type }}</p>

      <p>誕生日: {{ pet.birthday }}</p>
    </div>
    <button @click="router.push(`/pets/${pet?.id}/edit`)">編集</button>
    <button @click="deletePet">削除</button>
  </AppLayout>
</template>
