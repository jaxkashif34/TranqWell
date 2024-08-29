import { createAsyncThunk } from "@reduxjs/toolkit";
import { LogBox } from "react-native";
import type {
  BaseUser,
  Conversation,
  CreateMeetingType,
  FORGOT_PASSWORD_FIELDS,
  M_SIGN_UP_FIELDS,
  Meeting,
  MessageType,
  Reminders,
  SIGN_IN_FIELDS,
} from "~types";
import { makeRequest, API_PATHS, deleteRoom } from "~services";
import { getOtherUserId, getPassedMeetingLinks, showToast } from "~helpers";
import {
  AsyncThunkConfig,
  GetThunkAPI,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { CaseMangerToReminder } from "src/types/Reminders";

LogBox.ignoreLogs(["Require cycle"]);

export const createManager = createAsyncThunk(
  "manager/createManager",
  async (data: M_SIGN_UP_FIELDS, thunkApi) => {
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

export const loginManager = createAsyncThunk(
  "manager/loginManager",
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

      const mMeetings = await getManagerMeetings(response, thunkApi);

      const mConversations = await getMConversationsSimple(thunkApi, response);

      return {
        userData: {
          ...response,
          user_id: response.id,
        },
        additionalData: {
          mConversations,
          mMeetings,
        },
      };
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const forGetPassword = createAsyncThunk(
  "manager/forGetPassword",
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

export const getCustomers = createAsyncThunk(
  "manager/getCustomers",
  async (_, thunkApi) => {
    try {
      const response = await makeRequest(`${API_PATHS["invite-customer"]}`, {
        method: "GET",
      });
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const createMeeting = createAsyncThunk(
  "manager/createMeeting",
  async (data: CreateMeetingType, thunkApi) => {
    try {
      const response = await makeRequest(`${API_PATHS["create-meeting"]}`, {
        method: "POST",
        data: { ...data, link: data.meet_link },
      });
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getManagerMeetings = async (
  { id, access }: { id: number; access: string },
  thunkApi: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const response = await makeRequest(
      `${API_PATHS["meetings-by-case-manager"]}?id=${id}`,
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

export const getInitialManagerMeetings = createAsyncThunk(
  "manager/getMeetings",
  async (id: number, thunkApi) => {
    try {
      const response: Meeting[] = await makeRequest(
        `${API_PATHS["meetings-by-case-manager"]}?id=${id}`,
        {
          method: "GET",
        }
      );

      const links = getPassedMeetingLinks(response);

      for (const link of links) {
        const parts = link.split("/");
        const roomName = parts[parts.length - 1];
        const response = await deleteRoom(roomName);
      }

      return response.sort(
        (a, b) =>
          new Date(a.meeting_time).getTime() -
          new Date(b.meeting_time).getTime()
      );
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getMConversations = createAsyncThunk(
  "manager/getMConversations",
  async (response: { id: number; access: string }, thunkApi) => {
    try {
      return getMConversationsSimple(thunkApi, response);
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getMMessages = createAsyncThunk(
  "manager/getMMessages",
  async (conversation_id: number, thunkApi) => {
    try {
      const response: MessageType[] = await makeRequest(
        `${API_PATHS.conversations}${conversation_id}/messages/`,
        { method: "GET" }
      );
      return response.reverse();
    } catch (error) {
      throw error;
    }
  }
);

export const getMConversationsSimple = async (
  thunkApi: GetThunkAPI<AsyncThunkConfig>,
  { id, access }: { id: number; access: string }
) => {
  try {
    const response: Conversation[] = await makeRequest(
      `${API_PATHS.conversations}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    const filteredConversations = response.filter(
      (conversation) => conversation.last_message !== null
    );
    return filteredConversations.map((conversation) => ({
      ...conversation,
      id: getOtherUserId(conversation, id),
      conversation_id: conversation.id,
      isPinned: false,
    }));
  } catch (error) {
    throw thunkApi.rejectWithValue(error);
  }
};

export const uploadMImage = createAsyncThunk(
  "manager/uploadMImage",
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

export const addMBio = createAsyncThunk(
  "manager/addMBio",
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

export const addMSpecialization = createAsyncThunk(
  "manager/addMSpecialization",
  async (
    { specialization, user_id }: { specialization: string; user_id: number },
    thunkApi
  ) => {
    try {
      const response = await makeRequest(
        `${API_PATHS["add-specialization"]}?user_id=${user_id}`,
        {
          method: "POST",
          data: { specialization },
        }
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const addMCountry = createAsyncThunk(
  "manager/addMCountry",
  async (
    { country, user_id }: { country: string; user_id: number },
    thunkApi
  ) => {
    try {
      const response: BaseUser = await makeRequest(
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

export const addMCity = createAsyncThunk(
  "manager/addMCity",
  async ({ city, user_id }: { city: string; user_id: number }, thunkApi) => {
    try {
      const response: BaseUser = await makeRequest(
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

export const getMReminders = createAsyncThunk(
  "manager/getMReminders",
  async (user_id: number, thunkApi) => {
    try {
      const response: CaseMangerToReminder[] = await makeRequest(
        `${API_PATHS["case-manager-reminders"]}?user_id=${user_id}`,
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

export const createReminders = createAsyncThunk(
  "manager/createReminders",
  async (
    data: { title: string; description: string; date_time: string },
    thunkApi
  ) => {
    try {
      const response: Reminders = await makeRequest(
        `${API_PATHS["create-reminder"]}`,
        {
          method: "POST",
          data,
        }
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const inviteCustomerIntoReminders = createAsyncThunk(
  "manager/createReminders",
  async (data: { user_id: number; reminder_id: number }, thunkApi) => {
    try {
      const response: CaseMangerToReminder = await makeRequest(
        `${API_PATHS["invite-customer-to-reminder"]}?reminder_id=${data.reminder_id}&customer_id=${data.user_id}`,
        {
          method: "POST",
          data: { data },
        }
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

export const getLinkedCustomers = createAsyncThunk(
  "manager/getLinkedCustomers",
  async (user_id: number, thunkApi) => {
    try {
      const response = await makeRequest(
        `${API_PATHS["get-case-manager-customers"]}?user_id=${user_id}`,
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
