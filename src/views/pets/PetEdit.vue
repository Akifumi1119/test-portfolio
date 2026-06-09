<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import AppLayout from "../../components/AppLayout.vue";
import { onMounted } from "vue";
import { useToast } from "vue-toastification";
import { petApi } from "../../api/petApi";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const name = ref("");
const type = ref("");
const birthday = ref("");

const submit = async () => {
  try {
    await petApi.update(Number(route.params.id), {
      name: name.value,
      type: type.value,
      birthday: birthday.value,
    });

    toast.success("更新しました");

    router.push("/pets");
  } catch {
    toast.error("更新に失敗しました");
  }
};

onMounted(async () => {
  const pet = await petApi.getById(Number(route.params.id));

  name.value = pet.name;
  type.value = pet.type;
  birthday.value = pet.birthday;
});
</script>

<template>
  <AppLayout>
    <h1>ペット編集</h1>

    <form @submit.prevent="submit">
      <div>
        <label>名前</label>
        <input v-model="name" />
      </div>

      <div>
        <label>種類</label>
        <input v-model="type" />
      </div>

      <div>
        <label>誕生日</label>
        <input v-model="birthday" type="date" />
      </div>

      <button type="submit">更新</button>
    </form>
  </AppLayout>
</template>
