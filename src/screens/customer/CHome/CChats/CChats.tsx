import React, { FC, useEffect, useMemo, useState } from "react";
import { GradientLayout, IndividualChat, ScreenLoader } from "~components";
import { SButton, SScrollView, SText, STextInput, SView } from "~base";
import { AuthCustomerScreenProps } from "~types";
import { Octicons, Feather } from "@expo/vector-icons";
import { selectCustomerState } from "~helpers";
import { useAppDispatch, useAppSelector } from "~hooks";
import { addCPinnedChat, getConversations, removeCPinnedChat } from "~redux";
import { type GestureResponderEvent } from "react-native";

export const CChats: FC<AuthCustomerScreenProps<"CChats">> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { conversations, customer, pinnedChats } =
    useAppSelector(selectCustomerState);

  const pinnedConversations = useMemo(
    () =>
      conversations.map((conversation) => {
        let userType = "receiver_details";
        if (conversation.sender_details.id !== customer.user_id) {
          userType = "sender_details";
        } else {
          userType = "receiver_details";
        }
        if (
          conversation.id in pinnedChats ||
          conversation[userType].user_role === "CaseManager"
        ) {
          return { ...conversation, isPinned: true };
        }
        return conversation;
      }),
    [pinnedChats, conversations.length]
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
    [pinnedConversations.length, pinnedChats]
  );

  const filteredChats = sortConversations.filter((chat) => {
    if (chat.receiver_details.id === customer.user_id) {
      return chat.sender_details.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    } else {
      return chat.receiver_details.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    const loadConversation = async () => {
      setLoading(true);
      if (conversations.length === 0) {
        await dispatch(getConversations(customer.user_id));
      }
      setLoading(false);
    };
    loadConversation();
  }, []);

  const handleLongPress = (e: GestureResponderEvent, id: number) => {
    if (!pinnedChats[id]) {
      dispatch(addCPinnedChat(id));
    } else if (pinnedChats[id]) {
      dispatch(removeCPinnedChat(id));
    }
  };

  return (
    <GradientLayout hideBottomCircle variant="customer">
      <SView className="flex space-y-4 pt-6 flex-1">
        <SView className="px-4 space-y-4">
          <SView className="flex flex-row justify-between items-center">
            <SText className="font-osExtraBold tracking-wider text-xl">
              Chat
            </SText>
            <SButton
              className="border-customer border rounded-xl w-10 h-10 bg-white"
              variant="text"
              onPress={() => navigation.navigate("CAddUser")}
            >
              <Feather name="edit" size={24} color="black" />
            </SButton>
          </SView>

          <SView className="flex-row border-customer border rounded-xl px-2 bg-white">
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
          {loading ? (
            <ScreenLoader />
          ) : conversations.length === 0 ? (
            <SView className="bg-white p-4 w-11/12 mx-auto rounded-xl border border-customer">
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
                    user={customer}
                    key={conversation.id}
                    route="CChat"
                    variant="customer"
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
