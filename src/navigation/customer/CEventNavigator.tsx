import React, { FC } from 'react';
import { AuthCustomerScreenProps, CEventNavigatorParamsList } from '~types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CEventsScreens } from '~helpers';
import { CEventDetails, CEvents } from '~screens';

const Stack = createNativeStackNavigator<CEventNavigatorParamsList>();

export const CEventNavigator: FC<
  AuthCustomerScreenProps<'CEventNavigator'>
> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={CEventsScreens.CEvents} component={CEvents} />
      <Stack.Screen
        name={CEventsScreens.CEventDetails}
        component={CEventDetails}
      />
    </Stack.Navigator>
  );
};
