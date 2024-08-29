import React, { type FC } from "react";
import {
  GradientLayout,
  CustomerMeetingCard,
  NoItem,
  UserImage,
} from "~components";
import { SText, SView, SImage, SScrollView, SButton } from "~base";
import { Ionicons } from "@expo/vector-icons";
import { MAuthScreenProps, MProfileNavigatorParamsList } from "~types";
import { useAppSelector } from "~hooks";
import { arrangeMeetings, getRandomColor, selectManagerState } from "~helpers";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

export const MProfile: FC<
  MAuthScreenProps<MProfileNavigatorParamsList, "MProfile">
> = ({ navigation }) => {
  const { manager, organizedMeetings } = useAppSelector(selectManagerState);

  const meetings = arrangeMeetings(organizedMeetings);
  return (
    <GradientLayout hideBottomCircle variant="manager">
      <SView className="flex flex-row items-center justify-between px-4 mt-2">
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
          <SText className="font-osBold text-lg">Profile</SText>
        </SView>
        <SView className="flex flex-row space-x-3 justify-end">
          <SButton
            className="bg-white h-10 w-10 rounded-lg border border-manager"
            onPress={() => navigation.navigate("MEditProfile")}
            variant="text"
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </SButton>
          <SButton
            className="bg-white h-10 w-10 rounded-lg border border-manager"
            onPress={() => navigation.navigate("MProfileSettings")}
            variant="text"
          >
            <Ionicons name="settings-outline" size={24} color="black" />
          </SButton>
        </SView>
      </SView>
      <SView className="flex-1 space-y-5 px-2">
        <SView className="p-3 flex items-center space-y-4">
          <SView className="w-24 h-24 rounded-xl mt-4">
            <UserImage data={manager} size={"100%"} borderRadius={5} />
          </SView>
          <SView className="flex items-center space-y-1">
            <SText className="font-osBold">{manager.name}</SText>
            <SText>{manager.email}</SText>
            <SView className="flex flex-row items-center space-x-1">
              <Ionicons name="location-outline" size={24} color="black" />
              <SText>
                {manager.country}, {manager.city}
              </SText>
            </SView>
            <SText className="text-xs text-center tracking-wide">
              {manager.bio}
            </SText>
          </SView>
        </SView>

        <SView className="border-0 border-t border-t-gray-300 my-1" />

        <SScrollView className="flex-1 px-1 my-4 ">
          <SView className="flex flex-row items-center justify-between">
            <SText className="font-osBold text-base">Scheduled Meetings</SText>
            <SButton
              className="flex flex-row gap-x-1"
              variant="text"
              // @ts-ignore
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
                  <SText className="font-osBold text-base">{key}</SText>
                </SView>
                {value.map((meeting, index) => (
                  <CustomerMeetingCard
                    key={meeting.id}
                    meeting={meeting}
                    bgColor={getRandomColor()}
                    time={key}
                  />
                ))}
              </SView>
            ))
          )}
        </SScrollView>
      </SView>
    </GradientLayout>
  );
};
