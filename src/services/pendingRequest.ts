import { GetRequest, PostRequest } from "@/models/pendingRequest";
import { httpClient } from "./http-client";

class PendingRequestService {
  async get(): Promise<GetRequest[]> {
    const response = await httpClient.get(`/pending-requests`);
    return response.data;
  }

  async create(data: PostRequest) {
    await httpClient.post(`/send-request`, data);
  }
}

export const pendingRequestService = new PendingRequestService();
