import React, { useState } from 'react';
import { SView } from '~base';
import { SButton, STextInput } from '~base';
import { Feather } from '@expo/vector-icons';
import { theme } from '~assets';

type Props = {
  socket: WebSocket;
};

export const CommentForm = ({ socket }: Props) => {
  const [commentText, setCommentText] = useState('');
  const [height, setHeight] = useState(40);
  const handleComment = () => {
    if (commentText && commentText.trim() === '') return;
    socket.send(JSON.stringify({ content: `${commentText}` }));
    setCommentText('');
    setHeight(40);
  };
  return (
    <SView className="mt-3 flex-1">
      <SView className="border border-customer rounded-lg flex flex-row items-center flex-1 justify-between px-3">
        <STextInput
          className="h-full placeholder:text-base"
          placeholder="Write Here"
          multiline={true}
          numberOfLines={null}
          // autoFocus
          style={{
            minHeight: 40,
            flex: 1,
            textAlignVertical: height === 100 ? 'top' : 'center',
            padding: 5,
          }} // Set a minimum height
          onFocus={() => setHeight(100)}
          onBlur={() => setHeight(40)}
          onChangeText={setCommentText}
          value={commentText}
        />
        <SButton onPress={handleComment}>
          <Feather name="send" size={24} color={theme.colors.customer} />
        </SButton>
      </SView>
    </SView>
  );
};
