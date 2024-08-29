// ********************* User Types ************************

import {
  CustomerLevel,
  DiscussionType,
  EventType,
  Meeting,
  Reminders,
  StatusType,
  UserType,
} from "~types";
import { Conversation, MessageType } from "./ChatType";
import { DiscussionDetail, DiscussionSocketType } from "./other";
import { MyCaseManager } from "./Reminders";

type CustomerStateType = {
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

export type StateCommentType = {
  discussion_id: number;
} & DiscussionSocketType;

type CustomerSliceType = {
  customer: CustomerStateType | null;
  status: StatusType;
  authenticated: boolean;
  events: EventType[];
  conversations: Conversation[];
  chats: Record<string, MessageType[]>;
  organizedMeetings: Meeting[];
  pinnedChats: Record<number, boolean>;
  maxPins: number;
  discussions: DiscussionType[];
  discussionComments: Record<string, StateCommentType[]>;
  activeDiscussion: null | DiscussionDetail;
  reminders: Reminders[];
  myCaseManager: MyCaseManager;
};

export type { CustomerSliceType, CustomerStateType };
