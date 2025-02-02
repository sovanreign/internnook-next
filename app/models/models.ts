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

export interface Coordinator {
  userId: number;
  user: User;
  firstName: string;
  lastName: string;
  bio?: string;
  school: string;
  department: string;
  inviteCode: string;
  students: Student[];
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  userId: number;
  user: User;
  firstName: string;
  lastName: string;
  bio?: string;
  school: string;
  program: string;
  resumeUrl: string;
  coordinatorId: number;
  coordinator: Coordinator;
  status: string;
  applications: Application[];
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
  applications: Application[];
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: number;
  studentId: number;
  student: Student;
  internshipId: number;
  internship: Internship;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Moa {
  id: number;
  studentId: number;
  coordinatorId: number;
  companyId: number;
  applicationId: number;
  student: Student;
  coordinator: Coordinator;
  company: Company;
  application: Application;
  status: string;
  studentSlug: string;
  coordinatorSlug: string;
  companySlug: string;
  createdAt: string;
  updatedAt: string;
}
