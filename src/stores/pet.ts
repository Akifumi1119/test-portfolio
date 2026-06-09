import { defineStore } from "pinia";
import { ref } from "vue";

export interface Pet {
  id: number;
  name: string;
  type: string;
  birthday: string;
}

export const usePetStore = defineStore("pet", () => {
  const pets = ref<Pet[]>([
    {
      id: 1,
      name: "ポチ",
      type: "柴犬",
      birthday: "2020-04-01",
    },
  ]);

  const addPet = (pet: Omit<Pet, "id">) => {
    pets.value.push({
      id: Date.now(),
      ...pet,
    });
  };
  const updatePet = (id: number, payload: Omit<Pet, "id">) => {
    const index = pets.value.findIndex((pet) => pet.id === id);

    if (index === -1) return;

    pets.value[index] = {
      id,
      ...payload,
    };
  };
  const deletePet = (id: number) => {
    pets.value = pets.value.filter((pet) => pet.id !== id);
  };

  return {
    pets,
    addPet,
    updatePet,
    deletePet,
  };
});
