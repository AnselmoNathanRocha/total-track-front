import { GetRequest } from "@/models/pendingRequest";
import { httpClient } from "./http-client";

class RequestHistoriesService {
  async get(): Promise<GetRequest[]> {
    const response = await httpClient.get(`/request-histories`);
    return response.data;
  }
}

export const requestHistoriesService = new RequestHistoriesService();
