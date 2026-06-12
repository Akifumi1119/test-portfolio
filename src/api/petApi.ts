import axios from "axios";
import router from "../router";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      router.push("/login");
    }
    return Promise.reject(err);
  }
);

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
