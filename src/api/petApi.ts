import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export interface PetPayload {
  name: string;
  type: string;
  birthday: string;
}

export const petApi = {
  async getAll() {
    const response = await api.get("/pets");

    return response.data;
  },

  async create(payload: PetPayload) {
    const response = await api.post("/pets", payload);

    return response.data;
  },
  async update(id: number, payload: PetPayload) {
    const response = await api.put(`/pets/${id}`, payload);

    return response.data;
  },
  async getById(id: number) {
    const response = await api.get(`/pets/${id}`);

    return response.data;
  },
  async deletePet(id: number) {
    const response = await api.delete(`/pets/${id}`);

    return response.data;
  },
};
