<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { petApi } from "../../api/petApi";
import { useToast } from "vue-toastification";
import { formatDate, formatDateTime } from "../../utils/date";
import { recordTypeLabel } from "../../utils/petRecord";

import AppLayout from "../../components/AppLayout.vue";

interface Pet {
  id: number;
  name: string;
  type: string;
  birthday: string;
}

interface PetRecord {
  id: number;
  pet_id: number;
  record_type: string;
  memo: string;
  recorded_at: string;
}

const pet = ref<Pet | null>(null);
const records = ref<PetRecord[]>([]);
const isLoading = ref(true);
const route = useRoute();
const router = useRouter();
const toast = useToast();

const recordType = ref("");
const memo = ref("");
const recordedAt = ref("");

const isRecordButtonDisabled = computed(() => {
  return !recordType.value || !memo.value.trim() || !recordedAt.value;
});

// datetime-local の値（YYYY-MM-DDTHH:mm）を API 形式（YYYY-MM-DD HH:MM:SS）に変換
const toApiDateTime = (value: string) => {
  const withSpace = value.replace("T", " ");
  return withSpace.length === 16 ? withSpace + ":00" : withSpace;
};

const deletePet = async () => {
  try {
    await petApi.deletePet(Number(route.params.id));
    toast.success("削除しました");
    router.push("/pets");
  } catch {
    toast.error("削除に失敗しました");
  }
};

const createRecord = async () => {
  const petId = Number(route.params.id);

  await petApi.createRecord(petId, {
    record_type: recordType.value,
    memo: memo.value,
    recorded_at: toApiDateTime(recordedAt.value),
  });

  records.value = await petApi.getRecords(petId);

  recordType.value = "";
  memo.value = "";
  recordedAt.value = "";
};

const deleteRecord = async (recordId: number) => {
  try {
    await petApi.deleteRecord(recordId);
    toast.success("記録を削除しました");
    records.value = await petApi.getRecords(Number(route.params.id));
  } catch {
    toast.error("削除に失敗しました");
  }
};

onMounted(async () => {
  const petId = Number(route.params.id);
  try {
    [pet.value, records.value] = await Promise.all([
      petApi.getById(petId),
      petApi.getRecords(petId),
    ]);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <AppLayout>
    <div v-if="isLoading" class="loading">
      <p>読み込み中...</p>
    </div>

    <template v-else>
      <div class="page-container">
        <div v-if="pet" class="pet-header">
          <div>
            <h1>{{ pet.name }}</h1>
            <p>種類: {{ pet.type }}</p>
            <p>誕生日: {{ formatDate(pet.birthday) }}</p>
          </div>
          <div class="pet-actions">
            <button @click="router.push(`/pets/${pet.id}/edit`)">編集</button>
            <button class="btn-danger" @click="deletePet">削除</button>
          </div>
        </div>

        <div class="record-form">
          <h2>記録追加</h2>

          <select v-model="recordType">
            <option value="">選択してください</option>
            <option value="meal">食事</option>
            <option value="walk">散歩</option>
            <option value="weight">体重</option>
            <option value="hospital">病院</option>
            <option value="other">その他</option>
          </select>

          <textarea v-model="memo" placeholder="内容を入力" />

          <input v-model="recordedAt" type="datetime-local" />

          <button
            class="register"
            :disabled="isRecordButtonDisabled"
            @click="createRecord"
          >
            記録追加
          </button>
        </div>

        <h2 class="records-title">お世話記録</h2>

        <div v-if="records.length === 0" class="empty">記録がありません</div>

        <div v-for="record in records" :key="record.id" class="record-item">
          <p class="record-date">{{ formatDateTime(record.recorded_at) }}</p>
          <p class="record-type">{{ recordTypeLabel(record.record_type) }}</p>
          <p>{{ record.memo }}</p>
          <button @click="deleteRecord(record.id)">削除</button>
          <hr />
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<style scoped>
.loading {
  text-align: center;
  padding: 64px;
  color: #999;
}

.pet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.pet-header h1 {
  margin: 0 0 8px;
}

.pet-actions {
  display: flex;
  gap: 8px;
}

.btn-danger {
  color: #e53e3e;
  border-color: #e53e3e;
}

.page-container {
  max-width: 600px;
  margin: 0 auto;
}

.record-form {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.records-title {
  text-align: center;
}

.record-form select,
.record-form input,
.record-form textarea {
  padding: 0.75rem;
  font-size: 1rem;
}

.record-form textarea {
  min-height: 120px;
}

.register {
  width: 7rem;
  height: 3rem;
  font-size: 1rem;
  align-self: center;
}

.register:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty {
  color: #999;
  padding: 16px 0;
}

.record-item {
  width: 100%;
}

.record-date {
  font-size: 0.85rem;
  color: #888;
  margin: 0;
}

.record-type {
  font-weight: 600;
  margin: 4px 0;
}
</style>
