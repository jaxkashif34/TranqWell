import React, { useEffect, useMemo, useState, type FC } from 'react';
import { AuthCustomerScreenProps } from '~types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SButton, SScrollView, SText, STextInput, SView } from '~base';
import { Octicons, Feather } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '~hooks';
import { selectCustomerState, getRandomColor } from '~helpers';
import { DiscussionCard, ScreenLoader } from '~components';
import { getCDiscussionForums } from '~redux';

export const CDiscussionForums: FC<
  AuthCustomerScreenProps<'CDiscussionForums'>
> = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { discussions } = useAppSelector(selectCustomerState);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const filteredChats = useMemo(
    () =>
      discussions.filter((forum) => {
        return forum.title.toLowerCase().includes(searchQuery.toLowerCase());
      }),
    [searchQuery, discussions.length]
  );
  useEffect(() => {
    const loadForums = async () => {
      setLoading(true);
      if (discussions.length === 0) {
        await dispatch(getCDiscussionForums());
      }
      setLoading(false);
    };
    loadForums();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SView className="px-4 pt-6 flex space-y-4 flex-1">
        <SView className="">
          <SText className="font-osExtraBold tracking-wider text-xl">
            Explore!
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

        <SButton
          variant="text"
          className="p-3 border-customer border rounded-xl flex flex-row space-x-2"
          onPress={() => navigation.navigate('CCreateDiscussionForum')}
        >
          <Feather name="edit" size={26} color="black" />
          <SText className="font-osSemibold">Start Discussion</SText>
        </SButton>
        <SScrollView style={{ flex: 1 }}>
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
              {filteredChats.map((forum) => (
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
    </SafeAreaView>
  );
};
