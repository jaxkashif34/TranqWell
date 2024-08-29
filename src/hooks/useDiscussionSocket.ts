import { useEffect, useState } from 'react';
import { API_PATHS } from '~services';
import { useAppDispatch } from './redux-hooks';
import { getErrorMessage, showToast } from '~helpers';
import { addCComment } from '~redux';
import { DiscussionSocketType, UserType } from '~types';

export const useDiscussionSocket = (
  discussion_id: number,
  user: { user_role: UserType; user_id: number; access: string }
) => {
  const [socket, setSocket] = useState<WebSocket>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const ws = new WebSocket(
      `${API_PATHS['ws-discussions']}?discussion_id=${discussion_id}&token=${user.access}`
    );

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event: MessageEvent<string>) => {
      const data: DiscussionSocketType = JSON.parse(event.data);
      if (data.message.user.user_role === 'Customer') {
        dispatch(addCComment({ ...data, discussion_id }));
      } else if (user.user_role === 'CaseManager') {
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
  }, [discussion_id]);

  return { socket };
};
