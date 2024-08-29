import React, { type FC } from "react";
import { savedImages } from "~assets";
import { SButton, SImage, SText, STextInput, SView } from "~base";
import {
  MAuthNavigatorParamsList,
  MAuthScreenProps,
  MHomeNavigatorParamsList,
} from "~types";
import { Octicons, Feather, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { MeetingCard, NoItem, RecentChat, UserImage } from "~components";
import {
  arrangeMeetings,
  selectManagerState,
  getRandomColor,
  getUserName,
  getUserImage,
} from "~helpers";
import { useAppSelector } from "~hooks";

export const MHome: FC<
  MAuthScreenProps<MAuthNavigatorParamsList & MHomeNavigatorParamsList, "MHome">
> = ({ navigation }) => {
  const { organizedMeetings, conversations, manager } =
    useAppSelector(selectManagerState);
  const meetings = arrangeMeetings(organizedMeetings);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SView className="px-4 pt-6 flex space-y-4 flex-1">
        <SView className="flex flex-row justify-between">
          <SView className="h-12 w-32">
            <SImage
              source={savedImages.brandLogo}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </SView>
          <SButton
            variant="text"
            className="h-11 w-11 p-0"
            onPress={() => navigation.navigate("MProfileNavigator")}
          >
            <UserImage data={manager} size={"100%"} borderRadius={5} />
          </SButton>
        </SView>

        <SView className="flex flex-row space-x-3">
          <SView className="flex-1 flex-row border-manager border rounded-xl px-2">
            <STextInput
              className="h-10 flex-1 placeholder:font-osRegular"
              placeholder="Search"
            />
            <SButton variant="text">
              <Octicons name="search" size={24} color="black" />
            </SButton>
          </SView>
          <SButton
            className="border-manager border rounded-xl w-10"
            variant="text"
          >
            <Feather name="filter" size={24} color="black" />
          </SButton>
        </SView>

        <SView className="flex space-y-2">
          <SView className="flex flex-row items-center justify-between">
            <SText className="font-osBold">Recent Chats</SText>

            <SButton
              variant="text"
              onPress={() => navigation.navigate("MChatNavigator")}
            >
              <SText>View All</SText>
              <AntDesign name="arrowright" size={24} color="black" />
            </SButton>
          </SView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {conversations.slice(0, 8).map((conversation) => {
              return (
                <RecentChat
                  key={conversation.id}
                  name={
                    getUserName(conversation, manager.user_id).split(" ")[0] ??
                    ""
                  }
                  image={getUserImage(conversation, manager.user_id)}
                  navigation={() =>
                    // @ts-expect-error
                    navigation.navigate("MChatNavigator", {
                      screen: "MChat",
                      params: { conversation },
                    })
                  }
                />
              );
            })}
          </ScrollView>
        </SView>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <SView className="flex flex-row items-center justify-between">
            <SText className="font-osBold text-base">Meetings</SText>
            <SButton
              className="flex flex-row gap-x-1"
              variant="text"
              onPress={() => navigation.navigate("MMeetingNavigator")}
            >
              <SText className="text-base">View All</SText>
              <AntDesign name="arrowright" size={24} color="black" />
            </SButton>
          </SView>
          {Object.keys(meetings).length === 0 ? (
            <NoItem
              text="No meetings organized at the moment.
            Don't worry, you can create here"
              variant="manager"
              btnText="Meetings"
              route="MMeetingNavigator"
            />
          ) : (
            Object.entries(meetings).map(([key, value], index) => (
              <SView key={index} className="flex space-y-4">
                <SView className="flex flex-row items-center justify-between">
                  <SText className="font-osSemibold text-base">{key}</SText>
                </SView>
                {value.map((meeting, index) => (
                  <MeetingCard
                    key={meeting.id}
                    meeting={meeting}
                    bgColor={getRandomColor()}
                    time={key}
                  />
                ))}
              </SView>
            ))
          )}
        </ScrollView>
      </SView>
    </SafeAreaView>
  );
};
