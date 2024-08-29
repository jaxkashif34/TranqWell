import { BaseUser, UserType } from './RolesType';

export type ButtonVariants =
  | 'text'
  | 'outline'
  | 'attention'
  | 'zoom'
  | 'councilor'
  | 'customer'
  | 'manager'
  | 'disabled'
  | 'alert'
  | 'emergency'
  | 'warning';

export type MeetingFrequency = 'Daily' | 'Alternative Days' | '3 Days a Week';
export type MeetingDays =
  | 'Mon'
  | 'Tue'
  | 'Wed'
  | 'Thur'
  | 'Fri'
  | 'Sat'
  | 'Sun';

export type Meeting = {
  id: number;
  organizer_id: number;
  organizer_data: {
    id: number;
    name: string;
    profile_image: string;
  };
  title: string;
  description: string;
  frequency: MeetingFrequency;
  days: string;
  link: string;
  meeting_time: string;
  participant_id: number;
  participant_data: {
    id: number;
    name: string;
    profile_image: string;
  };
};

export type CreateMeetingType = {
  organizer_id: number;
  title: string;
  description: string;
  frequency: string;
  days: string;
  meet_link: string;
  meeting_time: string;
  participant_id: number;
};

export type MeetingStateType = {
  frequency: null | 'Daily' | 'Alternative Days' | '3 Days a Week' | string;
  days:
    | null
    | ('Mon' | 'Tue' | 'Wed' | 'Thur' | 'Fri' | 'Sat' | 'Sun' | string)[];
  dateTime: string | null;
};

export type DiscussionUserType = Omit<
  BaseUser,
  | 'customer_level'
  | 'bio'
  | 'specialization'
  | 'surgical_specialization'
  | 'user_role'
>;
export type CommentType = {
  id: number;
  content: string;
  created_at: string;
  discussion_id: number;
  user: DiscussionUserType;
};
export type DiscussionDetail = Omit<DiscussionType, 'id' | 'creator'> & {
  comments: CommentType[];
  discussion_id: 5;
};

export type DiscussionType = {
  id: number;
  creator_details: DiscussionUserType;
  title: string;
  description: string;
  created_at: string;
  creator: number;
};

export type DiscussionSocketType = {
  message: {
    content: string;
    created_at: string;
    id: number;
    user: DiscussionUserType & { user_role: UserType };
  };
};
