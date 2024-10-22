export interface GetSharedWith {
  id: number;
  idUserRequest: number;
  idUserResponse: number;
  nameUserRequest: string;
  nameUserResponse: string;
  createdAt: string;
}

export interface PostSharedWith {
  idUserResponse: number;
  nameUserResponse: string;
}

export interface GetAllSharedWithParams {
  userRequestId?: number;
  userResponseId?: number;
}
