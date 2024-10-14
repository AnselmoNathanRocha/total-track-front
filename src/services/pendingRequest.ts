import { GetRequest, PostRequest } from "@/models/pendingRequest";
import { httpClient } from "./http-client";

class PendingRequestService {
  async get(userId: number): Promise<GetRequest[]> {
    const response = await httpClient.get(`/pendingRequests/${userId}`);
    return response.data;
  }

  async create(userId: number, data: PostRequest) {
    await httpClient.post(`/pendingRequests/${userId}`, data);
  }
}

export const pendingRequestService = new PendingRequestService();
