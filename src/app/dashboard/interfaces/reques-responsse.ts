export interface UserResponse {
  firstName: string;
  middleName: string;
  firstSurname: string;
  secondLastName: string;
  address: string;
  city: string;
  phone: number;
}

export interface UserSearch {
  id: number;
  documentType: string;
}
