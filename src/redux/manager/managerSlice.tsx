import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  BaseUser,
  Conversation,
  ManagerSliceType,
  ManagerStateType,
  Meeting,
  MessageType,
  Reminders,
} from "~types";
import {
  createManager,
  forGetPassword,
  loginManager,
  getCustomers,
  createMeeting,
  getInitialManagerMeetings,
  getMConversations,
  uploadMImage,
  addMBio,
  addMSpecialization,
  addMCity,
  addMCountry,
  getMMessages,
  getMReminders,
  getLinkedCustomers,
} from "./api";
import { getOtherUserId, showToast } from "~helpers";
import { getErrorMessage } from "~helpers";
import { CaseMangerToReminder } from "src/types/Reminders";
// Define a type for the slice state

// Define the initial state using that type

const initialState: ManagerSliceType = {
  manager: null,
  status: "idle",
  authenticated: false,
  customers: [],
  organizedMeetings: [],
  conversations: [],
  chats: {},
  pinnedChats: {},
  maxPins: 3,
  reminders: [],
  linkedCustomers: null,
};

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    logOutManager: (state) => {
      state.manager = null;
      state.status = "idle";
      state.authenticated = false;
      showToast({
        type: "success",
        heading: "Success",
        subHeading: "logged out successfully",
      });
    },
    setManager: (state, action: PayloadAction<ManagerStateType>) => {
      state.manager = action.payload;
      state.authenticated = true;
    },
    setOrganizedMeetings: (state, action: PayloadAction<Meeting[]>) => {
      state.organizedMeetings = action.payload;
    },
    addMMessage: (state, action: PayloadAction<MessageType>) => {
      const otherUserId = getOtherUserId(action.payload, state.manager.user_id);
      if (state.chats[otherUserId]) {
        state.chats[otherUserId].push(action.payload);
      } else {
        state.chats[otherUserId] = [action.payload];
      }
    },
    setMConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    mUpdateLastMessage: (state, action: PayloadAction<MessageType>) => {
      const otherUserId = getOtherUserId(action.payload, state.manager.user_id);
      const conversation = state.conversations.find(
        (conversation) => conversation.id === otherUserId
      );
      if (conversation) {
        conversation.last_message = action.payload;
      }
    },
    addMConversation: (state, action: PayloadAction<Conversation>) => {
      const otherUserId = getOtherUserId(action.payload, state.manager.user_id);
      // if conversation already exists then update it and if not then add it
      const index = state.conversations.findIndex((c) => c.id === otherUserId);
      if (index !== -1) {
        state.conversations[index] = action.payload;
      } else {
        state.conversations.unshift(action.payload);
      }
    },
    addMPinnedChat: (state, action: PayloadAction<number>) => {
      if (Object.keys(state.pinnedChats).length < state.maxPins) {
        state.pinnedChats[action.payload] = true;
      } else {
        showToast({
          type: "error",
          heading: "Max Pins Reached",
          subHeading: `You can only pin ${state.maxPins} chats at a time`,
        });
      }
    },
    removeMPinnedChat: (state, action: PayloadAction<number>) => {
      delete state.pinnedChats[action.payload];
    },
    addRemindersIntoState: (
      state,
      action: PayloadAction<CaseMangerToReminder>
    ) => {
      state.reminders.push(action.payload);
    },
    resetMState: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = initialState[key];
      });
    },
  },
  extraReducers: (builder) => {
    // crete manager cases
    builder.addCase(createManager.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createManager.fulfilled, (state) => {
      state.status = "success";
      showToast({
        type: "success",
        heading: "Success",
        subHeading: "Account created successfully",
      });
    });
    builder.addCase(createManager.rejected, (state, { payload }) => {
      state.status = "rejected";
      showToast({
        type: "error",
        heading: "Error",
        subHeading: getErrorMessage(payload),
      });
    });

    // login manager cases
    builder.addCase(loginManager.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(loginManager.fulfilled, (state, { payload }) => {
      state.manager = payload.userData;
      state.status = "success";
      state.authenticated = true;
      state.organizedMeetings = payload.additionalData.mMeetings;
      state.conversations = payload.additionalData.mConversations;
    });
    builder.addCase(loginManager.rejected, (state, { payload }) => {
      state.status = "rejected";
      showToast({
        type: "error",
        heading: "Error",
        subHeading: getErrorMessage(payload),
      });
    });

    // forget manager cases
    builder.addCase(forGetPassword.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(forGetPassword.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(forGetPassword.rejected, (state) => {
      state.status = "rejected";
    });

    // get customers
    builder.addCase(getCustomers.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      getCustomers.fulfilled,
      (state, { payload }: PayloadAction<BaseUser[]>) => {
        state.status = "success";
        const uniqueCustomer = state.customers
          .concat(payload)
          .filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.id === item.id)
          );
        state.customers = uniqueCustomer;
      }
    );
    builder.addCase(getCustomers.rejected, (state) => {
      state.status = "rejected";
    });
    // create meeting
    builder.addCase(createMeeting.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      createMeeting.fulfilled,
      (state, { payload }: PayloadAction<Meeting>) => {
        state.status = "success";
        const newMeeting = payload;
        const insertIndex = state.organizedMeetings.findIndex(
          (meeting) =>
            new Date(meeting.meeting_time) > new Date(newMeeting.meeting_time)
        );
        if (insertIndex !== -1) {
          state.organizedMeetings.splice(insertIndex, 0, newMeeting);
        } else {
          state.organizedMeetings.push(newMeeting);
        }
        // state.organizedMeetings = [...state.organizedMeetings, payload];
      }
    );
    builder.addCase(createMeeting.rejected, (state) => {
      state.status = "rejected";
    });
    // get manager meetings
    builder.addCase(getInitialManagerMeetings.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      getInitialManagerMeetings.fulfilled,
      (state, { payload }: PayloadAction<Meeting[]>) => {
        state.status = "success";
        state.organizedMeetings = payload;
      }
    );
    builder.addCase(getInitialManagerMeetings.rejected, (state) => {
      state.status = "rejected";
    });
    // conversation cases
    builder.addCase(getMConversations.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getMConversations.fulfilled, (state, action) => {
      state.conversations = action.payload;
    });
    builder.addCase(getMConversations.rejected, (state) => {
      state.status = "rejected";
    });
    // upload Manager Image
    builder.addCase(uploadMImage.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      uploadMImage.fulfilled,
      (state, action: PayloadAction<BaseUser>) => {
        state.status = "success";
        state.manager = {
          ...state.manager,
          profile_image: action.payload.profile_image,
        };
      }
    );
    builder.addCase(uploadMImage.rejected, (state) => {
      state.status = "rejected";
    });
    // add Manager Bio
    builder.addCase(addMBio.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addMBio.fulfilled, (state, action) => {
      state.status = "success";
      state.manager = { ...state.manager, bio: action.payload.bio };
    });
    builder.addCase(addMBio.rejected, (state) => {
      state.status = "rejected";
    });
    // add Manager Specialization
    builder.addCase(addMSpecialization.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addMSpecialization.fulfilled, (state, action) => {
      state.status = "success";
      state.manager = {
        ...state.manager,
        specialization: action.payload.specialization,
      };
    });
    builder.addCase(addMSpecialization.rejected, (state) => {
      state.status = "rejected";
    });
    // add Manager Country
    builder.addCase(addMCountry.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addMCountry.fulfilled, (state, action) => {
      state.status = "success";
      state.manager = {
        ...state.manager,
        user_id: action.payload.id,
        country: action.payload.country,
      };
    });
    builder.addCase(addMCountry.rejected, (state) => {
      state.status = "rejected";
    });

    // add Manager Country
    builder.addCase(addMCity.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addMCity.fulfilled, (state, action) => {
      state.status = "success";
      state.manager = {
        ...state.manager,
        user_id: action.payload.id,
        city: action.payload.city,
      };
    });
    builder.addCase(addMCity.rejected, (state) => {
      state.status = "rejected";
    });
    // add Manager Messages
    builder.addCase(getMMessages.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getMMessages.fulfilled, (state, action) => {
      const otherUserId = getOtherUserId(
        action.payload[0],
        state.manager.user_id
      );
      state.status = "success";
      state.chats[otherUserId] = action.payload;
    });
    builder.addCase(getMMessages.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(getMReminders.fulfilled, (state, action) => {
      state.reminders = action.payload;
    });
    builder.addCase(getLinkedCustomers.fulfilled, (state, action) => {
      state.linkedCustomers = action.payload;
    });
  },
});

export const {
  logOutManager,
  setManager,
  setOrganizedMeetings,
  addMMessage,
  mUpdateLastMessage,
  setMConversations,
  addMConversation,
  addMPinnedChat,
  removeMPinnedChat,
  addRemindersIntoState,
  resetMState,
} = managerSlice.actions;

export default managerSlice.reducer;
