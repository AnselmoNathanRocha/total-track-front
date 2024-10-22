type Status = "ACCEPTED" | "REJECTED";

export interface PostRequestHistories {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: Status;
}
