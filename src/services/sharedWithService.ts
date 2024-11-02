import { GetSharedWith, PostSharedWith } from "@/models/sharedWith";
import { httpClient } from "./http-client";

class SharedWithService {
  async get(id: number): Promise<GetSharedWith> {
    const response = await httpClient.get(`/shared-with/${id}`);
    return response.data;
  }

  async create(data: PostSharedWith): Promise<GetSharedWith> {
    const response = await httpClient.post(`/shared-with`, data);
    return response.data;
  }
}

export const sharedWithService = new SharedWithService();
