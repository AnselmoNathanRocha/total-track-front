import { GetRequest, PostRequest } from "@/models/pendingRequest";
import { httpClient } from "./http-client";

class PendingRequestService {
  async get(): Promise<GetRequest[]> {
    const response = await httpClient.get(`/requests`);
    return response.data;
  }

  async create(data: PostRequest) {
    await httpClient.post(`/requests`, data);
  }
}

export const pendingRequestService = new PendingRequestService();