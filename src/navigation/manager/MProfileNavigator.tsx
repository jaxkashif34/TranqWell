import React, { type FC } from 'react';
import {
  MAuthNavigatorParamsList,
  MAuthScreenProps,
  MProfileNavigatorParamsList,
} from '~types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CMeetingDetails,
  MChangePassword,
  MDeleteProfile,
  MEditProfile,
  MProfile,
  MProfileSettings,
} from '~screens';

const Stack = createNativeStackNavigator<MProfileNavigatorParamsList>();

export const MProfileNavigator: FC<
  MAuthScreenProps<MAuthNavigatorParamsList, 'MProfileNavigator'>
> = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MProfile"
    >
      <Stack.Screen name="MProfile" component={MProfile} />
      <Stack.Screen name="MDeleteProfile" component={MDeleteProfile} />
      <Stack.Screen name="MEditProfile" component={MEditProfile} />
      <Stack.Screen name="MProfileSettings" component={MProfileSettings} />
      <Stack.Screen name="MChangePassword" component={MChangePassword} />
      <Stack.Screen name="CMeetingDetails" component={CMeetingDetails} />
    </Stack.Navigator>
  );
};
