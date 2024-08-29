import React, { FC } from "react";
import { MHomeTabScreenProps, MReminderNavigatorParamsList } from "~types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MReminders, MSetReminderData, MSetReminderUsers } from "~screens";

type Props = {};

const Stack = createNativeStackNavigator<MReminderNavigatorParamsList>();

export const MReminderNavigator: FC<
  MHomeTabScreenProps<"MReminderNavigator">
> = (props: Props) => {
  return (
    <Stack.Navigator
      initialRouteName="MReminders"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MReminders" component={MReminders} />
      <Stack.Screen name="MSetReminderData" component={MSetReminderData} />
      <Stack.Screen name="MSetReminderUsers" component={MSetReminderUsers} />
    </Stack.Navigator>
  );
};
