import api from "./axios";

export interface PetPayload {
  name: string;
  type: string;
  birthday: string;
}

export interface PetRecordPayload {
  record_type: string;
  memo: string;
  recorded_at: string;
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
  async getRecords(id: number) {
    const response = await api.get(`/pets/${id}/records`);
    return response.data;
  },
  async createRecord(id: number, payload: PetRecordPayload) {
    const response = await api.post(`/pets/${id}/records`, payload);
    return response.data;
  },
  async deleteRecord(recordId: number) {
    const response = await api.delete(`/records/${recordId}`);
    return response.data;
  },
};
