// Anything exported under this directory that will be used outside of this directory will be exported from here
// customer types
import type {
  CustomerSliceType,
  CustomerStateType,
  StateCommentType,
} from './customerTypes';

// manager types
import type { ManagerSliceType, ManagerStateType } from './managerTypes';
import type {
  MHomeNavigatorParamsList,
  UnAuthManagerParamsList,
  MAuthScreenProps,
  MAuthNavigatorParamsList,
  MChatNavigatorParamsList,
  MClientsNavigatorParamsList,
  MHomeTabScreenProps,
  MMeetingNavigatorParamsList,
  MProfileNavigatorParamsList,
  MReminderNavigatorParamsList,
} from './ManagerNavigation';

import type { FontType } from './Fonts';
import type {
  FORGOT_PASSWORD_FIELDS,
  InitialFormStateType,
  SIGN_IN_FIELDS,
  SIGN_UP_FIELDS,
  Forms,
  FieldsForForm,
  M_SIGN_UP_FIELDS,
  DISCUSSION_FIELDS,
} from './Forms';

// Event Types

import type { EventSliceType, EventType } from './Event';

// Folder Level Types

type StatusType = 'idle' | 'pending' | 'rejected' | 'success';

// common types
import type {
  RootNavigationParamsList,
  RootScreenProps,
} from './RootNavigationType';
import type { UserType, BaseUser, CustomerLevel } from './RolesType';
import type { TabBarIconProps } from './TabBarIconProps';
import type { PersistedDataType } from './secureStoreTypes';
import type { UiSliceType } from './uiSliceType';
import type { Reminders } from './Reminders';
import type {
  ButtonVariants,
  Meeting,
  MeetingStateType,
  CreateMeetingType,
  MeetingDays,
  MeetingFrequency,
  DiscussionType,
  DiscussionUserType,
  DiscussionSocketType,
  CommentType,
  DiscussionDetail,
} from './other';

// customer types
import type {
  UnAuthCustomerParamsList,
  UnAuthCustomerScreenProps,
  AuthCustomerParamsList,
  AuthCustomerScreenProps,
  HomeNavigatorParamsList,
  CHomeTabsScreens,
  CEventNavigatorParamsList,
  CProfileNavigatorParamsList,
  CChatNavigatorParamsList,
  CTribeNavigatorParamsList,
} from './CustomerNavigation';
import type { MessageType, Conversation, SocketMessage } from './ChatType';

export type {
  FontType,
  FORGOT_PASSWORD_FIELDS,
  InitialFormStateType,
  SIGN_IN_FIELDS,
  SIGN_UP_FIELDS,
  CustomerSliceType,
  CustomerStateType,
  Forms,
  PersistedDataType,
  FieldsForForm,
  EventSliceType,
  EventType,
  UserType,
  StatusType,
  RootNavigationParamsList,
  RootScreenProps,
  MessageType,
  CEventNavigatorParamsList,
  ManagerSliceType,
  ManagerStateType,
  MAuthNavigatorParamsList,
  MChatNavigatorParamsList,
  MClientsNavigatorParamsList,
  MHomeTabScreenProps,
  MMeetingNavigatorParamsList,
  MProfileNavigatorParamsList,
  MReminderNavigatorParamsList,
  MHomeNavigatorParamsList,
  UnAuthManagerParamsList,
  MAuthScreenProps,
  UnAuthCustomerParamsList,
  ButtonVariants,
  UnAuthCustomerScreenProps,
  AuthCustomerParamsList,
  AuthCustomerScreenProps,
  HomeNavigatorParamsList,
  CHomeTabsScreens,
  TabBarIconProps,
  UiSliceType,
  CProfileNavigatorParamsList,
  CChatNavigatorParamsList,
  Conversation,
  M_SIGN_UP_FIELDS,
  Meeting,
  MeetingStateType,
  CreateMeetingType,
  MeetingDays,
  MeetingFrequency,
  BaseUser,
  CustomerLevel,
  SocketMessage,
  DiscussionType,
  DiscussionUserType,
  CTribeNavigatorParamsList,
  DISCUSSION_FIELDS,
  DiscussionSocketType,
  CommentType,
  Reminders,
  StateCommentType,
  DiscussionDetail,
};
