export interface GetItem {
  id: number;
  idUser: number;
  itemName: string;
  checked: boolean;
}

export interface CreateItem {
  itemName: string;
}