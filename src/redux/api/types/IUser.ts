export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  governorate: string;
  delegation: string;
  pharmacyFirstName: string;
  pharmacyLastName: string;
  image?: string | null;
  phone: string;
  fax: string;
  type?: string | null;
  address: string;
  status: number;
  active: boolean;
}

export interface IFilterUserRequest {
  role?: number;
  status?: number;
  activationMode?: boolean;
  search?: string;
  page?: number;
  page_size?: number;
  sortBy?: string;
  sortOrder?: string;
}
