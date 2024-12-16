export interface GetRequest {
  id: number;
  idUserRequest: number;
  idUserResponse: number;
  nameUserRequest: string;
  nameUserResponse: string;
  createdAt: string;
  status: string;
}

export interface PostRequest {
  email: string;
}

export interface Params {
  userRequestId?: number;
  userResponseId?: number;
}