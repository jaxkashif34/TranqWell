import React, { FC } from 'react';
import { MHomeTabScreenProps, MMeetingNavigatorParamsList } from '~types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MMeetingDetails,
  MMeetings,
  MSetMeetingData,
  MSetMeetingUsers,
} from '~screens';

type Props = {};

const Stack = createNativeStackNavigator<MMeetingNavigatorParamsList>();

export const MMeetingNavigator: FC<MHomeTabScreenProps<'MMeetingNavigator'>> = (
  props: Props
) => {
  return (
    <Stack.Navigator
      initialRouteName="MMeetings"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MMeetings" component={MMeetings} />
      <Stack.Screen name="MMeetingDetails" component={MMeetingDetails} />
      <Stack.Screen name="MSetMeetingData" component={MSetMeetingData} />
      <Stack.Screen name="MSetMeetingUsers" component={MSetMeetingUsers} />
    </Stack.Navigator>
  );
};
