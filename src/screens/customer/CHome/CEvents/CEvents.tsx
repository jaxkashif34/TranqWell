import React, { FC, useEffect, useState } from 'react';
import { EventCardLayouts, ScreenLoader } from '~components';
import { SButton, SScrollView, SText, STextInput, SView } from '~base';
import { AuthCustomerScreenProps } from '~types';
import { Octicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '~hooks';
import { getEvents } from '~redux';
import { selectCustomerState } from '~helpers';

export const CEvents: FC<AuthCustomerScreenProps<'CEvents'>> = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { events } = useAppSelector(selectCustomerState);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredEvents = events.filter((event) => {
    return event.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (events.length === 0) {
        await dispatch(getEvents());
      }
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SView className="px-4 pt-6 flex space-y-4 flex-1">
        <SView className="">
          <SText className="font-osExtraBold tracking-wider text-xl">
            Events
          </SText>
        </SView>
        <SView>
          <SView className="flex flex-row space-x-3">
            <SView className="flex-1 flex-row border-customer border rounded-xl px-2">
              <STextInput
                className="h-10 flex-1 placeholder:font-osRegular"
                placeholder="Search"
                onChangeText={(text) => setSearchQuery(text)}
              />
              <SButton variant="text">
                <Octicons name="search" size={24} color="black" />
              </SButton>
            </SView>
            <SButton
              className="border-customer border rounded-xl w-10"
              variant="text"
            >
              <Feather name="filter" size={24} color="black" />
            </SButton>
          </SView>
        </SView>

        <SScrollView style={{ flex: 1 }}>
          {loading && events.length === 0 ? (
            <ScreenLoader />
          ) : (
            <EventCardLayouts events={filteredEvents} />
          )}
        </SScrollView>
      </SView>
    </SafeAreaView>
  );
};
