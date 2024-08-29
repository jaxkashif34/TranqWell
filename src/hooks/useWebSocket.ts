import { useEffect, useState } from 'react';
import { API_PATHS } from '~services';
import { useAppDispatch } from './redux-hooks';
import { getErrorMessage, showToast } from '~helpers';
import {
  addMessage,
  addMMessage,
  mUpdateLastMessage,
  updateLastMessage,
} from '~redux';
import { SocketMessage, UserType } from '~types';

export const useWebSocket = (
  receiver_id: number,
  user: { user_role: UserType; user_id: number; access: string }
) => {
  const [socket, setSocket] = useState<WebSocket>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const ws = new WebSocket(
      `${API_PATHS['socket-url']}?receiver_id=${receiver_id}&token=${user.access}`
    );

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event: MessageEvent<string>) => {
      const data: SocketMessage = JSON.parse(event.data);
      if (user.user_role === 'Customer') {
        dispatch(
          addMessage({
            content: data.message,
            id: new Date().getTime(),
            conversation_id: data.conversation_id,
            timestamp: new Date().toISOString(),
            receiver_details: data.receiver,
            sender_details: data.sender,
          })
        );
        dispatch(
          updateLastMessage({
            content: data.message,
            conversation_id: data.conversation_id,
            id: new Date().getTime(),
            timestamp: new Date().toISOString(),
            receiver_details: data.receiver,
            sender_details: data.sender,
          })
        );
      } else if (user.user_role === 'CaseManager') {
        dispatch(
          addMMessage({
            content: data.message,
            id: new Date().getTime(),
            conversation_id: data.conversation_id,
            timestamp: new Date().toISOString(),
            receiver_details: data.receiver,
            sender_details: data.sender,
          })
        );
        dispatch(
          mUpdateLastMessage({
            content: data.message,
            conversation_id: data.conversation_id,
            id: new Date().getTime(),
            timestamp: new Date().toISOString(),
            receiver_details: data.receiver,
            sender_details: data.sender,
          })
        );
      }
    };

    ws.onerror = (error) => {
      showToast({
        heading: 'Error',
        subHeading: `WebSocket error: ${getErrorMessage(error)}`,
        type: 'error',
      });
      console.error('WebSocket error:', error);
    };

    ws.onclose = (e) => {
      console.log('WebSocket connection closed', e);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [receiver_id]);

  return { socket };
};
