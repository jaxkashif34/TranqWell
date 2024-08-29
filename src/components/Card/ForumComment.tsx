import React from 'react';
import { SButton, SImage, SText, SView } from '~base';
import { Divider } from '../Divider/Divider';
import { createImage, getRelativeTime, hexToRGBA } from '~helpers';
import { Feather, AntDesign } from '@expo/vector-icons';
import { theme } from '~assets';
import { CommentType } from '~types';
import UserAvatar from 'react-native-user-avatar';
import { UserImage } from '../other/UserImage';

type Props = {
  comment: CommentType;
};

export const ForumComment = ({ comment }: Props) => {
  return (
    <SView className="p-2">
      <Divider />
      <SView className="px-4 mt-2 space-y-2">
        <SView className="flex flex-row justify-between items-start">
          <SView className="flex flex-row space-x-2 items-center">
            <UserImage data={comment.user} size={50} />

            <SView>
              <SText className="font-semibold">{comment.user.name}</SText>
              <SText className="text-xs text-gray-500">
                {getRelativeTime(comment.created_at)}
              </SText>
            </SView>
          </SView>
          <SButton>
            <Feather name="more-horizontal" size={25} color="black" />
          </SButton>
        </SView>
        <SView className="">
          <SText>{comment.content}</SText>
          <SView className="flex flex-row space-x-2 mt-2">
            <SView className="flex flex-row items-center justify-center space-x-1">
              <SView
                style={{ backgroundColor: hexToRGBA(theme.colors.customer) }}
                className="rounded-full p-1 flex flex-row items-center justify-center"
              >
                <AntDesign name="like2" size={22} color="black" />
              </SView>
              <SText className="text-sm">0</SText>
            </SView>
            <SView className="flex flex-row items-center justify-center space-x-1">
              <SView
                style={{ backgroundColor: hexToRGBA(theme.colors.customer) }}
                className="rounded-full p-1 flex flex-row items-center justify-center"
              >
                <Feather name="message-square" size={22} color="black" />
              </SView>
              <SText className="text-sm">0</SText>
            </SView>
          </SView>
        </SView>
      </SView>
    </SView>
  );
};
