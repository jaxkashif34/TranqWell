import React, { FC, useEffect, useMemo, useState } from "react";
import { GradientLayout, IndividualChat } from "~components";
import { SButton, SScrollView, SText, STextInput, SView } from "~base";
import { MAuthScreenProps, MChatNavigatorParamsList } from "~types";
import { Octicons, Feather } from "@expo/vector-icons";
import { selectManagerState } from "~helpers";
import { useAppDispatch, useAppSelector } from "~hooks";
import { addMPinnedChat, removeMPinnedChat, toggleTabBar } from "~redux";
import { type GestureResponderEvent } from "react-native";
import { Toast } from "~utils";

export const MChats: FC<
  MAuthScreenProps<MChatNavigatorParamsList, "MChats">
> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { manager, conversations, pinnedChats } =
    useAppSelector(selectManagerState);
  const dispatch = useAppDispatch();

  const pinnedConversations = useMemo(
    () =>
      conversations.map((conversation) => {
        if (conversation.id in pinnedChats) {
          return { ...conversation, isPinned: true };
        }
        return conversation;
      }),
    [pinnedChats, conversations?.length]
  );
  const sortConversations = useMemo(
    () =>
      pinnedConversations.sort((a, b) => {
        if (a.isPinned && !b.isPinned) {
          return -1;
        }
        if (!a.isPinned && b.isPinned) {
          return 1;
        }
        return 0;
      }),
    [pinnedConversations.length, pinnedChats, conversations?.length]
  );

  const filteredChats = sortConversations.filter((chat) => {
    if (chat.receiver_details.id === manager.user_id) {
      return chat.sender_details.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    } else {
      return chat.receiver_details.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }
  });
  useEffect(() => {
    dispatch(toggleTabBar(true));
  }, []);

  const handleLongPress = (e: GestureResponderEvent, id: number) => {
    if (!pinnedChats[id]) {
      dispatch(addMPinnedChat(id));
    } else if (pinnedChats[id]) {
      dispatch(removeMPinnedChat(id));
    }
  };

  return (
    <GradientLayout hideBottomCircle variant="manager">
      <Toast />
      <SView className="flex space-y-4 pt-6 flex-1">
        <SView className="px-4 space-y-4">
          <SView className="flex flex-row justify-between items-center">
            <SText className="font-osExtraBold tracking-wider text-xl">
              Chat
            </SText>
            <SButton
              className="border-manager border rounded-xl w-10 h-10 bg-white"
              variant="text"
              onPress={() => navigation.navigate("MAddUser")}
            >
              <Feather name="edit" size={24} color="black" />
            </SButton>
          </SView>

          <SView className="flex-row border-manager border rounded-xl px-2 bg-white">
            <STextInput
              className="h-10 flex-1 placeholder:font-osRegular"
              placeholder="Search"
              onChangeText={(text) => setSearchQuery(text)}
            />
            <SButton variant="text">
              <Octicons name="search" size={24} color="black" />
            </SButton>
          </SView>
        </SView>

        <SScrollView style={{ flex: 1 }}>
          {conversations.length === 0 ? (
            <SView className="bg-white p-4 w-11/12 mx-auto rounded-xl border border-manager">
              <SText className="text-lg font-osBold tracking-wider text-center">
                recent chats will display here
              </SText>
            </SView>
          ) : (
            <>
              {filteredChats.map((conversation, i) => {
                return (
                  <IndividualChat
                    conversation={conversation}
                    user={manager}
                    key={conversation.id}
                    route="MChat"
                    variant="manager"
                    isPinned={conversation.isPinned}
                    handleLongPress={handleLongPress}
                  />
                );
              })}
            </>
          )}
        </SScrollView>
      </SView>
    </GradientLayout>
  );
};
