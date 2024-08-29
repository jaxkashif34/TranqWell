import { Ionicons } from '@expo/vector-icons';
import React, { FC, useEffect } from 'react';
import { AuthCustomerScreenProps } from '~types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SText, SView } from '~base';
import { CommentForm, CommentScrollView } from '~components';
import {
  useAppDispatch,
  useAppSelector,
  useDiscussionSocket,
  useKeyboardStatus,
} from '~hooks';
import { toggleTabBar } from '~redux';
import { selectCustomerState } from '~helpers';

export const CDiscussionForumDetails: FC<
  AuthCustomerScreenProps<'CDiscussionForumDetails'>
> = ({ navigation, route }) => {
  const { discussionForum } = route.params;
  const { customer } = useAppSelector(selectCustomerState);
  const { isKeyboardVisible } = useKeyboardStatus();
  const { socket } = useDiscussionSocket(discussionForum.id, customer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleTabBar(false));
    return () => {
      dispatch(toggleTabBar(true));
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SView className="flex flex-row items-center mt-2 space-x-3 px-4">
        <Ionicons
          name="arrow-back"
          size={26}
          color="black"
          style={{
            padding: 3,
            borderRadius: 5,
          }}
          onPress={navigation.goBack}
        />
        <SText className="font-osBold text-lg">Post</SText>
      </SView>

      <SView className="pt-2 flex-1">
        <SView className="px-4">
          <SText className="text-xl font-osBold tracking-wider">
            {discussionForum.title}
          </SText>
        </SView>
        <CommentScrollView discussionForumId={discussionForum.id} />

        <SView
          className={`p-2`}
          style={{ minHeight: !isKeyboardVisible ? '10%' : '30%' }}
        >
          <CommentForm socket={socket} />
        </SView>
      </SView>
    </SafeAreaView>
  );
};
