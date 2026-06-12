<script setup lang="ts">
import { ref, computed } from "vue";
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

const isSubmitDisabled = computed(() => {
  return !name.value.trim() || !type.value.trim() || !birthday.value;
});

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
      <div class="form-group">
        <label>名前</label>
        <input v-model="name" />
      </div>

      <div class="form-group">
        <label>種類</label>
        <input v-model="type" />
      </div>

      <div class="form-group">
        <label>誕生日</label>
        <input v-model="birthday" type="date" />
      </div>

      <button type="submit" :disabled="isSubmitDisabled">更新</button>
    </form>
  </AppLayout>
</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
}

input {
  padding: 0.5rem;
}

button {
  width: 7rem;
  height: 3rem;
  align-self: center;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
