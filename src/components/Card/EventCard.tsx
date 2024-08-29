import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StackImages } from './StackImages';
import { Octicons } from '@expo/vector-icons';
import { SView, SText, SButton } from '~base';
import { useNavigation } from '@react-navigation/native';
import {
  CEventsScreens,
  convertToAM_PM,
  timeRemaining,
  truncateString,
} from '~helpers';
import { ButtonVariants, EventType } from '~types';

type Props = {
  bgColor: ButtonVariants;
  event: EventType;
};

export const EventCard = ({ bgColor, event }: Props) => {
  const navigation = useNavigation<any>();
  return (
    <SView
      className={`rounded-xl flex flex-row items-center p-5 mb-4 bg-${bgColor}`}
    >
      <SView className="flex-1 gap-y-4">
        <SText className="font-osSemibold text-lg">
          {truncateString(event.name)}
        </SText>
        <SView>
          <SView className="flex flex-row gap-x-2 items-center">
            <SText className="font-osSemibold">
              {timeRemaining(event.time)}
            </SText>
            <Octicons
              name="dot-fill"
              size={20}
              color="black"
              style={{ marginTop: 6 }}
            />
            <SText className="font-osSemibold">
              {convertToAM_PM(event.time)}
            </SText>
          </SView>
          <StackImages />
        </SView>
      </SView>
      <SButton
        className="bg-white rounded-full h-9 w-9 flex justify-center items-center"
        onPress={() => navigation.navigate(CEventsScreens.CEventDetails, event)}
        variant="text"
      >
        <AntDesign name="arrowright" size={24} color="black" />
      </SButton>
    </SView>
  );
};
