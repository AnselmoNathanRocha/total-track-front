import { GetRequest } from "@/models/pendingRequest";
import { httpClient } from "./http-client";

class PendingResponseService {
  async get(): Promise<GetRequest[]> {
    const response = await httpClient.get(`/pending-responses`);
    return response.data;
  }

  async update(requestId: number, status: 'APPROVED' | 'REJECTED') {
    const response = await httpClient.patch(`/pending-responses`, null, {
      params: { requestId, status },
    });
    return response.data;
  }
}

export const pendingResponseService = new PendingResponseService();
