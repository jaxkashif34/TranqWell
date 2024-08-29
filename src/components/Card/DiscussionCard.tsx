import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { SView, SText, SButton } from '~base';
import { useNavigation } from '@react-navigation/native';
import { ButtonVariants, DiscussionType } from '~types';
import { convertToAM_PM, timeRemaining, truncateString } from '~helpers';
import { StackImages } from './StackImages';
import { theme } from '~assets';

type Props = {
  forum: DiscussionType;
  bgColor: ButtonVariants;
};

export const DiscussionCard = ({ forum, bgColor }: Props) => {
  const navigation = useNavigation<any>();
  return (
    <SView
      className={`rounded-xl flex flex-row items-center p-5 mb-4`}
      style={{ backgroundColor: theme.colors[bgColor] }}
    >
      <SView className="flex-1 gap-y-4">
        <SText className="font-osSemibold text-lg">
          {truncateString(forum.title, 60)}
        </SText>
        <SView>
          <SView className="flex flex-row gap-x-2 items-center">
            <SText className="font-osSemibold">
              {timeRemaining(forum.created_at)}
            </SText>
            <Octicons
              name="dot-fill"
              size={20}
              color="black"
              style={{ marginTop: 6 }}
            />
            <SText className="font-osSemibold">
              {convertToAM_PM(forum.created_at)}
            </SText>
          </SView>
          <StackImages />
        </SView>
      </SView>
      <SButton
        className="bg-white rounded-full h-9 w-9 flex justify-center items-center"
        onPress={() =>
          navigation.navigate('CDiscussionForumDetails', {
            discussionForum: forum,
          })
        }
        variant="text"
      >
        <AntDesign name="arrowright" size={24} color="black" />
      </SButton>
    </SView>
  );
};
