import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CForgotPassword,
  CGetStarted,
  CSignIn,
  CSignUp,
  JoinCallScreen,
  MForgotPassword,
  MGetStarted,
  MSignIn,
  MSignUp,
  SelectUser,
} from "~screens";
import type { RootNavigationParamsList } from "~types";
import {
  selectCustomerState,
  selectManagerState,
  selectUiState,
} from "~helpers";
import { useAppDispatch, useAppSelector } from "~hooks";
import { CProfileNavigator } from "../customer/CProfileNavigator";
import { CHomeNavigator } from "../customer/CHomeNavigator";
import { CCaseManagerNavigator } from "../customer/CCaseManagerNavigator";
import { CTribeNavigator } from "../customer/CTribeNavigator";
import { CCouncilorNavigator } from "../customer/CCouncilorNavigator";
import { MHomeNavigator } from "../manager/MHomeNavigator";
import { MChatsNavigator } from "../manager/MChatsNavigator";
import { MClientsNavigator } from "../manager/MClientsNavigator";
import { MMeetingNavigator } from "../manager/MMeetingNavigator";
import { MProfileNavigator } from "../manager/MProfileNavigator";
import { MReminderNavigator } from "../manager/MReminderNavigator";
import { useEffect } from "react";
import { sendDeviceToken, setTokenSent } from "~redux";
import { SText, SView } from "~base";
import { InCallToast } from "~components";

const Stack = createNativeStackNavigator<RootNavigationParamsList>();

export const RootNavigation = () => {
  const { authenticated: cAuthenticated, customer } =
    useAppSelector(selectCustomerState);
  const { authenticated: mAuthenticated, manager } =
    useAppSelector(selectManagerState);
  const { isTokenSent } = useAppSelector(selectUiState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const sendToken = async () => {
      if (cAuthenticated || mAuthenticated || !isTokenSent) {
        await dispatch(
          sendDeviceToken({
            user_id: manager.user_id ?? customer.user_id,
            token: "token",
          })
        );
        dispatch(setTokenSent(true));
      }
    };
    // sendToken();
  }, []);
  return (
    <NavigationContainer>
      {/* <InCallToast /> */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!(cAuthenticated || mAuthenticated) && (
          <>
            <Stack.Screen name="SelectUser" component={SelectUser} />
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="CGetStarted" component={CGetStarted} />
              <Stack.Screen name="CSignIn" component={CSignIn} />
              <Stack.Screen name="CSignUp" component={CSignUp} />
              <Stack.Screen
                name="CForgotPassword"
                component={CForgotPassword}
              />
            </Stack.Group>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="MGetStarted" component={MGetStarted} />
              <Stack.Screen name="MSignIn" component={MSignIn} />
              <Stack.Screen name="MSignUp" component={MSignUp} />
              <Stack.Screen
                name="MForgotPassword"
                component={MForgotPassword}
              />
            </Stack.Group>
          </>
        )}
        {cAuthenticated && (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CHomeNavigator" component={CHomeNavigator} />
            <Stack.Screen
              name="CProfileNavigator"
              component={CProfileNavigator}
            />
            <Stack.Screen
              name="CCaseManagerNavigator"
              component={CCaseManagerNavigator}
            />
            <Stack.Screen name="CTribeNavigator" component={CTribeNavigator} />
            <Stack.Screen
              name="CCouncilorNavigator"
              component={CCouncilorNavigator}
            />
          </Stack.Group>
        )}
        {mAuthenticated && (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MHomeNavigator" component={MHomeNavigator} />
            <Stack.Screen name="MChatNavigator" component={MChatsNavigator} />
            <Stack.Screen
              name="MClientsNavigator"
              component={MClientsNavigator}
            />

            <Stack.Screen
              name="MMeetingNavigator"
              component={MMeetingNavigator}
            />
            <Stack.Screen
              name="MProfileNavigator"
              component={MProfileNavigator}
            />
            <Stack.Screen
              name="MReminderNavigator"
              component={MReminderNavigator}
            />
          </Stack.Group>
        )}
        {(cAuthenticated || mAuthenticated) && (
          <Stack.Screen name="JoinCallScreen" component={JoinCallScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
