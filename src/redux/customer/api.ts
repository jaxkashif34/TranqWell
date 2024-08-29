import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  FORGOT_PASSWORD_FIELDS,
  SIGN_IN_FIELDS,
  SIGN_UP_FIELDS,
  EventType,
  Conversation,
  MessageType,
  DiscussionType,
  DISCUSSION_FIELDS,
  DiscussionDetail,
  Reminders,
} from "~types";
import { makeRequest, API_PATHS } from "~services";
import axios from "axios";
import { getOtherUserId, showToast, storeValue } from "~helpers";
import {
  AsyncThunkConfig,
  GetThunkAPI,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { addOrganizedMeetings } from "./customerSlice";
import { MyCaseManager } from "src/types/Reminders";

const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async (data: SIGN_UP_FIELDS, thunkApi) => {
    try {
      const response = await makeRequest(`${API_PATHS.register}`, {
        method: "POST",
        data,
      });
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.error(error.email[0]);
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const loginCustomer = createAsyncThunk(
  "customer/loginCustomer",
  async (data: SIGN_IN_FIELDS, thunkApi) => {
    try {
      const response = await makeRequest(`${API_PATHS.login}`, {
        method: "POST",
        data,
      });
      // @ts-expect-error
      if (response["user_role"] !== thunkApi.getState().ui.userRole) {
        showToast({
          type: "error",
          heading: "Error",
          subHeading: "User role mismatch",
        });
        throw thunkApi.rejectWithValue("User role mismatch");
      }

      thunkApi.dispatch(
        addOrganizedMeetings(await getCMeetings(response, thunkApi))
      );
      return {
        ...response,
        user_id: response.id,
      };
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const customerForGetPassword = createAsyncThunk(
  "customer/forGetPassword",
  async (data: FORGOT_PASSWORD_FIELDS, thunkApi) => {
    // need to alter it later when backend is ready
    try {
      const response = await makeRequest(``, {
        method: "POST",
        data,
      });
      return response.data;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const getEvents = createAsyncThunk(
  "customer/getEvents",
  async (_, thunkApi) => {
    try {
      const response: EventType[] = await makeRequest(
        `${API_PATHS["get-events"]}`,
        {
          method: "GET",
        }
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const getConversations = createAsyncThunk(
  "customer/getConversations",
  async (user_id: number, thunkApi) => {
    try {
      const response: Conversation[] = await makeRequest(
        `${API_PATHS.conversations}`,
        {
          method: "GET",
        }
      );
      const filteredConversations = response.filter(
        (conversation) => conversation.last_message !== null
      );
      return filteredConversations.map((conversation) => ({
        ...conversation,
        id: getOtherUserId(conversation, user_id),
        conversation_id: conversation.id,
        isPinned: false,
      }));
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const getMessages = createAsyncThunk(
  "customer/getMessages",
  async (conversation_id: number, thunkApi) => {
    try {
      const response: MessageType[] = await makeRequest(
        `${API_PATHS.conversations}${conversation_id}/messages/`,
        {
          method: "GET",
        }
      );
      return response.reverse();
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getCustomerMeetings = createAsyncThunk(
  "customer/getCustomerMeetings",
  async (user_id: number, thunkApi) => {
    try {
      const response = await makeRequest(
        `${API_PATHS["meetings-by-customer"]}?id=${user_id}`,
        {
          method: "GET",
        }
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getCMeetings = async (
  { id, access }: { id: number; access: string },
  thunkApi: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const response = await makeRequest(
      `${API_PATHS["meetings-by-customer"]}?id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw thunkApi.rejectWithValue(error);
  }
};

export const uploadCImage = createAsyncThunk(
  "customer/uploadCImage",
  async (
    { formData, user_id }: { formData: FormData; user_id: number },
    thunkApi
  ) => {
    try {
      const response = await makeRequest(
        `${API_PATHS["upload-image"]}?user_id=${user_id}`,
        {
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const addCBio = createAsyncThunk(
  "customer/addCBio",
  async ({ bio, user_id }: { bio: string; user_id: number }, thunkApi) => {
    try {
      const response = await makeRequest(
        `${API_PATHS["add-bio"]}?user_id=${user_id}`,
        {
          method: "POST",
          data: { bio },
        }
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const addCCountry = createAsyncThunk(
  "customer/addCCountry",
  async (
    { country, user_id }: { country: string; user_id: number },
    thunkApi
  ) => {
    try {
      const response = await makeRequest(
        `${API_PATHS["add-country"]}?user_id=${user_id}`,
        {
          method: "POST",
          data: { country },
        }
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const addCCity = createAsyncThunk(
  "customer/addCCity",
  async ({ city, user_id }: { city: string; user_id: number }, thunkApi) => {
    try {
      const response = await makeRequest(
        `${API_PATHS["add-city"]}?user_id=${user_id}`,
        {
          method: "POST",
          data: { city },
        }
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const searchCUser = createAsyncThunk(
  "customer/searchCUser",
  async (searchQuery: string, thunkApi) => {
    try {
      const response = await makeRequest(
        `${API_PATHS["search-user"]}?name=${searchQuery}`,
        {
          method: "GET",
        }
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const createCDiscussionForum = createAsyncThunk(
  "customer/createCDiscussionForum",
  async (data: DISCUSSION_FIELDS, thunkApi) => {
    try {
      const response: DiscussionType = await makeRequest(
        `${API_PATHS["create-discussion-forum"]}`,
        {
          data,
          method: "POST",
        }
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getCDiscussionForums = createAsyncThunk(
  "customer/getCDiscussionForums",
  async (_, thunkApi) => {
    try {
      const response: DiscussionType[] = await makeRequest(
        `${API_PATHS["get-all-dicussion-forum"]}`,
        {
          method: "GET",
        }
      );
      return response.reverse();
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getCDiscussionForumDetail = createAsyncThunk(
  "customer/getCDiscussionForumDetail",
  async (discussion_id: number, thunkApi) => {
    try {
      const response: DiscussionDetail = await makeRequest(
        `${API_PATHS["get-discussion-forum-detail"]}?discussion_id=${discussion_id}`,
        {
          method: "GET",
        }
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getCReminders = createAsyncThunk(
  "customer/getCReminders",
  async (user_id: number, thunkApi) => {
    try {
      const response: Reminders[] = await makeRequest(
        `${API_PATHS["customer-reminders"]}?user_id=${user_id}`,
        {
          method: "GET",
        }
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getCCaseManager = createAsyncThunk(
  "customer/getCCaseManager",
  async (customer_id: number, thunkApi) => {
    try {
      const response: MyCaseManager = await makeRequest(
        `${API_PATHS["get-case-manager"]}?customer_id=${customer_id}`,
        {
          method: "GET",
        }
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export {
  customerForGetPassword,
  getEvents,
  createCustomer,
  loginCustomer,
  getConversations,
  getMessages,
};
