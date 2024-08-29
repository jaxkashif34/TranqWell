import DTPicker from "@react-native-community/datetimepicker";
import React from "react";
import { MeetingStateType } from "~types";

type DateTimePickerProps = {
  setState: React.Dispatch<Partial<MeetingStateType>>;
  selectedDateTime: MeetingStateType["dateTime"];
  showDateModel: boolean;
  setShowDateModel: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DateTimePicker = ({
  selectedDateTime,
  setState,
  showDateModel,
  setShowDateModel,
}: DateTimePickerProps) => {
  return (
    showDateModel && (
      <DTPicker
        testID="dateTimePicker"
        value={new Date(selectedDateTime)}
        mode="time"
        display="default"
        collapsable={showDateModel}
        onChange={(event, selectedDate) => {
          const currentDate = new Date(selectedDate);
          setShowDateModel(false);
          setState({ dateTime: currentDate.toISOString() });
        }}
      />
    )
  );
};
