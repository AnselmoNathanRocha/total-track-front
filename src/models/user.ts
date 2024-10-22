export interface GetUser {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  shoppingList: number[];
  sharedWith: number[];
  pendingRequests: number[];
  pendingResponse: number[];
  requestHistories: number[];
  photo: string;
}

export interface CreateUser {
  name: string;
  phone: string;
  dateOfBirth: string;
  email: string;
  password: string;
}

export interface UpdateUser {
  photo: File | null;
  name: string;
  surname: string;
  dateOfBirth: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}