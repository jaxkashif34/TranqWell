import React, { useState, type FC } from 'react';
import type {
  BaseUser,
  MAuthScreenProps,
  MMeetingNavigatorParamsList,
} from '~types';
import {
  CreateMeetingModel,
  GradientLayout,
  MeetingUser,
  ScreenLoader,
} from '~components';
import { SButton, SText, STextInput, SView } from '~base';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { selectManagerState, showToast } from '~helpers';
import { Toast } from '~utils';

import { useAppSelector } from '~hooks';

export const MSetMeetingUsers: FC<
  MAuthScreenProps<MMeetingNavigatorParamsList, 'MSetMeetingUsers'>
> = ({ navigation, route }) => {
  const [selectedUser, setSelectedUser] = useState<BaseUser | null>(null);
  const [showDateTimeModel, setDateTimeModel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { customers } = useAppSelector(selectManagerState);

  const filteredCustomers = customers.filter((customer) => {
    return customer.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleMoveNext = () => {
    if (selectedUser) {
      setDateTimeModel(true);
    } else {
      return showToast({
        heading: 'Select User',
        subHeading: 'Please select a user to proceed',
        type: 'error',
      });
    }
  };

  return (
    <GradientLayout hideBottomCircle variant="manager">
      <Toast />
      <SView className="flex flex-row items-center mt-2 space-x-3 px-4 -z-50">
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
        <SText className="font-osBold text-lg">Go Back</SText>
      </SView>

      <SView className="flex-1 mt-5 -z-50">
        <SView className="px-4">
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

        <CreateMeetingModel
          showDateTimeModel={showDateTimeModel}
          route={route}
          selectedUser={selectedUser}
          setDateTimeModel={setDateTimeModel}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 3, marginTop: 10 }}
        >
          {customers.length === 0 ? (
            <ScreenLoader />
          ) : (
            filteredCustomers.map((user) => (
              <MeetingUser
                user={user}
                key={user.id}
                setSelectedUser={setSelectedUser}
                selectedUser={selectedUser}
              />
            ))
          )}
        </ScrollView>
        <SView className="justify-end py-2 px-4">
          <SButton variant="manager" onPress={handleMoveNext}>
            <SText className="text-white font-osSemibold text-lg tracking-wider">
              Select Date/Time
            </SText>
          </SButton>
        </SView>
      </SView>
    </GradientLayout>
  );
};
