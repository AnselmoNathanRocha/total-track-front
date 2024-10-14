import { CreateItem, GetItem } from "../models/item";
import { GetUser } from "../models/user";
import { httpClient } from "./http-client";

class ItemService {
  async get(userId: number): Promise<GetUser[]> {
    const response = await httpClient.get(`/items/${userId}`);
    return response.data;
  }

  async create(userId: number, data: CreateItem) {
    await httpClient.post(`/items/${userId}`, data);
  }

  async update(userId: number, id: number, data: GetItem) {
    await httpClient.put(`/items/${userId}/${id}`, data);
  }

  async delete(userId: number, id: number) {
    await httpClient.delete(`/items/${userId}/${id}`);
  }
}

export const itemService = new ItemService();
