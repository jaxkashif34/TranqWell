import React from 'react';
import { SView, SText, SButton } from '~base';
import { AntDesign } from '@expo/vector-icons';
import { EventCard } from '../Card/EventCard';
import { EventType } from '~types';
import { NoItem } from '../other/NoItem';

type Props = {
  events: EventType[];
};

export const EventCardLayouts = ({ events }: Props) => {
  return (
    <>
      <SView className="flex flex-row items-center justify-between">
        <SText className="font-osBold text-base">Upcoming Events</SText>
        <SButton className="flex flex-row gap-x-1" variant="text">
          <SText className="text-base">View All</SText>
          <AntDesign name="arrowright" size={24} color="black" />
        </SButton>
      </SView>
      <SView className="mt-2">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} bgColor="alert" />
          ))
        ) : (
          <NoItem
            text="No events scheduled"
            variant="customer"
            showBtn={false}
          />
        )}
      </SView>
    </>
  );
};
