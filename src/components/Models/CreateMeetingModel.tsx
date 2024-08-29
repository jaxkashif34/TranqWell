import React, { useReducer, useState } from "react";
import { Loader, SButton, SModel, SText, SView } from "~base";
import { FrequencyDropDown } from "../meeting/FrequencyDropDown";
import { DaysDropDown } from "../meeting/DaysDropDown";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { DateTimePicker } from "../meeting/DateTimePicker";
import {
  BaseUser,
  MeetingStateType,
  MMeetingNavigatorParamsList,
} from "~types";
import { useAppDispatch, useAppSelector } from "~hooks";
import {
  convertToAM_PM,
  selectManagerState,
  showToast,
  getDayNamesFromNumbers,
  getNextWeekDates,
} from "~helpers";
import { RouteProp } from "@react-navigation/native";
import { createRoomUrl } from "~services";
import { createMeeting } from "~redux";

type Props = {
  route: RouteProp<MMeetingNavigatorParamsList, "MSetMeetingUsers">;
  selectedUser: BaseUser;
  setDateTimeModel: React.Dispatch<React.SetStateAction<boolean>>;
  showDateTimeModel: boolean;
};

export const CreateMeetingModel = ({
  route,
  selectedUser,
  setDateTimeModel,
  showDateTimeModel,
}: Props) => {
  const [showDateModel, setShowDateModel] = useState(false);
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const [{ frequency, days, dateTime }, setState] = useReducer(
    (current: MeetingStateType, update: Partial<MeetingStateType>) => ({
      ...current,
      ...update,
    }),
    {
      frequency: null,
      days: null,
      dateTime: null,
    }
  );
  const { manager } = useAppSelector(selectManagerState);
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    if (!frequency)
      return showToast({
        heading: "Frequency",
        subHeading: "please select frequency",
        type: "error",
      });
    if (!days || days.length === 0)
      return showToast({
        heading: "Days",
        subHeading: "please select at least one day",
        type: "error",
      });
    if (!dateTime)
      return showToast({
        heading: "Time",
        subHeading: "please select time",
        type: "error",
      });

    setFormSubmitting(true);
    const room = await createRoomUrl();
    const res = getNextWeekDates(days, dateTime).map((date) => {
      return {
        ...route.params.data,
        organizer_id: manager.user_id,
        frequency,
        days: getDayNamesFromNumbers(days).join(", "),
        meeting_time: date.toISOString(),
        participant_id: selectedUser.id,
        meet_link: room.url,
      };
    });
    for (const item of res) {
      await dispatch(createMeeting(item));
    }

    setDateTimeModel(false);
    setFormSubmitting(false);
  };
  return (
    <SModel
      setModalVisible={setDateTimeModel}
      visible={showDateTimeModel}
      isDisabled={isFormSubmitting}
    >
      <SView className="space-y-4 w-11/12 py-2">
        <SText className="text-xl font-osSemibold tracking-wide text-center">
          Schedule Meeting
        </SText>
        <SView>
          <FrequencyDropDown setState={setState} />
          <DaysDropDown setState={setState} />
          <SButton
            style={{
              height: 50,
              width: "97%",
              borderColor: "gray",
              borderWidth: 0.5,
              borderRadius: 8,
              paddingHorizontal: 8,
            }}
            className="flex flex-row mx-auto mt-2 items-center justify-between"
            onPress={() => setShowDateModel(true)}
          >
            <SView className="flex flex-row items-center space-x-1">
              <AntDesign
                style={{ width: 20, height: 20 }}
                color="black"
                name="Safety"
                size={20}
              />
              <SText>
                {dateTime ? convertToAM_PM(dateTime) : "Select Date/Time"}
              </SText>
            </SView>
            <MaterialCommunityIcons
              name="chevron-down"
              size={21}
              color="gray"
            />
          </SButton>
          {showDateModel && (
            <DateTimePicker
              selectedDateTime={dateTime}
              setState={setState}
              showDateModel={showDateModel}
              setShowDateModel={setShowDateModel}
            />
          )}
        </SView>
        <SView className="flex flex-row items-center space-x-4">
          <SButton
            variant="manager"
            className={`flex-1 border-2  ${
              isFormSubmitting
                ? "bg- bg-gray-300 text-gray-200 border-gray-300"
                : "text-white border-manager"
            }`}
            disabled={isFormSubmitting}
            onPress={handleSubmit}
          >
            <SText className="text-white font-osBold text-xl mr-2">SAVE</SText>
            {isFormSubmitting && (
              <Loader
                height={30}
                width={30}
                borderWidth={5}
                topBottomColor="#e5e7eb"
              />
            )}
          </SButton>
          <SButton
            variant="outline"
            className="flex-1 px-4 py-2"
            onPress={() => setDateTimeModel(false)}
            disabled={isFormSubmitting}
          >
            <SText className="font-osBold text-xl">CANCEL</SText>
          </SButton>
        </SView>
      </SView>
    </SModel>
  );
};
