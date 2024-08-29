import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SView, SText, SButton } from "~base";
import { useNavigation } from "@react-navigation/native";
import { convertToAM_PM, truncateString } from "~helpers";
import { ButtonVariants, CProfileNavigatorParamsList, Meeting } from "~types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserImage } from "../other/UserImage";

type Props = {
  bgColor: ButtonVariants;
  meeting: Meeting;
  time: string;
};

export const CustomerMeetingCard = ({ bgColor, meeting, time }: Props) => {
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
    useNavigation<NativeStackNavigationProp<CProfileNavigatorParamsList>>();
  return (
    <SView
      className={`rounded-xl flex flex-row items-center p-4 mb-4 bg-${bgColor}`}
    >
      <SView className="flex-1 space-y-2">
        <SText className="font-osSemibold text-lg">
          {truncateString(title, 55)}
        </SText>
        <SView className="flex flex-row items-center space-x-2">
          <UserImage
            isProfile={Boolean(participant_data.profile_image)}
            data={participant_data}
            size={50}
          />
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
          navigation.navigate("CMeetingDetails", {
            meeting,
          })
        }
      >
        <AntDesign name="arrowright" size={24} color="black" />
      </SButton>
    </SView>
  );
};
