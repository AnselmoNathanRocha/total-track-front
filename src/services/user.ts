import { CreateUser, GetUser, UpdateUser, UserLogin } from "../models/user";
import { httpClient } from "./http-client";

class UserService {
  async get(userId: number): Promise<GetUser> {
    const response = await httpClient.get(`/user/${userId}`);
    return response.data;
  }

  async create(data: CreateUser) {
    await httpClient.post(`/user`, data);
  }

  async update(userId: number, data: FormData | UpdateUser) {
    const response = await httpClient.put(`/user/${userId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async getByEmailOrPhone(data: string): Promise<GetUser> {
    const params = {
      [data.includes("@") ? "email" : "phone"]: data,
    };
    const response = await httpClient.get("/user/search", { params });
    return response.data;
  }

  async authentication(data: UserLogin) {
    const response = await httpClient.post("/user/login", data);
    return response.data;
  }

  async logout(userId: number) {
    const response = await httpClient.post("/user/logout", userId);
    return response.data;
  }
}

export const userService = new UserService();
