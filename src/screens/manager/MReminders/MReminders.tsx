import React, { FC, useEffect, useMemo, useState } from "react";
import {
  CaseManagerReminderCard,
  GradientLayout,
  NoItem,
  ReminderCard,
  ScreenLoader,
} from "~components";
import { SButton, SScrollView, SText, STextInput, SView } from "~base";
import { MAuthScreenProps, MReminderNavigatorParamsList } from "~types";
import { Octicons, Feather } from "@expo/vector-icons";
import { arrangeReminders, getRandomColor, selectManagerState } from "~helpers";
import { useAppDispatch, useAppSelector } from "~hooks";
import { getMReminders } from "~redux";
import { CaseMangerToReminder } from "src/types/Reminders";

export const MReminders: FC<
  MAuthScreenProps<MReminderNavigatorParamsList, "MReminders">
> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { manager, reminders } = useAppSelector(selectManagerState);
  const [loading, setLoading] = useState(true);
  const filteredReminders = useMemo(
    () =>
      reminders.filter((reminder) => {
        const query = searchQuery.toLowerCase();
        return reminder.title.toLowerCase().includes(query);
      }),
    [searchQuery, reminders]
  );
  const dispatch = useAppDispatch();
  const areminders = arrangeReminders(filteredReminders);
  useEffect(() => {
    const loadConversation = async () => {
      setLoading(true);
      if (reminders.length === 0) {
        await dispatch(getMReminders(manager.user_id));
      }
      setLoading(false);
    };
    loadConversation();
  }, []);

  return (
    <GradientLayout hideBottomCircle variant="manager">
      <SView className="flex space-y-4 pt-6 flex-1 px-4">
        <SView className="space-y-4">
          <SView className="flex flex-row justify-between items-center">
            <SText className="font-osExtraBold tracking-wider text-xl">
              Reminders
            </SText>
            <SButton
              className="border-manager border rounded-xl w-10 h-10 bg-white"
              variant="text"
              onPress={() => navigation.navigate("MSetReminderData")}
            >
              <Feather name="edit" size={24} color="black" />
            </SButton>
          </SView>

          <SView className="flex-row border-manager border rounded-xl px-2 bg-white">
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
          {loading ? (
            <ScreenLoader />
          ) : Object.keys(areminders).length === 0 ? (
            <NoItem
              text="No Reminders set at the moment.
          Don't worry, you can create here"
              variant="manager"
              btnText="Set Reminder"
              route="MSetReminderData"
            />
          ) : (
            Object.entries(areminders).map(([key, value], index) => (
              <SView key={index} className="flex space-y-4">
                <SView className="flex flex-row items-center justify-between">
                  <SText className="font-osBold text-base">{key}</SText>
                </SView>
                {value.map((reminder: CaseMangerToReminder, index) => (
                  <CaseManagerReminderCard
                    key={index}
                    bgColor={getRandomColor()}
                    time={reminder.date_time}
                    reminder={reminder}
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
