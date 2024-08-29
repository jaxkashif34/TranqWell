import { View, Text } from "react-native";
import React, { FC } from "react";
import { MClientsNavigatorParamsList, MHomeTabScreenProps } from "~types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MClientProfile, MClients } from "~screens";

type Props = {};

const Stack = createNativeStackNavigator<MClientsNavigatorParamsList>();

export const MClientsNavigator: FC<MHomeTabScreenProps<"MClientsNavigator">> = (
  props: Props
) => {
  return (
    <Stack.Navigator
      initialRouteName="MClients"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MClients" component={MClients} />
      <Stack.Screen name="MClientProfile" component={MClientProfile} />
    </Stack.Navigator>
  );
};
