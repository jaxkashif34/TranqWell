import React, { FC } from 'react';
import { AuthCustomerScreenProps, CChatNavigatorParamsList } from '~types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CChatsScreens } from '~helpers';
import { CAddUser, CAddUserChat, CChat, CChatDetails, CChats } from '~screens';

const Stack = createNativeStackNavigator<CChatNavigatorParamsList>();

export const CChatsNavigator: FC<
  AuthCustomerScreenProps<'CChatNavigator'>
> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={CChatsScreens.CChats} component={CChats} />
      <Stack.Screen name={CChatsScreens.CChat} component={CChat} />
      <Stack.Screen name="CAddUser" component={CAddUser} />
      <Stack.Screen name="CAddUserChat" component={CAddUserChat} />
      <Stack.Screen
        name={CChatsScreens.CChatDetails}
        component={CChatDetails}
      />
    </Stack.Navigator>
  );
};
