import { CreateUser, GetUser, UpdateUser, UserLogin } from "../models/user";
import { httpClient } from "./http-client";

class UserService {
  async get(userId: number): Promise<GetUser> {
    const response = await httpClient.get(`/user/${userId}`);
    return response.data;
  }

  async getMe(): Promise<GetUser> {
    const response = await httpClient.get(`/user`);
    return response.data;
  }

  async create(data: CreateUser) {
    await httpClient.post(`/user`, data);
  }

  async update(data: UpdateUser) {
    const response = await httpClient.put(`/user`, data);
    return response.data;
  }

  async getByEmail(email: string): Promise<GetUser> {
    const response = await httpClient.get(`/user/email/${email}`);
    return response.data;
  }

  async authentication(data: UserLogin) {
    const response = await httpClient.post("/auth/login", data);
    return response.data;
  }

  async updatePhoto(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("photo", file);

    const response = await httpClient.patch(`/user/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.photo; // Retorna o caminho da nova foto
  }
}

export const userService = new UserService();
