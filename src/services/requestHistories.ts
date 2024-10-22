import { GetRequest, PostRequest } from "@/models/pendingRequest";
import { httpClient } from "./http-client";

class RequestHistoriesService {
  async get(): Promise<GetRequest[]> {
    const response = await httpClient.get(`/request-histories`);
    return response.data;
  }

  async create(data: PostRequest) {
    await httpClient.post(`/request-histories`, data);
  }
}

export const requestHistoriesService = new RequestHistoriesService();
