import React, { FC, useEffect, useMemo, useState } from 'react';
import { GradientLayout, ScreenLoader, SearchUser } from '~components';
import { SButton, SScrollView, SText, STextInput, SView } from '~base';
import { AuthCustomerScreenProps, BaseUser } from '~types';
import { Octicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector, useDebounce } from '~hooks';
import { searchCUser } from '~redux';
import { selectCustomerState } from '~helpers';

export const CAddUser: FC<AuthCustomerScreenProps<'CAddUser'>> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNoUserFound, setShowNoUserFound] = useState(false);
  const [searchUsers, setSearchedUsers] = useState<BaseUser[]>([]);
  const dispatch = useAppDispatch();
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const { conversations } = useAppSelector(selectCustomerState);
  const findChat = (id: number) => conversations.find((c) => c.id === id);
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setLoading(true);
        dispatch(searchCUser(debouncedSearchTerm))
          .then((results) => {
            if (results.payload.error) {
              setLoading(false);
              setSearchedUsers([]);
              setShowNoUserFound(true);
            } else {
              setLoading(false);
              if (Array.isArray(results.payload)) {
                setSearchedUsers(results.payload);
              } else {
                setShowNoUserFound(true);
                setSearchedUsers([]);
              }
            }
          })
          .catch(() => {
            setLoading(false);
            setSearchedUsers([]);
          });
      } else {
        setSearchedUsers([]);
        setShowNoUserFound(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <GradientLayout hideBottomCircle variant="customer">
      <SView className="flex space-y-4 pt-6 flex-1">
        <SView className="px-4 space-y-4">
          <SView className="flex flex-row items-center">
            <SText className="font-osExtraBold tracking-wider text-xl">
              Add User
            </SText>
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

        <SScrollView style={{ flex: 1 }}>
          {loading ? (
            <ScreenLoader />
          ) : searchQuery !== '' &&
            searchUsers.length === 0 &&
            showNoUserFound ? (
            <SView className="bg-white p-4 w-11/12 mx-auto rounded-xl border border-customer">
              <SText className="text-center">
                No User Found with this search :{' '}
                <SText className="font-osBold tracking-wider">
                  {searchQuery}
                </SText>
              </SText>
            </SView>
          ) : (
            searchUsers.map((user, i) => {
              return (
                <SearchUser
                  key={user.id}
                  user={user}
                  route="CAddUserChat"
                  findChat={findChat}
                  isChatExistedRoute="CChat"
                />
              );
            })
          )}
        </SScrollView>
      </SView>
    </GradientLayout>
  );
};
