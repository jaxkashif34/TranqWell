import React, { useReducer } from 'react';
import { theme } from '~assets';
import { SView, SText, SButton, SModel, SCheckBox } from '~base';

type Props = {
  visible: {
    reminder: boolean;
    event: boolean;
  };
  setModalVisible: React.Dispatch<
    React.SetStateAction<{
      reminder: boolean;
      event: boolean;
    }>
  >;
};

type State = {
  everyday: boolean;
  dayBefore: boolean;
  hourBefore: boolean;
};

export const SetReminderModel = ({ setModalVisible, visible }: Props) => {
  const [{ everyday, dayBefore, hourBefore }, setReminder] = useReducer(
    (current: State, update: Partial<State>): State => ({
      ...current,
      ...update,
    }),
    {
      everyday: false,
      dayBefore: false,
      hourBefore: false,
    }
  );
  return (
    <SModel
      visible={visible.reminder}
      setModalVisible={() =>
        setModalVisible((p) => ({ ...p, reminder: false }))
      }
    >
      <SText className="text-2xl font-osSemibold tracking-wide text-center">
        Set Reminder
      </SText>
      <SText className="text-lg text-center leading-6 my-5">
        Select options from the following to set reminders for this event
      </SText>

      {/* checkboxes */}
      <SView className="flex space-y-6 my-6 -ml-6">
        <SView className="flex flex-row space-x-4 items-center">
          <SCheckBox
            className="rounded-lg w-7 h-7"
            value={everyday}
            color={theme.colors.customer}
            onValueChange={() => setReminder({ everyday: !everyday })}
          />
          <SText className="text-lg">I want reminders everyday</SText>
        </SView>
        <SView className="flex flex-row space-x-4 items-center">
          <SCheckBox
            className="rounded-lg w-7 h-7"
            value={dayBefore}
            color={theme.colors.customer}
            onValueChange={() => setReminder({ dayBefore: !dayBefore })}
          />
          <SText className="text-lg">1 day before the event</SText>
        </SView>
        <SView className="flex flex-row space-x-4 items-center">
          <SCheckBox
            className="rounded-lg w-7 h-7"
            value={hourBefore}
            color={theme.colors.customer}
            onValueChange={() => setReminder({ hourBefore: !hourBefore })}
          />
          <SText className="text-lg">1 hour before the event</SText>
        </SView>
      </SView>

      <SView className="mt-4 flex flex-row">
        <SButton
          variant="customer"
          onPress={() => null}
          className="flex-auto mr-2 rounded-lg"
        >
          <SText className="font-osSemibold text-white text-center text-lg">
            CONFIRM
          </SText>
        </SButton>

        <SButton
          variant="outline"
          onPress={() => setModalVisible((p) => ({ ...p, reminder: false }))}
          className="flex-auto ml-2 rounded-lg"
        >
          <SText className="font-osSemibold text-center text-lg">CANCEL</SText>
        </SButton>
      </SView>
    </SModel>
  );
};
