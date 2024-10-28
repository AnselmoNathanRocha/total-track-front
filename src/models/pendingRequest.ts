export interface GetRequest {
  id: number;
  idUserRequest: number;
  idUserResponse: number;
  nameUserRequest: string;
  nameUserResponse: string;
  createdAt: string;
}

export interface PostRequest {
  idUserResponse: number;
  nameUserResponse: string;
}

export interface Params {
  userRequestId?: number;
  userResponseId?: number;
}