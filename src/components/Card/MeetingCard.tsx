import React from "react";
import { SButton, SImage, SText, SView } from "~base";
import { AntDesign, Octicons } from "@expo/vector-icons";
import {
  ButtonVariants,
  Meeting,
  MHomeNavigatorParamsList,
  MMeetingNavigatorParamsList,
} from "~types";
import { convertToAM_PM, truncateString } from "~helpers";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { UserImage } from "../other/UserImage";

type Props = {
  bgColor: ButtonVariants;
  time: string;
  meeting: Meeting;
};

export const MeetingCard = ({ bgColor, time, meeting }: Props) => {
  const {
    title,
    description,
    id,
    meeting_time,
    days,
    frequency,
    link,
    organizer_data,
    organizer_id,
    participant_data,
    participant_id,
  } = meeting;
  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        MMeetingNavigatorParamsList & MHomeNavigatorParamsList
      >
    >();
  return (
    <SView
      className={`rounded-xl flex flex-row items-center p-4 mb-4 bg-${bgColor}`}
    >
      <SView className="flex-1 space-y-2">
        <SText className="font-osSemibold text-lg">
          {truncateString(title, 55)}
        </SText>
        <SView className="flex flex-row items-center space-x-2">
          <UserImage data={participant_data} size={50} />
          <SText className="text-lg">{participant_data.name}</SText>
        </SView>

        <SView className="bg-white rounded-xl p-2 self-start flex flex-row items-center space-x-1">
          <SText className="font-osSemibold">{time}</SText>
          <Octicons
            name="dot-fill"
            size={20}
            color="black"
            style={{ marginTop: 5 }}
          />
          <SText className="font-osSemibold">
            {convertToAM_PM(meeting_time)}
          </SText>
        </SView>
      </SView>
      <SButton
        className="bg-white rounded-full h-9 w-9 flex justify-center items-center"
        variant="text"
        onPress={() =>
          navigation.navigate("MMeetingNavigator", {
            screen: "MMeetingDetails",
            params: { meeting },
          })
        }
      >
        <AntDesign name="arrowright" size={24} color="black" />
      </SButton>
    </SView>
  );
};
