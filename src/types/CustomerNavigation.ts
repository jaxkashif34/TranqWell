import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { EventType } from "./Event";
import { Conversation } from "./ChatType";
import { DiscussionType, Meeting } from "./other";
import { BaseUser } from "./RolesType";

export type UnAuthCustomerParamsList = {
  CGetStarted: undefined;
  CSignIn: undefined;
  CSignUp: undefined;
  CForgotPassword: undefined;
};

export type CEventNavigatorParamsList = {
  CEvents: undefined;
  CEventDetails: EventType;
};

export type CChatNavigatorParamsList = {
  CChats: undefined;
  CChat: { conversation: Conversation };
  CChatDetails: { conversation: Conversation };
  CAddUser: undefined;
  CAddUserChat: { user: BaseUser };
};

export type CProfileNavigatorParamsList = {
  CProfile: undefined;
  CEditProfile: undefined;
  CProfileSettings: undefined;
  CChangePassword: undefined;
  CDeleteProfile: undefined;
  CEventDetails: EventType;
  CMeetingDetails: { meeting: Meeting };
};

export type HomeNavigatorParamsList = {
  CChatNavigator: NavigatorScreenParams<CChatNavigatorParamsList>;
  CReminders: undefined;
  CHome: undefined;
  CEventNavigator: NavigatorScreenParams<CEventNavigatorParamsList>;
  CTribeNavigator: NavigatorScreenParams<CTribeNavigatorParamsList>;
};

export type CTribeNavigatorParamsList = {
  CDiscussionForums: undefined;
  CDiscussionForumDetails: { discussionForum: DiscussionType };
  CCreateDiscussionForum: undefined;
};

export type AuthCustomerParamsList = {
  CProfileNavigator: NavigatorScreenParams<CProfileNavigatorParamsList>;
  CHomeNavigator: NavigatorScreenParams<HomeNavigatorParamsList>;
  CCaseManagerNavigator: undefined;
  CChatNavigator: NavigatorScreenParams<CChatNavigatorParamsList>;
  CTribeNavigator: NavigatorScreenParams<CTribeNavigatorParamsList>;
  CEventNavigator: NavigatorScreenParams<CEventNavigatorParamsList>;
  CCouncilorNavigator: undefined;
  JoinCallScreen: { meeting: Meeting; user: BaseUser };
} & HomeNavigatorParamsList &
  CEventNavigatorParamsList &
  CProfileNavigatorParamsList &
  CChatNavigatorParamsList &
  CTribeNavigatorParamsList;

export type CHomeTabsScreens<T extends keyof HomeNavigatorParamsList> =
  NativeStackScreenProps<HomeNavigatorParamsList, T>;

export type UnAuthCustomerScreenProps<
  T extends keyof UnAuthCustomerParamsList
> = NativeStackScreenProps<UnAuthCustomerParamsList, T>;

export type AuthCustomerScreenProps<T extends keyof AuthCustomerParamsList> =
  CompositeScreenProps<
    BottomTabScreenProps<AuthCustomerParamsList, T>,
    NativeStackScreenProps<AuthCustomerParamsList, T>
  >;
