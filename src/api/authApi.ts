import api from "./axios";

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  async register(payload: RegisterPayload): Promise<{ user: User; token: string }> {
    const response = await api.post("/register", payload);
    return response.data;
  },

  async login(payload: LoginPayload): Promise<{ user: User; token: string }> {
    const response = await api.post("/login", payload);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post("/logout");
  },

  async me(): Promise<User> {
    const response = await api.get("/me");
    return response.data;
  },
};
