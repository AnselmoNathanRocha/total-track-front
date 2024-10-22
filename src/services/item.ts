import { CreateItem, GetItem } from "../models/item";
import { httpClient } from "./http-client";

class ItemService {
  async get(): Promise<GetItem[]> {
    const response = await httpClient.get(`/items`);
    return response.data;
  }

  async create(data: CreateItem) {
    await httpClient.post(`/items`, data);
  }

  async update(id: number) {
    await httpClient.patch(`/items/${id}`);
  }

  async delete(id: number) {
    await httpClient.delete(`/items/${id}`);
  }
}

export const itemService = new ItemService();
