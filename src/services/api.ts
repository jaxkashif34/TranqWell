import Axios, { AxiosResponse } from "axios";
import { showToast } from "~helpers";

export const BASE_URL = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}`;
export const API_PATHS = {
  register: "/register/",
  login: "/login/",
  "refresh-token": "/refresh-token/",
  "get-events": "/get-events/",
  "socket-url": `ws://${process.env.EXPO_PUBLIC_IP_ADDRESS}/ws/chat/`,
  conversations: "/chat/conversations/",
  "invite-customer": "/invite-customer/",
  "create-meeting": "/create-meeting/",
  "meetings-by-case-manager": "/meetings/by-case-manager/",
  "meetings-by-customer": "/meetings/by-customer/",
  "upload-image": "/upload-image/",
  "add-bio": "/add-bio/",
  "add-specialization": "/add-specialization/",
  "add-country": "/add-country/",
  "add-city": "/add-city/",
  "search-user": "/search-user/",
  "create-discussion-forum": "/create-discussion-forum/",
  "get-all-dicussion-forum": "/get-all-dicussion-forum/",
  "ws-discussions": `ws://${process.env.EXPO_PUBLIC_IP_ADDRESS}/ws/discussions/`,
  "get-discussion-forum-detail": "/get-discussion-forum-detail/",
  "get-device-token": "/get-device-token/",
  "customer-reminders": "/customer-reminders/",
  "case-manager-reminders": "/case-manager-reminders/",
  "create-reminder": "/create-reminder/",
  "all-customers": "/all-customers/",
  "invite-customer-to-reminder": "/invite-customer-to-reminder/",
  "get-case-manager": "/get-case-manager/",
  "get-case-manager-customers": "/get-case-manager-customers/",
} as const;

const DAILY_BASE_URL = "https://api.daily.co/v1/";

const api = Axios.create({
  baseURL: DAILY_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_DAILY_API_KEY}`,
  },
});

export async function createRoomUrl(data?: Record<string, any>): Promise<{
  id: string;
  name: string;
  api_created: boolean;
  privacy: "public" | "private";
  url: string;
  created_at: string;
  config: Record<string, any>;
}> {
  return api("/rooms", {
    method: "POST",
    data,
  })
    .then((res: AxiosResponse) => res.data)
    .catch((error) => {
      showToast({
        heading: "Error",
        subHeading: "Failed to create room",
        type: "error",
      });

      console.error(`Error in Make Request: createRoomUrl ${error}`);
      throw error.response.data ?? "Error in Make Request";
    });
}

export async function deleteRoom(roomName: string) {
  return api(`/rooms/${roomName}`, {
    method: "DELETE",
  })
    .then((res: AxiosResponse) => res.data)
    .catch((error) => {
      showToast({
        heading: "Error",
        subHeading: "Failed to delete room",
        type: "error",
      });

      console.error(`Error in Make Request: deleteRoom`, error);
      throw error ?? "Error in Make Request";
    });
}
