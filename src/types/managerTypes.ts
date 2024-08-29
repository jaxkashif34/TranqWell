// ********************* User Types ************************

import {
  BaseUser,
  Conversation,
  CustomerLevel,
  Meeting,
  MessageType,
  Reminders,
  StatusType,
  UserType,
} from "~types";
import { CaseMangerToReminder } from "./Reminders";

export type ManagerStateType = {
  name: string;
  user_id: number;
  email: string;
  user_role: UserType;
  refresh: string;
  access: string;
  profile_image: null | string;
  bio: null | string;
  city: null | string;
  country: null | string;
  specialization: null | string;
  surgical_specialization: null | string;
  customer_level: null | CustomerLevel;
};

export type ManagerSliceType = {
  manager: ManagerStateType | null;
  status: StatusType;
  authenticated: boolean;
  customers: BaseUser[];
  organizedMeetings: Meeting[];
  conversations: Conversation[];
  chats: Record<string, MessageType[]>;
  pinnedChats: Record<number, boolean>;
  maxPins: number;
  reminders: CaseMangerToReminder[];
  linkedCustomers: { case_manager: BaseUser; customers: BaseUser[] };
};
