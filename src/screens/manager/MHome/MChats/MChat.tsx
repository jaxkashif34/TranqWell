import React, { FC, useEffect, useState } from "react";
import { MAuthScreenProps, MChatNavigatorParamsList } from "~types";
import { SButton, SText, SView } from "~base";
import { useAppDispatch, useAppSelector, useWebSocket } from "~hooks";
import { getMMessages, toggleTabBar } from "~redux";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { ChatScreen, ScreenLoader, SendMessage, UserImage } from "~components";
import {
  getOtherUserId,
  getUserImage,
  getUserName,
  selectManagerState,
} from "~helpers";
import { Toast } from "~utils";
import { SafeAreaView } from "react-native-safe-area-context";

export const MChat: FC<MAuthScreenProps<MChatNavigatorParamsList, "MChat">> = ({
  navigation,
  route,
}) => {
  const { conversation } = route.params;
  const { manager, chats } = useAppSelector(selectManagerState);
  const { socket } = useWebSocket(
    getOtherUserId(conversation, manager.user_id),
    manager
  );
  const dispatch = useAppDispatch();
  const [isDataLoaded, setDataLoaded] = useState(true);
  useEffect(() => {
    dispatch(toggleTabBar(false));
    const loadMessages = async () => {
      setDataLoaded(true);
      if (!chats[conversation.id]) {
        await dispatch(getMMessages(conversation.conversation_id));
      }
      setDataLoaded(false);
    };
    loadMessages();

    return () => {
      dispatch(toggleTabBar(true));
    };
  }, [conversation.id]);

  const userImage = getUserImage(conversation, manager.user_id);
  const userName = getUserName(conversation, manager.user_id);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Toast />
      <SView className="flex flex-row justify-between items-center px-4 py-2">
        <SView>
          <SView className="flex flex-row items-center space-x-1">
            <SButton
              variant="text"
              onPress={() => navigation.navigate("MChats")}
            >
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
                <SText className="font-osSemibold">
                  {getUserName(conversation, manager.user_id)}
                </SText>
                <SText className="text-xs">last seen 20m ago</SText>
              </SView>
            </SView>
          </SView>
        </SView>
        <SButton
          className="border-manager border rounded-xl w-10 h-10 bg-white"
          variant="text"
          onPress={() => navigation.navigate("MChatDetails", { conversation })}
        >
          <SimpleLineIcons name="settings" size={24} color="black" />
        </SButton>
      </SView>
      {isDataLoaded && !chats[conversation.id] ? (
        <ScreenLoader />
      ) : (
        <ChatScreen
          chatWithUserId={getOtherUserId(conversation, manager.user_id)}
          yourId={manager.user_id}
          chats={chats}
          variant="manager"
        />
      )}

      <SendMessage socket={socket} variant="manager" />
    </SafeAreaView>
  );
};
