import React, { FC } from 'react';
import { MChatNavigatorParamsList, MHomeTabScreenProps } from '~types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MAddUser, MAddUserChat, MChat, MChatDetails, MChats } from '~screens';

const Stack = createNativeStackNavigator<MChatNavigatorParamsList>();

export const MChatsNavigator: FC<
  MHomeTabScreenProps<'MChatNavigator'>
> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MChats" component={MChats} />
      <Stack.Screen name="MChat" component={MChat} />
      <Stack.Screen name="MChatDetails" component={MChatDetails} />
      <Stack.Screen name="MAddUser" component={MAddUser} />
      <Stack.Screen name="MAddUserChat" component={MAddUserChat} />
    </Stack.Navigator>
  );
};
