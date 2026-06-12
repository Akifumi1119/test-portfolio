<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { petApi } from "../../api/petApi";
import { useToast } from "vue-toastification";
import { formatDateTime } from "../../utils/date";
import { recordTypeLabel } from "../../utils/petRecord";

import AppLayout from "../../components/AppLayout.vue";

interface PetRecord {
  id: number;
  pet_id: number;
  record_type: string;
  memo: string;
  recorded_at: string;
}

const records = ref<PetRecord[]>([]);
const route = useRoute();
const router = useRouter();
const toast = useToast();

const recordType = ref("");
const memo = ref("");
const recordedAt = ref("");

const isRecordButtonDisabled = computed(() => {
  return !recordType.value || !memo.value.trim() || !recordedAt.value;
});

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
    recorded_at: recordedAt.value,
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
  records.value = await petApi.getRecords(Number(route.params.id));
});
</script>

<template>
  <AppLayout>
    <button @click="router.push(`/pets/${route.params.id}/edit`)">編集</button>
    <button @click="deletePet">削除</button>

    <div class="record-form">
      <h2>記録追加</h2>

      <select v-model="recordType">
        <option value="">選択してください</option>
        <option value="meal">食事</option>
        <option value="walk">散歩</option>
        <option value="weight">体重</option>
        <option value="hospital">病院</option>
        <option value="other">その他(上記をまとめて入力する用)</option>
      </select>

      <textarea v-model="memo" placeholder="内容(散歩の有無など備考を入力)" />

      <input v-model="recordedAt" type="datetime-local" />

      <button
        class="register"
        :disabled="isRecordButtonDisabled"
        @click="createRecord"
      >
        記録追加
      </button>
    </div>

    <h2>お世話記録</h2>

    <div v-for="record in records" :key="record.id">
      <p>
        {{ formatDateTime(record.recorded_at) }}
      </p>
      <p>
        {{ recordTypeLabel(record.record_type) }}
      </p>
      <p>
        {{ record.memo }}
      </p>
      <button @click="deleteRecord(record.id)">削除</button>
      <hr />
    </div>
  </AppLayout>
</template>

<style scoped>
.record-form {
  max-width: 500px;
  margin: 2rem auto;

  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.record-form button {
  width: fit-content;
  align-self: center;
}

.register {
  width: 7rem;
  height: 3rem;
  font-size: 1rem;
}

.register:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
