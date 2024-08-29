export type UserType = 'Customer' | 'CaseManager';

export type BaseUser = {
  bio: string | null;
  city: string | null;
  country: string | null;
  customer_level: null | CustomerLevel;
  email: string;
  id: number;
  name: string;
  profile_image: string | null;
  specialization: string | null;
  surgical_specialization: string | null;
  user_role: UserType;
};

export type CustomerLevel = 'BASIC' | 'INTERMEDIATE' | 'PREMIUM';
