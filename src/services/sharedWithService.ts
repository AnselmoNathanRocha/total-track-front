import { GetSharedWith } from "@/models/sharedWith";
import { httpClient } from "./http-client";

class SharedWithService {
  async get(): Promise<GetSharedWith[]> {
    const response = await httpClient.get(`/shared-with`);
    return response.data;
  }
}

export const sharedWithService = new SharedWithService();
