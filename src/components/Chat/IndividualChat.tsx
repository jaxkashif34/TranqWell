import React from 'react';
import { SButton, SText, SView } from '~base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider } from '../Divider/Divider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AuthCustomerParamsList,
  Conversation,
  MChatNavigatorParamsList,
  UserType,
} from '~types';
import {
  convertToAM_PM,
  getUserImage,
  getUserName,
  truncateString,
} from '~helpers';
import { theme } from '~assets';
import { type GestureResponderEvent } from 'react-native';
import { UserImage } from '../other/UserImage';

export const IndividualChat = ({
  conversation,
  user,
  route,
  variant,
  isPinned,
  handleLongPress,
}: {
  conversation: Conversation;
  user: { user_id: number; user_role: UserType };
  route: 'CChat' | 'MChat';
  variant: 'customer' | 'manager';
  isPinned: boolean;
  handleLongPress: (e: GestureResponderEvent, id: number) => void;
}) => {
  const { receiver_details, last_message, sender_details, id } = conversation;

  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        AuthCustomerParamsList & MChatNavigatorParamsList
      >
    >();
  if (receiver_details === null) return;
  const userImage = getUserImage(conversation, user.user_id);

  return (
    <SView>
      <SButton
        className="flex flex-row space-x-3 justify-between px-4"
        variant="text"
        onPress={() => navigation.navigate(route, { conversation })}
        onLongPress={(e) => handleLongPress(e, id)}
      >
        <SView className="flex flex-row space-x-3 flex-1">
          <UserImage
            data={{
              profile_image: userImage,
              name: getUserName(conversation, user.user_id),
            }}
            size={50}
          />
          <SView className="flex-1">
            <SView className="flex flex-row justify-between">
              <SText className="font-osSemibold">
                {getUserName(conversation, user.user_id)}
              </SText>
              <SText className="text-xs lowercase">
                {convertToAM_PM(last_message.timestamp) ?? 'Nov 9'}
              </SText>
            </SView>

            <SText>{truncateString(last_message.content, 30)}</SText>
          </SView>
        </SView>
        <SView className={`flex justify-center ${!isPinned ? 'hidden' : ''}`}>
          <MaterialCommunityIcons
            name="pin"
            size={30}
            color={theme.colors[variant]}
          />
        </SView>
      </SButton>
      <Divider />
    </SView>
  );
};
