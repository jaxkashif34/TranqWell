import React from "react";
import { SButton, SText, SView } from "~base";
import { Octicons } from "@expo/vector-icons";
import { ButtonVariants } from "~types";
import { convertToAM_PM, timeRemaining, truncateString } from "~helpers";
import { UserImage } from "../other/UserImage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CaseMangerToReminder } from "src/types/Reminders";

type Props = {
  bgColor: ButtonVariants;
  time: string;
  reminder: CaseMangerToReminder;
};

export const CaseManagerReminderCard = ({ bgColor, time, reminder }: Props) => {
  if (reminder && reminder?.customers && Array.isArray(reminder.customers)) {
    return reminder.customers?.map((customer, i) => {
      return (
        <SView
          key={i}
          className={`rounded-xl flex flex-row items-center p-4 mb-4 bg-${bgColor}`}
        >
          <SView className="flex-1 space-y-2">
            <SText className="font-osSemibold text-lg">
              {truncateString(reminder.title, 55)}
            </SText>
            <SView className="flex flex-row items-center space-x-2">
              <UserImage data={customer} size={50} />
              <SText className="text-lg">{customer.name}</SText>
            </SView>

            <SView className="bg-white rounded-xl p-2 self-start flex flex-row items-center space-x-1">
              <SText className="font-osSemibold">
                {timeRemaining(reminder.date_time)}
              </SText>
              <Octicons
                name="dot-fill"
                size={20}
                color="black"
                style={{ marginTop: 5 }}
              />
              <SText className="font-osSemibold">
                {convertToAM_PM(reminder.date_time)}
              </SText>
            </SView>
          </SView>
          <SButton
            className="bg-white rounded-full h-9 w-9 flex justify-center items-center"
            variant="text"
            // onPress={() =>
            //   navigation.navigate("MMeetingNavigator", {
            //     screen: "MMeetingDetails",
            //     params: { meeting },
            //   })
            // }
          >
            <MaterialIcons name="alarm" size={24} color="black" />
          </SButton>
        </SView>
      );
    });
  } else {
    return null;
  }
};
