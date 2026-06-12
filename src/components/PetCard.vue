<script setup lang="ts">
import { useRouter } from "vue-router";

interface Props {
  id: number;
  name: string;
  type: string;
  birthday: string;
}

const props = defineProps<Props>();

const router = useRouter();

const moveDetail = () => {
  router.push(`/pets/${props.id}`);
};
</script>

<template>
  <div class="card" @click="moveDetail">
    <h3>{{ name }}</h3>

    <p>{{ type }}</p>

    <p>{{ birthday }}</p>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
}

.card:hover {
  background: #f9f9f9;
}
</style>
