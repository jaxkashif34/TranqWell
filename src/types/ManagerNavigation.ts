import type {
  CompositeScreenProps,
  NavigatorScreenParams,
  ParamListBase,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Conversation } from "./ChatType";
import { CChatNavigatorParamsList } from "./CustomerNavigation";
import { Meeting } from "./other";
import { BaseUser } from "./RolesType";

export type UnAuthManagerParamsList = {
  MGetStarted: undefined;
  MSignIn: undefined;
  MSignUp: undefined;
  MForgotPassword: undefined;
};

export type MChatNavigatorParamsList = {
  MChats: undefined;
  MChat: { conversation: Conversation };
  MChatDetails: { conversation: Conversation };
  MAddUser: undefined;
  MAddUserChat: { user: BaseUser };
};

export type MReminderNavigatorParamsList = {
  MReminders: undefined;
  MSetReminderData: undefined;
  MSetReminderUsers: {
    data: { title: string; description: string };
  };
};

export type MMeetingNavigatorParamsList = {
  MMeetings: undefined;
  MSetMeetingData: undefined;
  MSetMeetingUsers: {
    data: { title: string; description: string };
  };
  MMeetingDetails: { meeting: Meeting };
  CHome: undefined;
  JoinCallScreen: { meeting: Meeting; user: BaseUser };
};

export type MClientsNavigatorParamsList = {
  MClients: undefined;
  MClientProfile: { user: BaseUser };
};

export type MProfileNavigatorParamsList = {
  MProfile: undefined;
  MEditProfile: undefined;
  MProfileSettings: undefined;
  MChangePassword: undefined;
  MDeleteProfile: undefined;
  CMeetingDetails: { meeting: Meeting };
};

export type MHomeNavigatorParamsList = {
  MReminderNavigator: NavigatorScreenParams<MReminderNavigatorParamsList>;
  MChatNavigator: NavigatorScreenParams<CChatNavigatorParamsList>;
  MHome: undefined;
  MMeetingNavigator: NavigatorScreenParams<MMeetingNavigatorParamsList>;
  MClientsNavigator: NavigatorScreenParams<MClientsNavigatorParamsList>;
};

export type MAuthNavigatorParamsList = {
  MProfileNavigator: NavigatorScreenParams<MProfileNavigatorParamsList>;
  MReminderNavigator: NavigatorScreenParams<MReminderNavigatorParamsList>;
  MChatNavigator: NavigatorScreenParams<MChatNavigatorParamsList>;
  MHomeNavigator: NavigatorScreenParams<MHomeNavigatorParamsList>;
  MMeetingNavigator: NavigatorScreenParams<MMeetingNavigatorParamsList>;
  MClientsNavigator: NavigatorScreenParams<MClientsNavigatorParamsList>;
};

export type MAuthScreenProps<
  N extends ParamListBase,
  T extends keyof N
> = NativeStackScreenProps<N, T>;

export type MHomeTabScreenProps<T extends keyof MHomeNavigatorParamsList> =
  CompositeScreenProps<
    BottomTabScreenProps<MHomeNavigatorParamsList, T>,
    NativeStackScreenProps<MHomeNavigatorParamsList, T>
  >;
