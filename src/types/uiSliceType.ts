// ********************* Ui Types ************************

import { DailyCall } from "@daily-co/react-native-daily-js";
import { Meeting } from "./other";
import { UserType } from "./RolesType";

export type UiSliceType = {
  userRole: UserType | null;
  isShowTabBar: boolean;
  addChatConversationId: number | null;
  isTokenSent: boolean;
  userCall: {
    meeting: Meeting;
    inCall: boolean;
  };
  isOnCallScreen: boolean;
  callObject: DailyCall | null;
};
