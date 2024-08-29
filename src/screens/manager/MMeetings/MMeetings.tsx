import React, { type FC } from 'react';
import { MAuthScreenProps, MMeetingNavigatorParamsList } from '~types';
import { MeetingCard, NoItem } from '~components';
import { SButton, SScrollView, SText, STextInput, SView } from '~base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Octicons } from '@expo/vector-icons';
import { arrangeMeetings, getRandomColor, selectManagerState } from '~helpers';
import { useAppSelector } from '~hooks';

export const MMeetings: FC<
  MAuthScreenProps<MMeetingNavigatorParamsList, 'MMeetings'>
> = ({ navigation }) => {
  const { organizedMeetings } = useAppSelector(selectManagerState);
  const meetings = arrangeMeetings(organizedMeetings);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SView className="flex space-y-4 pt-6 flex-1 px-4">
        <SView className="space-y-4">
          <SView className="flex flex-row justify-between items-center">
            <SText className="font-osExtraBold tracking-wider text-xl">
              Meetings
            </SText>
            <SButton
              className="border-manager border rounded-xl w-10 h-10 bg-white p-0"
              variant="text"
              onPress={() => navigation.navigate('MSetMeetingData')}
            >
              <Feather name="edit" size={24} color="black" />
            </SButton>
          </SView>
          <SView className="flex flex-row justify-between space-x-2">
            <SView className="flex-row border-manager border rounded-xl px-2 bg-white flex-1">
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
        </SView>

        <SScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {Object.keys(meetings).length === 0 ? (
            <NoItem
              text="No meetings organized at the moment.
          Don't worry, you can create here"
              variant="manager"
              btnText="Create Meeting"
              route="MSetMeetingData"
            />
          ) : (
            Object.entries(meetings).map(([key, value], index) => (
              <SView key={index} className="flex space-y-4">
                <SView className="flex flex-row items-center justify-between">
                  <SText className="font-osBold text-base">{key}</SText>
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
        </SScrollView>
      </SView>
    </SafeAreaView>
  );
};
