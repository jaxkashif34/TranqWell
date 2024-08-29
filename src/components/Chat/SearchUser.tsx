import React from 'react';
import { SButton, SText, SView } from '~base';
import { Divider } from '../Divider/Divider';
import { BaseUser, Conversation } from '~types';
import { useNavigation } from '@react-navigation/native';
import { UserImage } from '../other/UserImage';

type Props = {
  user: BaseUser;
  route: 'CAddUserChat' | 'MAddUserChat';
  isChatExistedRoute: 'CChat' | 'MChat';
  findChat: (id: number) => Conversation;
};

export const SearchUser = ({
  user,
  route,
  isChatExistedRoute,
  findChat,
}: Props) => {
  const navigation = useNavigation<any>();
  return (
    <SView>
      <SButton
        className="flex flex-row space-x-3 justify-between px-4"
        variant="text"
        onPress={() =>
          findChat(user.id)
            ? navigation.navigate(isChatExistedRoute, {
                conversation: findChat(user.id),
              })
            : navigation.navigate(route, { user })
        }
      >
        <SView className="flex flex-row space-x-3 flex-1">
          <UserImage data={user} size={50} />

          <SView className="flex-1">
            <SView className="flex flex-row justify-between">
              <SText className="font-osSemibold">{user.name}</SText>
            </SView>

            <SText>{user.email}</SText>
          </SView>
        </SView>
        <SView className={`flex justify-center`}></SView>
      </SButton>
      <Divider />
    </SView>
  );
};
