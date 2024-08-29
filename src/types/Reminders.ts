import { BaseUser } from "./RolesType";

export type Reminders = {
  id: number;
  title: string;
  description: string;
  date_time: string;
  creator: BaseUser;
};

export type CaseMangerToReminder = Reminders & {
  customers: BaseUser[];
};

export type MyCaseManager = {
  customer: Omit<
    BaseUser,
    "user_role" | "surgical_specialization" | "customer_level"
  >;
  case_manager: Omit<
    BaseUser,
    "user_role" | "surgical_specialization" | "customer_level"
  >;
};
