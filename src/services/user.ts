import { CreateUser, GetUser, UpdateUser, UserLogin } from "../models/user";
import { httpClient } from "./http-client";

class UserService {
  async get(userId: number): Promise<GetUser> {
    const response = await httpClient.get(`/users/${userId}`);
    return response.data;
  }

  async getMe(): Promise<GetUser> {
    const response = await httpClient.get(`/users/me`);
    return response.data;
  }

  async create(data: CreateUser) {
    await httpClient.post(`/users`, data);
  }

  async update(data: UpdateUser) {
    const response = await httpClient.put(`/users`, data);
    return response.data;
  }

  async getByEmail(email: string): Promise<GetUser> {
    const response = await httpClient.get(`/users/email/${email}`);
    return response.data;
  }

  async authentication(data: UserLogin) {
    const response = await httpClient.post("/auth/login", data);
    return response.data;
  }
}

export const userService = new UserService();
