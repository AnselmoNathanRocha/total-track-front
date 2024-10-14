import { GetItem } from "./item";
import { Request } from "./request";

export interface GetUser {
  id: number;
  name: string;
  phone: string;
  photo: string;
  dateOfBirth: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  surname: string;
  shoppingList: GetItem[];
  sharedWith: Request[];
  pendingRequests: Request[];
  pendingResponse: Request[];
  requestHistories: [];
}

export interface CreateUser {
  name: string;
  photo?: File;
  dateOfBirth: string;
  email: string;
  password: string;
}

export interface UpdateUser {
  photo: string;
  name: string;
  surname: string;
  dateOfBirth: string;
}

export interface UserLogin {
  email: string;
  password: string;
}