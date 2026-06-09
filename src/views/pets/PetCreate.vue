<script setup lang="ts">
import axios from "axios";
import { useToast } from "vue-toastification";
import { ref } from "vue";
import AppLayout from "../../components/AppLayout.vue";
import { petApi } from "../../api/petApi";

import { useRouter } from "vue-router";

const name = ref("");
const type = ref("");
const birthday = ref("");

const router = useRouter();
const toast = useToast();

const errorMessage = ref("");

const submit = async () => {
  try {
    await petApi.create({
      name: name.value,
      type: type.value,
      birthday: birthday.value,
    });

    toast.success("ペットを登録しました");

    router.push("/pets");
  } catch (error) {
    toast.error("登録に失敗しました");
  }
};
</script>

<template>
  <AppLayout>
    <h1>ペット登録</h1>

    <p v-if="errorMessage" class="error">
      {{ errorMessage }}
    </p>

    <form @submit.prevent="submit">
      <div class="form-group">
        <label>名前</label>

        <input v-model="name" type="text" />
      </div>

      <div class="form-group">
        <label>種類</label>

        <input v-model="type" type="text" />
      </div>

      <div class="form-group">
        <label>誕生日</label>

        <input v-model="birthday" type="date" />
      </div>

      <button type="submit">登録</button>
    </form>
  </AppLayout>
</template>

<style scoped>
.error {
  color: red;
  margin-bottom: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  max-width: 300px;
}

input {
  padding: 8px;
}

button {
  margin-top: 24px;
  padding: 8px 16px;
}
</style>
