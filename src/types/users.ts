export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface CompanyAddress {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
}

export interface Company {
  department: string;
  name: string;
  title: string;
  address: CompanyAddress;
}

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface Hair {
  color: string;
  type: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  address: Address;
  bank: Bank;
  company: Company;
  crypto: Crypto;
  ein: string;
  ssn: string;
  macAddress: string;
  ip: string;
  university: string;
  role: string;
  userAgent: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
