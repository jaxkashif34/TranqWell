// Anything exported under this directory that will be used outside of this directory will be exported from here
import { CForgotPassword } from "./customer/UnAuthScreens/CForgotPassword/CForgotPassword";
import { CSignIn } from "./customer/UnAuthScreens/CSignIn/CSignIn";
import { CSignUp } from "./customer/UnAuthScreens/CSignUp/CSignUp";
import { CGetStarted } from "./customer/UnAuthScreens/CGetStarted/CGetStarted";
import { PreSplash } from "./splashScreen/PreSplash";
import { SplashScreen } from "./splashScreen";

// CHome Routes
import { CHome } from "./customer/CHome/CHome";
import { CChats } from "./customer/CHome/CChats/CChats";
import { CAddUser } from "./customer/CHome/CChats/CAddUser";
import { CEvents } from "./customer/CHome/CEvents/CEvents";
import { CDiscussionForums } from "./customer/CHome/CForums/CDiscussionForums";
import { CDiscussionForumDetails } from "./customer/CHome/CForums/CDiscussionForumDetails";
import { CCreateDiscussionForum } from "./customer/CHome/CForums/CCreateDiscussionForum";
import { CReminders } from "./customer/CHome/CReminders/CReminders";

// Profile Routes
import { CProfile } from "./customer/CProfile/CProfile";
import { CChangePassword } from "./customer/CProfile/CChangePassword/CChangePassword";
import { CDeleteProfile } from "./customer/CProfile/CDeleteProfile/CDeleteProfile";
import { CEditProfile } from "./customer/CProfile/CEditProfile/CEditProfile";
import { CProfileSettings } from "./customer/CProfile/CProfileSettings/CProfileSettings";
import { CEventDetails } from "./customer/CHome/CEvents/CEventDetails/CEventDetails";

// common screens
import { SelectUser } from "./common/SelectUser";
import { JoinCallScreen } from "./common/JoinCallScreen";
// customer
import { CChat } from "./customer/CHome/CChats/CChat";
import { CChatDetails } from "./customer/CHome/CChats/CChatDetails";
// manager
import { MForgotPassword } from "./manager/UnAuthScreens/MForgotPassword/MForgotPassword";
import { MGetStarted } from "./manager/UnAuthScreens/MGetStarted/MGetStarted";
import { MSignIn } from "./manager/UnAuthScreens/MSignIn/MSignIn";
import { MSignUp } from "./manager/UnAuthScreens/MSignUp/MSignUp";
import { MHome } from "./manager/MHome/MHome";
import { MChats } from "./manager/MHome/MChats/MChats";
import { MChat } from "./manager/MHome/MChats/MChat";
import { MChatDetails } from "./manager/MHome/MChats/MChatDetails";
import { MPatients } from "./manager/MHome/MPatients/MPatients";
import { MProfile } from "./manager/MProfile/MProfile";
import { MChangePassword } from "./manager/MProfile/MChangePassword/MChangePassword";
import { MDeleteProfile } from "./manager/MProfile/MDeleteProfile/MDeleteProfile";
import { MEditProfile } from "./manager/MProfile/MEditProfile/MEditProfile";
import { MProfileSettings } from "./manager/MProfile/MProfileSettings/MProfileSettings";

import { MReminders } from "./manager/MReminders/MReminders";
import { MSetReminderUsers } from "./manager/MReminders/MSetMeetingUsers";
import { MSetReminderData } from "./manager/MReminders/MSetReminderData";

import { MMeetings } from "./manager/MMeetings/MMeetings";
import { MMeetingDetails } from "./manager/MMeetings/MMeetingDetails";
import { MSetMeetingData } from "./manager/MMeetings/MSetMeetingData";
import { MSetMeetingUsers } from "./manager/MMeetings/MSetMeetingUsers";
import { CMeetingDetails } from "./customer/CProfile/CMeetings/CMeetingDetails";
import { CAddUserChat } from "./customer/CHome/CChats/CAddUserChat";
import { MAddUserChat } from "./manager/MHome/MChats/MAddUserChat";
import { MAddUser } from "./manager/MHome/MChats/MAddUser";
import { MClients } from "./manager/MClients/MClients";
import { MClientProfile } from "./manager/MClients/MClientProfile";

export {
  CForgotPassword,
  CSignIn,
  CSignUp,
  CGetStarted,
  PreSplash,
  SplashScreen,
  CHome,
  CChats,
  CEvents,
  CDiscussionForums,
  CReminders,
  CProfile,
  CChangePassword,
  CDeleteProfile,
  CEditProfile,
  CProfileSettings,
  MForgotPassword,
  MGetStarted,
  MSignIn,
  MSignUp,
  CEventDetails,
  SelectUser,
  CChat,
  CChatDetails,
  MHome,
  MChats,
  MChat,
  MChatDetails,
  MPatients,
  MReminders,
  MProfile,
  MChangePassword,
  MDeleteProfile,
  MEditProfile,
  MProfileSettings,
  MMeetings,
  MMeetingDetails,
  MSetMeetingData,
  MSetMeetingUsers,
  CMeetingDetails,
  JoinCallScreen,
  CAddUser,
  CAddUserChat,
  MAddUserChat,
  MAddUser,
  CDiscussionForumDetails,
  CCreateDiscussionForum,
  MSetReminderUsers,
  MSetReminderData,
  MClients,
  MClientProfile,
};
