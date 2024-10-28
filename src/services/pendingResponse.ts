import { GetRequest, Params, PostRequest } from "@/models/pendingRequest";
import { httpClient } from "./http-client";

class PendingResponseService {
  async get(): Promise<GetRequest[]> {
    const response = await httpClient.get(`/responses`);
    return response.data;
  }

  async getAll(params: Params = {}): Promise<GetRequest[]> {
    const response = await httpClient.get(`/responses`, { params });
    return response.data;
  }

  async getResponses(status?: "PENDING" | "ACCEPTED" | "REJECTED"): Promise<GetRequest[]> {
    const url = status ? `/pending-responses?status=${status}` : `/pending-responses`;
    const response = await httpClient.get(url);
    return response.data;
  }

  async create(data: PostRequest) {
    await httpClient.post(`/responses`, data);
  }

  async update(requestId: number, status: 'ACCEPTED' | 'REJECTED') {
    const response = await httpClient.patch(`/responses/${requestId}`, null, {
      params: { status },
    });
    return response.data;
  }
}

export const pendingResponseService = new PendingResponseService();
