import React, { useEffect, useState, type FC } from 'react';
import {
  GradientLayout,
  EventCardLayouts,
  ScreenLoader,
  CustomerMeetingCard,
  NoItem,
  DiscussionCard,
  UserImage,
} from '~components';
import { SText, SView, SImage, SButton, SScrollView } from '~base';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { AuthCustomerScreenProps } from '~types';
import { selectCustomerState, getRandomColor, arrangeMeetings } from '~helpers';
import { getCDiscussionForums, getEvents } from '~redux';
import { useAppDispatch, useAppSelector } from '~hooks';

export const CProfile: FC<AuthCustomerScreenProps<'CProfile'>> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { events, customer, organizedMeetings, discussions } =
    useAppSelector(selectCustomerState);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (events.length === 0) {
        await dispatch(getEvents());
      }
      if (discussions.length === 0) {
        await dispatch(getCDiscussionForums());
      }
      setLoading(false);
    };
    loadData();
  }, []);
  const meetings = arrangeMeetings(organizedMeetings);
  return (
    <GradientLayout hideBottomCircle variant="customer">
      <SView className="flex flex-row items-center justify-between px-4 mt-2">
        <SView className="flex flex-row items-center space-x-3">
          <Ionicons
            name="arrow-back"
            size={26}
            color="black"
            style={{
              padding: 3,
              borderRadius: 5,
            }}
            onPress={navigation.goBack}
          />
          <SText className="font-osBold text-lg">Profile</SText>
        </SView>
        <SView className="flex flex-row space-x-3 justify-end">
          <SButton
            className="bg-white h-10 w-10 rounded-lg border border-customer"
            onPress={() => navigation.navigate('CEditProfile')}
            variant="text"
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </SButton>
          <SButton
            className="bg-white h-10 w-10 rounded-lg border border-customer"
            onPress={() => navigation.navigate('CProfileSettings')}
            variant="text"
          >
            <Ionicons name="settings-outline" size={24} color="black" />
          </SButton>
        </SView>
      </SView>
      <SView className="flex-1 space-y-5 px-2">
        <SView className="p-3 flex items-center space-y-4">
          <SView className="w-24 h-24 rounded-xl mt-4">
            <UserImage data={customer} size={'100%'} borderRadius={5} />
          </SView>
          <SView className="flex items-center space-y-1">
            <SText className="font-osBold">{customer.name}</SText>
            <SText>{customer.email}</SText>
            <SView className="flex flex-row items-center space-x-1">
              <Ionicons name="location-outline" size={24} color="black" />
              <SText>
                {customer.country}, {customer.city}
              </SText>
            </SView>
            <SText className="text-xs text-center tracking-wide">
              {customer.bio}
            </SText>
          </SView>
        </SView>

        <SView className="border-0 border-t border-t-gray-300 my-1" />

        <SScrollView className="flex-1 px-1 my-4 ">
          <SView className="flex flex-row items-center justify-between">
            <SText className="font-osBold text-base">Scheduled Meetings</SText>
          </SView>
          {Object.keys(meetings).length === 0 ? (
            <NoItem
              text="There are no meetings scheduled between you and your Case Manager"
              variant="customer"
              showBtn={false}
            />
          ) : (
            Object.entries(meetings).map(([key, value], index) => (
              <SView key={index} className="flex space-y-4">
                <SView className="flex flex-row items-center justify-between">
                  <SText className="font-osBold text-base">{key}</SText>
                </SView>
                {value.map((meeting, index) => (
                  <CustomerMeetingCard
                    key={meeting.id}
                    meeting={meeting}
                    bgColor={getRandomColor()}
                    time={key}
                  />
                ))}
              </SView>
            ))
          )}
          {loading && events.length === 0 ? (
            <ScreenLoader />
          ) : (
            <EventCardLayouts events={events} />
          )}

          <SView className="flex flex-row items-center justify-between">
            <SText className="font-osBold text-base">Discussion Forums</SText>
          </SView>
          {loading ? (
            <ScreenLoader />
          ) : discussions.length === 0 ? (
            <SView className="bg-white p-4 rounded-xl border border-customer">
              <SText className="text-lg font-osBold tracking-wider text-center">
                recent discussions will display here
              </SText>
            </SView>
          ) : (
            <>
              {discussions.map((forum) => (
                <DiscussionCard
                  key={forum.id}
                  forum={forum}
                  bgColor={getRandomColor()}
                />
              ))}
            </>
          )}
        </SScrollView>
      </SView>
    </GradientLayout>
  );
};
