import React, { FC, useEffect, useMemo, useState } from "react";
import { GradientLayout, NoItem, ReminderCard } from "~components";
import { SButton, SScrollView, SText, STextInput, SView } from "~base";
import { AuthCustomerScreenProps } from "~types";
import { Octicons } from "@expo/vector-icons";
import {
  arrangeReminders,
  getRandomColor,
  selectCustomerState,
} from "~helpers";
import { useAppDispatch, useAppSelector } from "~hooks";
import { getCReminders } from "~redux";

export const CReminders: FC<AuthCustomerScreenProps<"CReminders">> = ({
  navigation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { customer, reminders } = useAppSelector(selectCustomerState);
  const [loading, setLoading] = useState(true);
  const filteredReminders = useMemo(
    () =>
      reminders.filter((reminder) => {
        return reminder.title.toLowerCase().includes(searchQuery.toLowerCase());
      }),
    [searchQuery, reminders.length]
  );
  const dispatch = useAppDispatch();
  const areminders = arrangeReminders(filteredReminders);
  useEffect(() => {
    const loadConversation = async () => {
      setLoading(true);
      if (reminders.length === 0) {
        await dispatch(getCReminders(customer.user_id));
      }
      setLoading(false);
    };
    loadConversation();
  }, []);

  return (
    <GradientLayout hideBottomCircle variant="customer">
      <SView className="flex space-y-4 pt-6 flex-1 px-4">
        <SView className="space-y-4">
          <SView className="flex flex-row justify-between items-center">
            <SText className="font-osExtraBold tracking-wider text-xl">
              Reminders
            </SText>
            {/* <SButton
              className="border-customer border rounded-xl w-10 h-10 bg-white"
              variant="text"
              onPress={() => navigation.navigate("CAddUser")}
            >
              <Feather name="edit" size={24} color="black" />
            </SButton> */}
          </SView>

          <SView className="flex-row border-customer border rounded-xl px-2 bg-white">
            <STextInput
              className="h-10 flex-1 placeholder:font-osRegular"
              placeholder="Search"
              onChangeText={(text) => setSearchQuery(text)}
            />
            <SButton variant="text">
              <Octicons name="search" size={24} color="black" />
            </SButton>
          </SView>
        </SView>

        <SScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {Object.keys(areminders).length === 0 ? (
            <NoItem
              text="No reminders is set at the moment"
              variant="customer"
              // btnText="Create Meeting"
              route="MSetMeetingData"
              showBtn={false}
            />
          ) : (
            Object.entries(areminders).map(([key, value], index) => (
              <SView key={index} className="flex space-y-4">
                <SView className="flex flex-row items-center justify-between">
                  <SText className="font-osBold text-base">{key}</SText>
                </SView>
                {value.map((reminder, index) => (
                  <ReminderCard
                    key={reminder.id}
                    reminder={reminder}
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
