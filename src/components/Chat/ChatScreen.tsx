import React, { useEffect, useRef } from 'react';
import { Message } from './Message';
import { ScrollView } from 'react-native';
import { convertToAM_PM } from '~helpers';
import { MessageType } from '~types';
import { ScreenLoader } from '../screenLoader/ScreenLoader';
import { InitialChatMessage } from './InitialChatMessage';

type Props = {
  chatWithUserId: number;
  yourId: number;
  chats: Record<string, MessageType[]>;
  variant: 'customer' | 'manager';
};

export const ChatScreen = ({
  chatWithUserId,
  yourId,
  chats,
  variant,
}: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chats[chatWithUserId]?.length]);

  return chats[chatWithUserId] ? (
    <ScrollView ref={scrollViewRef}>
      <InitialChatMessage variant={variant} />
      {chats[chatWithUserId].map((chat) => (
        <Message
          key={chat.id}
          text={chat.content}
          time={convertToAM_PM(chat.timestamp)}
          isYou={chat.sender_details.id === yourId}
        />
      ))}
    </ScrollView>
  ) : (
    <ScreenLoader />
  );
};
