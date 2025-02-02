export interface User {
  id: number;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  userId: number;
  name: string;
  bio: string;
  logoUrl: string;
  industry: string;
  address: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface Internship {
  id: number;
  position: string;
  shortInfo: string;
  description: string;
  companyId: number;
  company: Company;
  isOpen: boolean;
  createdAt: string;
  updatedAt: string;
}
