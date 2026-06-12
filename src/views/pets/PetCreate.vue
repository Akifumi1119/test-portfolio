<script setup lang="ts">
import { useToast } from "vue-toastification";
import { ref, computed } from "vue";
import AppLayout from "../../components/AppLayout.vue";
import { petApi } from "../../api/petApi";
import { useRouter } from "vue-router";

const name = ref("");
const type = ref("");
const birthday = ref("");

const router = useRouter();
const toast = useToast();

const isSubmitDisabled = computed(() => {
  return !name.value.trim() || !type.value.trim() || !birthday.value;
});

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
    <div class="page">
      <div class="card">
        <h1 class="register-title">ペット登録</h1>

        <form @submit.prevent="submit">
          <div class="form-group">
            <label>名前</label>
            <input v-model="name" type="text" placeholder="例: ポチ" />
          </div>

          <div class="form-group">
            <label>種類</label>
            <input v-model="type" type="text" placeholder="例: 柴犬" />
          </div>

          <div class="form-group">
            <label>誕生日</label>
            <input v-model="birthday" type="date" />
          </div>

          <div class="actions">
            <button
              type="button"
              class="btn-cancel"
              @click="router.push('/pets')"
            >
              キャンセル
            </button>
            <button
              type="submit"
              class="btn-submit"
              :disabled="isSubmitDisabled"
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  padding-top: 48px;
}

.card {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 40px;
  width: 100%;
  max-width: 480px;
}

h1 {
  font-size: 1.3rem;
  margin-bottom: 32px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}

label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #444;
}

input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.15s;
}

input:focus {
  outline: none;
  border-color: #555;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
}

.btn-cancel {
  padding: 10px 20px;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  color: #555;
}

.btn-cancel:hover {
  background: #f5f5f5;
}

.btn-submit {
  padding: 10px 24px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}

.btn-submit:hover {
  background: #555;
}

.btn-submit:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.register-title {
  color: #000;
}
</style>
