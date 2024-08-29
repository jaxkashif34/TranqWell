import React, { FC } from 'react';
import { AuthCustomerScreenProps, CTribeNavigatorParamsList } from '~types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CCreateDiscussionForum,
  CDiscussionForumDetails,
  CDiscussionForums,
} from '~screens';

type Props = {};
const Stack = createNativeStackNavigator<CTribeNavigatorParamsList>();
export const CTribeNavigator: FC<AuthCustomerScreenProps<'CTribeNavigator'>> = (
  props: Props
) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="CDiscussionForums"
    >
      <Stack.Screen name="CDiscussionForums" component={CDiscussionForums} />
      <Stack.Screen
        name="CDiscussionForumDetails"
        component={CDiscussionForumDetails}
      />
      <Stack.Screen
        name="CCreateDiscussionForum"
        component={CCreateDiscussionForum}
      />
    </Stack.Navigator>
  );
};
