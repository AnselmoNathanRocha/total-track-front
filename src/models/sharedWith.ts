export interface GetSharedWith {
  id: number;
  idUserRequest: number;
  idUserResponse: number;
  nameUserRequest: string;
  nameUserResponse: string;
  createdAt: string;
  name: string;
}

export interface PostSharedWith {
  idUserResponse: number;
  nameUserResponse: string;
}
