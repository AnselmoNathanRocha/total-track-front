import { CreateItem, GetItem } from "../models/item";
import { httpClient } from "./http-client";

class ItemService {
  async get(): Promise<GetItem[]> {
    const response = await httpClient.get(`/item`);
    return response.data;
  }

  async create(data: CreateItem) {
    await httpClient.post(`/item`, data);
  }

  async update(id: number) {
    await httpClient.patch(`/item/${id}`);  
  }

  async delete(id: number) {
    await httpClient.delete(`/item/${id}`);
  }
}

export const itemService = new ItemService();
