import React, { FC, useEffect, useState } from 'react';
import { MAuthScreenProps, MChatNavigatorParamsList } from '~types';
import { SButton, SText, STextInput, SView } from '~base';
import { useAppDispatch, useAppSelector, useWebSocketAddUser } from '~hooks';
import { addMConversation, toggleTabBar } from '~redux';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { InitialChatMessage, Message, UserImage } from '~components';
import { convertToAM_PM, selectManagerState, selectUiState } from '~helpers';
import { ScrollView, StatusBar } from 'react-native';
import { Toast } from '~utils';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { theme } from '~assets';

export const MAddUserChat: FC<
  MAuthScreenProps<MChatNavigatorParamsList, 'MAddUserChat'>
> = ({ navigation, route }) => {
  const [textMessage, setTextMessage] = useState('');
  const { user } = route.params;
  const { manager, chats, conversations } = useAppSelector(selectManagerState);
  const { addChatConversationId } = useAppSelector(selectUiState);
  const { socket } = useWebSocketAddUser(user.id, manager);
  const findMyConverSation = conversations.find((c) => c.id === user.id);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(toggleTabBar(false));
    return () => {
      dispatch(toggleTabBar(true));
    };
  }, []);

  useEffect(() => {
    if (addChatConversationId) {
      const lastMessage = chats[addChatConversationId]?.slice(-1)[0];
      if (!lastMessage) return;
      if (conversations.find((conv) => conv.id === user.id)) return;
      dispatch(
        addMConversation({
          id: user.id,
          receiver_details: lastMessage.receiver_details,
          sender_details: lastMessage.sender_details,
          conversation_id: lastMessage.conversation_id,
          isPinned: false,
          last_message: {
            content: lastMessage.content,
            conversation_id: lastMessage.conversation_id,
            id: Math.floor(Math.random() * 10000),
            receiver_details: lastMessage.receiver_details,
            sender_details: lastMessage.sender_details,
            timestamp: lastMessage.timestamp,
          },
        })
      );
    }
  }, [addChatConversationId, chats[addChatConversationId]?.length]);

  const handleSendMessage = () => {
    setTextMessage('');
    socket.send(JSON.stringify({ content: `${textMessage}` }));
  };
  return (
    <SView style={{ flex: 1 }}>
      <SView
        style={{ height: StatusBar.currentHeight, backgroundColor: 'white' }}
      />
      <Toast />
      <SView className="flex flex-row justify-between items-center px-4 bg-white py-2">
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
                  profile_image: user.profile_image,
                  name: user.name,
                }}
                size={40}
              />
              <SView>
                <SText className="font-osSemibold">{user.name}</SText>
                <SText className="text-xs">last seen 20m ago</SText>
              </SView>
            </SView>
          </SView>
        </SView>
        <SButton
          className="border-manager border rounded-xl w-10 h-10 bg-white"
          variant="text"
          onPress={() =>
            navigation.navigate('MChatDetails', {
              conversation: findMyConverSation,
            })
          }
          disabled={!findMyConverSation}
        >
          <SimpleLineIcons name="settings" size={24} color="black" />
        </SButton>
      </SView>
      {chats[addChatConversationId] ? (
        <ScrollView>
          <InitialChatMessage variant="manager" />
          {chats[addChatConversationId].map((chat) => (
            <Message
              key={chat.id}
              text={chat.content}
              time={convertToAM_PM(chat.timestamp)}
              isYou={chat.sender_details.id === manager.user_id}
              variant="manager"
            />
          ))}
        </ScrollView>
      ) : (
        <InitialChatMessage variant="manager" />
      )}
      <SView className="bg-white p-5 flex flex-row items-center space-x-2">
        <SButton
          className={`border-manager border rounded-xl w-10 h-10 bg-white`}
          variant="text"
        >
          <SView style={{ transform: 'rotate(45deg)' }}>
            <MaterialIcons name="attach-file" size={24} color="black" />
          </SView>
        </SButton>

        <SView
          className={`flex flex-row items-center  border border-manager flex-1 rounded-xl pr-2`}
        >
          <STextInput
            className="h-12 placeholder:font-osLight font-osRegular flex-1 placeholder:pl-2 pr-2"
            placeholder="Write Here"
            value={textMessage}
            onChangeText={(text) => setTextMessage(text)}
          />
          <SButton variant="text" onPress={handleSendMessage}>
            <Feather name="send" size={24} color={theme.colors.manager} />
          </SButton>
        </SView>
      </SView>
    </SView>
  );
};
