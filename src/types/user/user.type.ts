export type user = {
  _id: string;
  username: string;
  email: string;
  isSuperUser: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};
