import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UiSliceType, UserType } from "~types";
// Define a type for the slice state

// Define the initial state using that type
const initialState: UiSliceType = {
  userRole: null,
  isShowTabBar: true,
  addChatConversationId: null,
  isTokenSent: false,
  userCall: {
    meeting: null,
    inCall: false,
  },
  isOnCallScreen: false,
  callObject: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    updateRole: (state, action: PayloadAction<UserType>) => {
      state.userRole = action.payload;
    },
    resetRole: (state) => {
      state.userRole = null;
    },
    toggleTabBar: (state, action: PayloadAction<boolean>) => {
      // state.isShowTabBar = action.payload;
    },
    setAddChatConversationId: (state, action: PayloadAction<number>) => {
      state.addChatConversationId = action.payload;
    },
    setTokenSent: (state, action: PayloadAction<boolean>) => {
      state.isTokenSent = action.payload;
    },
    setInCallState: (state, { payload }) => {
      state.userCall = payload;
    },
    setIsOnCallScreen: (state, { payload }) => {
      state.isOnCallScreen = payload;
    },
    setCallObjectState: (state, { payload }) => {
      state.callObject = payload;
    },
  },
});

export const {
  updateRole,
  resetRole,
  toggleTabBar,
  setAddChatConversationId,
  setTokenSent,
  setInCallState,
  setIsOnCallScreen,
  setCallObjectState,
} = uiSlice.actions;

export default uiSlice.reducer;
