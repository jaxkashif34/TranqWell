import React, { type FC } from 'react';
import { AuthCustomerScreenProps, CProfileNavigatorParamsList } from '~types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CChangePassword,
  CDeleteProfile,
  CEditProfile,
  CEventDetails,
  CMeetingDetails,
  CProfile,
  CProfileSettings,
} from '~screens';

const Stack = createNativeStackNavigator<CProfileNavigatorParamsList>();

export const CProfileNavigator: FC<
  AuthCustomerScreenProps<'CProfileNavigator'>
> = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="CProfile"
    >
      <Stack.Screen name="CProfile" component={CProfile} />
      <Stack.Screen name="CChangePassword" component={CChangePassword} />
      <Stack.Screen name="CDeleteProfile" component={CDeleteProfile} />
      <Stack.Screen name="CEditProfile" component={CEditProfile} />
      <Stack.Screen name="CProfileSettings" component={CProfileSettings} />
      <Stack.Screen name="CEventDetails" component={CEventDetails} />
      <Stack.Screen name="CMeetingDetails" component={CMeetingDetails} />
      {/* <Stack.Screen
        name="CustomerJoinCallScreen"
        component={CustomerJoinCallScreen}
      /> */}
    </Stack.Navigator>
  );
};
