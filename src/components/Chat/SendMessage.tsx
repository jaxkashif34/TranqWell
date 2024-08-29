import React, { useState } from 'react';
import { SButton, STextInput, SView } from '~base';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { theme } from '~assets';

type Props = {
  socket: WebSocket;
  variant: 'customer' | 'manager';
};

export const SendMessage = ({ socket, variant }: Props) => {
  const [textMessage, setTextMessage] = useState('');

  const handleSendMessage = () => {
    if (textMessage.trim() === '') return;
    socket.send(JSON.stringify({ content: `${textMessage}` }));
    setTextMessage('');
  };
  return (
    <SView className="bg-white p-5 flex flex-row items-center space-x-2">
      <SButton
        className={`border-${variant} border rounded-xl w-10 h-10 bg-white`}
        variant="text"
      >
        <SView style={{ transform: 'rotate(45deg)' }}>
          <MaterialIcons name="attach-file" size={24} color="black" />
        </SView>
      </SButton>

      <SView
        className={`flex flex-row items-center  border border-${variant} flex-1 rounded-xl pr-2`}
      >
        <STextInput
          className="h-12 placeholder:font-osLight font-osRegular flex-1 placeholder:pl-2 pr-2"
          placeholder="Write Here"
          value={textMessage}
          onChangeText={(text) => setTextMessage(text)}
        />
        <SButton variant="text" onPress={handleSendMessage}>
          <Feather name="send" size={24} color={theme.colors[variant]} />
        </SButton>
      </SView>
    </SView>
  );
};
