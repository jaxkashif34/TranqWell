import React, { useEffect, useState, type FC } from "react";
import {
  GradientLayout,
  EventCardLayouts,
  ScreenLoader,
  CustomerMeetingCard,
  NoItem,
  DiscussionCard,
  UserImage,
} from "~components";
import { SText, SView, SImage, SButton, SScrollView } from "~base";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import {
  AuthCustomerScreenProps,
  MAuthScreenProps,
  MClientsNavigatorParamsList,
} from "~types";
import {
  selectCustomerState,
  getRandomColor,
  arrangeMeetings,
  selectManagerState,
  showToast,
} from "~helpers";
import { getCDiscussionForums, getEvents, toggleTabBar } from "~redux";
import { useAppDispatch, useAppSelector } from "~hooks";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";
import Feather from "@expo/vector-icons/Feather";
import Svg, { G, Path } from "react-native-svg";
import Toast from "react-native-toast-message";
import { ToastAndroid } from "react-native";

export const MClientProfile: FC<
  MAuthScreenProps<MClientsNavigatorParamsList, "MClientProfile">
> = ({ navigation, route }) => {
  const userData = route.params.user;
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { conversations } = useAppSelector(selectManagerState);
  useEffect(() => {
    // dispatch(toggleTabBar(false));

    return () => {
      // dispatch(toggleTabBar(true));
    };
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(userData.email);
  };
  const conversation = conversations.find((conv) => {
    if (userData.id !== conv.sender_details.id) {
      return conv.receiver_details.id === userData.id;
    }
    return conv.sender_details.id === userData.id;
  });

  const handleNavigation = () => {
    if (conversation) {
      navigation.navigate("MChatNavigator", {
        screen: "MChat",
        params: {
          conversation,
        },
      });
    } else {
      ToastAndroid.show("No conversation found", ToastAndroid.SHORT);
    }
  };
  return (
    <GradientLayout hideBottomCircle variant="manager">
      <SView className="flex flex-row items-center justify-between px-4 mt-2">
        <Toast topOffset={350} />
        <SView className="flex flex-row items-center space-x-3">
          <Ionicons
            name="arrow-back"
            size={26}
            color="black"
            style={{
              padding: 3,
              borderRadius: 5,
            }}
            onPress={navigation.goBack}
          />
          <SText className="font-osBold text-lg">Customer Profile</SText>
        </SView>
      </SView>
      <SView className="flex-1 space-y-4 px-2">
        <SView className="p-3 py-1 flex items-center space-y-5">
          <SView className="w-24 h-24 rounded-xl mt-4">
            <UserImage data={userData} size={"100%"} borderRadius={5} />
          </SView>
          <SView className="flex items-center space-y-1">
            <SText className="font-osBold">{userData.name}</SText>
            <SView className="flex flex-row items-center space-x-1">
              <Ionicons name="location-outline" size={24} color="black" />
              <SText>
                {userData.country}, {userData.city}
              </SText>
            </SView>
          </SView>
          <SView className="bg-white px-2 py-2 rounded-xl border border-manager flex flex-row justify-between items-center space-x-1 w-full">
            <SText className="tracking-wider text-center">
              {userData.email}
            </SText>
            <SButton variant="text" onPress={copyToClipboard}>
              <MaterialCommunityIcons
                name="content-copy"
                size={24}
                color="black"
              />
            </SButton>
          </SView>
        </SView>

        <SView className="border-0 border-t border-t-gray-300" />

        <SScrollView className="flex-1 px-1 my-4 space-y-4"></SScrollView>

        <SView className="my-2 space-y-2">
          <SView className="flex flex-row justify-center items-center space-x-2">
            <SButton
              variant="manager"
              onPress={handleNavigation}
              className="h-12 flex-1"
            >
              <Svg
                enable-background="new 0 0 24 24"
                height={35}
                width={35}
                id="Layer_1"
                viewBox="0 0 24 24"
                fill="white"
              >
                <G>
                  <Path d="M5.2,22c-0.4,0-0.9-0.1-1.3-0.2c-0.4-0.1-0.6-0.3-0.8-0.5l-0.1-0.1c-0.1-0.1-0.2-0.3-0.2-0.4c0-0.2,0.1-0.3,0.3-0.4   c0.8-0.4,1.5-1.1,1.9-1.9C5,18.4,5,18.3,5.1,18.2c-2.8-1.7-4.4-4.4-4.4-7.2C0.6,6,5.7,2,12,2C18.3,2,23.4,6,23.4,11   s-5.1,9.1-11.4,9.1c-0.6,0-1.3,0-1.9-0.1C8.6,21.3,6.9,22,5.2,22z M4.2,20.9c1.7,0.4,3.7-0.3,5.5-1.8C9.7,19,9.9,18.9,10,19   c0.6,0.1,1.3,0.1,2,0.1c5.7,0,10.4-3.6,10.4-8.1S17.7,3,12,3C6.3,3,1.6,6.6,1.6,11c0,2.6,1.6,5,4.3,6.5c0.2,0.1,0.3,0.4,0.2,0.6   C6.1,18.4,6,18.7,5.8,19C5.4,19.8,4.8,20.4,4.2,20.9z" />
                </G>
              </Svg>
            </SButton>
            <SButton
              variant="manager"
              onPress={() => {
                navigation.navigate("MReminderNavigator", {
                  screen: "MReminders",
                });
              }}
              className="flex flex-row items-center space-x-2 flex-[3]"
            >
              <MaterialCommunityIcons
                name="clock-check-outline"
                size={33}
                color="white"
              />
              <SText className="text-white font-osBold text-xl tracking-wider uppercase">
                Set Reminders
              </SText>
            </SButton>
          </SView>
          <SButton
            variant="zoom"
            onPress={() => {
              navigation.navigate("MMeetingNavigator", {
                screen: "MMeetings",
              });
            }}
            className="flex flex-row items-center space-x-1"
          >
            <Ionicons name="videocam-outline" size={35} color="white" />
            <SText className="text-white font-osBold text-xl tracking-wider uppercase">
              Set Meeting
            </SText>
          </SButton>
        </SView>
      </SView>
    </GradientLayout>
  );
};
