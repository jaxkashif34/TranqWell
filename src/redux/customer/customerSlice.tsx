import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  BaseUser,
  Conversation,
  CustomerSliceType,
  CustomerStateType,
  EventType,
  Meeting,
  MessageType,
  StateCommentType,
} from "~types";
import {
  addCBio,
  addCCountry,
  addCCity,
  createCustomer,
  customerForGetPassword,
  getConversations,
  getCustomerMeetings,
  getEvents,
  getMessages,
  loginCustomer,
  uploadCImage,
  createCDiscussionForum,
  getCDiscussionForums,
  getCDiscussionForumDetail,
  getCReminders,
  getCCaseManager,
} from "./api";
import { getOtherUserId, showToast } from "~helpers";
import { getErrorMessage } from "~helpers";
import { uploadMImage } from "../manager/api";
// Define a type for the slice state

// Define the initial state using that type
const initialState: CustomerSliceType = {
  customer: null,
  status: "idle",
  authenticated: false,
  events: [],
  conversations: [],
  chats: {},
  organizedMeetings: [],
  pinnedChats: {},
  maxPins: 2,
  discussions: [],
  discussionComments: {},
  activeDiscussion: null,
  reminders: [],
  myCaseManager: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    logOutCustomer: (state) => {
      state.customer = null;
      state.status = "idle";
      state.authenticated = false;
      showToast({
        type: "success",
        heading: "Success",
        subHeading: "logged out successfully",
      });
    },
    setCustomer: (state, action: PayloadAction<CustomerStateType>) => {
      state.customer = action.payload;
      state.authenticated = true;
    },
    setEvents: (state, action: PayloadAction<EventType[]>) => {
      state.events = action.payload;
    },
    addMessage: (state, action: PayloadAction<MessageType>) => {
      const otherUserId = getOtherUserId(
        action.payload,
        state.customer.user_id
      );
      if (state.chats[otherUserId]) {
        state.chats[otherUserId].push(action.payload);
      } else {
        state.chats[otherUserId] = [action.payload];
      }
    },
    updateLastMessage: (state, action: PayloadAction<MessageType>) => {
      const otherUserId = getOtherUserId(
        action.payload,
        state.customer.user_id
      );
      const conversation = state.conversations.find(
        (conversation) => conversation.id === otherUserId
      );
      if (conversation) {
        conversation.last_message = action.payload;
      }
    },
    addOrganizedMeetings: (state, action: PayloadAction<Meeting[]>) => {
      state.organizedMeetings = action.payload;
    },
    addConversation: (state, action: PayloadAction<Conversation>) => {
      const otherUserId = getOtherUserId(
        action.payload,
        state.customer.user_id
      );
      // if conversation already exists then update it and if not then add it
      const index = state.conversations.findIndex((c) => c.id === otherUserId);
      if (index !== -1) {
        state.conversations[index] = action.payload;
      } else {
        state.conversations.unshift(action.payload);
      }
    },
    addCPinnedChat: (state, action: PayloadAction<number>) => {
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
    removeCPinnedChat: (state, action: PayloadAction<number>) => {
      delete state.pinnedChats[action.payload];
    },
    addCComment: (state, action: PayloadAction<StateCommentType>) => {
      const { discussion_id } = action.payload;
      if (state.discussionComments[discussion_id]) {
        state.discussionComments[discussion_id].push(action.payload);
      } else {
        state.discussionComments[discussion_id] = [action.payload];
      }
    },
    resetState: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = initialState[key];
      });
    },
  },
  extraReducers: (builder) => {
    // crete customer cases
    builder.addCase(createCustomer.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createCustomer.fulfilled, (state) => {
      state.status = "success";
      showToast({
        type: "success",
        heading: "Success",
        subHeading: "Account created successfully",
      });
    });
    builder.addCase(createCustomer.rejected, (state, { payload }) => {
      state.status = "rejected";
      showToast({
        type: "error",
        heading: "Error",
        subHeading: getErrorMessage(payload),
      });
    });

    // login customer cases
    builder.addCase(loginCustomer.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      loginCustomer.fulfilled,
      (state, { payload }: PayloadAction<CustomerStateType>) => {
        state.customer = payload;
        state.status = "success";
        state.authenticated = true;
        showToast({
          type: "success",
          heading: "Success",
          subHeading: "Logged in successfully",
        });
      }
    );
    builder.addCase(loginCustomer.rejected, (state, { payload }) => {
      state.status = "rejected";
      showToast({
        type: "error",
        heading: "Error",
        subHeading: getErrorMessage(payload),
      });
    });

    // delete customer cases
    builder.addCase(customerForGetPassword.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(customerForGetPassword.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(customerForGetPassword.rejected, (state) => {
      state.status = "rejected";
    });

    // event cases
    builder.addCase(getEvents.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.events = action.payload;
    });
    builder.addCase(getEvents.rejected, (state) => {
      state.status = "rejected";
    });
    // conversation cases
    builder.addCase(getConversations.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.conversations = action.payload;
    });
    builder.addCase(getConversations.rejected, (state) => {
      state.status = "rejected";
    });
    // messages cases
    builder.addCase(getMessages.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.status = "success";
      const otherUserId = getOtherUserId(
        action.payload[0],
        state.customer.user_id
      );
      state.chats[otherUserId] = action.payload;
    });
    builder.addCase(getMessages.rejected, (state) => {
      state.status = "rejected";
    });
    // messages cases
    builder.addCase(getCustomerMeetings.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      getCustomerMeetings.fulfilled,
      (state, { payload }: PayloadAction<Meeting[]>) => {
        state.organizedMeetings = payload;
      }
    );
    builder.addCase(getCustomerMeetings.rejected, (state) => {
      state.status = "rejected";
    });
    // upload Customer Image
    builder.addCase(uploadCImage.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      uploadCImage.fulfilled,
      (state, action: PayloadAction<BaseUser>) => {
        state.status = "success";
        state.customer = {
          ...state.customer,
          profile_image: action.payload.profile_image,
        };
      }
    );
    builder.addCase(uploadMImage.rejected, (state) => {
      state.status = "rejected";
    });
    // add Customer Bio
    builder.addCase(addCBio.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addCBio.fulfilled, (state, action) => {
      state.status = "success";
      state.customer = { ...state.customer, ...action.payload };
    });
    builder.addCase(addCBio.rejected, (state) => {
      state.status = "rejected";
    });
    // add Manager Country
    builder.addCase(addCCountry.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addCCountry.fulfilled, (state, action) => {
      state.status = "success";
      state.customer = {
        ...state.customer,
        user_id: action.payload.id,
        country: action.payload.country,
      };
    });
    builder.addCase(addCCountry.rejected, (state) => {
      state.status = "rejected";
    });

    // add Manager Country
    builder.addCase(addCCity.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addCCity.fulfilled, (state, action) => {
      state.status = "success";
      state.customer = {
        ...state.customer,
        user_id: action.payload.id,
        city: action.payload.city,
      };
    });
    builder.addCase(addCCity.rejected, (state) => {
      state.status = "rejected";
    });
    // create Discussion
    builder.addCase(createCDiscussionForum.pending, (state) => {
      state.status = "pending";
      // state.discussions = [];
    });
    builder.addCase(createCDiscussionForum.fulfilled, (state, action) => {
      state.status = "success";
      state.discussions = [action.payload, ...state.discussions];
    });
    builder.addCase(createCDiscussionForum.rejected, (state) => {
      state.status = "rejected";
    });
    // get Discussion forums
    builder.addCase(getCDiscussionForums.pending, (state) => {
      state.status = "pending";
      state.discussions = [];
    });
    builder.addCase(getCDiscussionForums.fulfilled, (state, action) => {
      state.status = "success";
      state.discussions = [...state.discussions, ...action.payload];
    });
    builder.addCase(getCDiscussionForums.rejected, (state) => {
      state.status = "rejected";
    });
    // get active Discussion forums data
    builder.addCase(getCDiscussionForumDetail.fulfilled, (state, action) => {
      state.status = "success";
      state.activeDiscussion = action.payload;
    });
    // get customer reminders
    builder.addCase(getCReminders.fulfilled, (state, action) => {
      state.reminders = action.payload;
    });
    // get case manager data
    builder.addCase(getCCaseManager.fulfilled, (state, action) => {
      state.myCaseManager = action.payload;
    });
  },
});

export const {
  logOutCustomer,
  setCustomer,
  setEvents,
  addMessage,
  updateLastMessage,
  addOrganizedMeetings,
  addConversation,
  addCPinnedChat,
  removeCPinnedChat,
  addCComment,
  resetState,
} = customerSlice.actions;

export default customerSlice.reducer;
