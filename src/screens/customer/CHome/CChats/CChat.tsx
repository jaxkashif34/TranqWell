import React, { FC, useEffect, useState } from "react";
import { AuthCustomerScreenProps } from "~types";
import { SButton, SText, SView } from "~base";
import { useAppDispatch, useAppSelector, useWebSocket } from "~hooks";
import { getMessages, toggleTabBar } from "~redux";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { ChatScreen, ScreenLoader, SendMessage, UserImage } from "~components";
import {
  getOtherUserId,
  getUserImage,
  getUserName,
  selectCustomerState,
} from "~helpers";
import { StatusBar } from "react-native";
import { Toast } from "~utils";
import { SafeAreaView } from "react-native-safe-area-context";

export const CChat: FC<AuthCustomerScreenProps<"CChat">> = ({
  navigation,
  route,
}) => {
  const { conversation } = route.params;
  const { customer, chats } = useAppSelector(selectCustomerState);
  const { socket } = useWebSocket(
    getOtherUserId(conversation, customer.user_id),
    customer
  );
  const dispatch = useAppDispatch();
  const [isDataLoaded, setDataLoaded] = useState(true);
  useEffect(() => {
    dispatch(toggleTabBar(false));
    const loadMessages = async () => {
      setDataLoaded(true);
      if (!chats[conversation.id]) {
        await dispatch(getMessages(conversation.conversation_id));
      }
      setDataLoaded(false);
    };
    loadMessages();

    return () => {
      dispatch(toggleTabBar(true));
    };
  }, []);

  const userImage = getUserImage(conversation, customer.user_id);
  const userName = getUserName(conversation, customer.user_id);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Toast />
      <SView className="flex flex-row justify-between items-center px-4  py-2">
        <SView>
          <SView className="flex flex-row items-center space-x-1">
            <SButton variant="text" onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={26}
                color="black"
                style={{
                  padding: 3,
                  borderRadius: 5,
                }}
              />
            </SButton>
            <SView className="flex flex-row space-x-2 items-center">
              <UserImage
                data={{
                  profile_image: userImage,
                  name: userName,
                }}
                size={40}
              />
              <SView>
                <SText className="font-osSemibold">{userName}</SText>
                <SText className="text-xs">last seen 20m ago</SText>
              </SView>
            </SView>
          </SView>
        </SView>
        <SButton
          className="border-customer border rounded-xl w-10 h-10 bg-white"
          variant="text"
          onPress={() => navigation.navigate("CChatDetails", { conversation })}
        >
          <SimpleLineIcons name="settings" size={24} color="black" />
        </SButton>
      </SView>
      {isDataLoaded && !chats[conversation.id] ? (
        <ScreenLoader />
      ) : (
        <ChatScreen
          chatWithUserId={getOtherUserId(conversation, customer.user_id)}
          yourId={customer.user_id}
          chats={chats}
          variant="customer"
        />
      )}

      <SendMessage socket={socket} variant="customer" />
    </SafeAreaView>
  );
};
