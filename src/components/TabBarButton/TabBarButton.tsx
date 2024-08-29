import type { TabBarIconProps } from '~types';
import { SView, SText } from '~base';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { theme } from '~assets';

const tabNames = {
  CReminders: 'Reminders',
  MReminderNavigator: 'Reminders',
  CHome: 'Home',
  MHome: 'Home',
  CChatNavigator: 'Chats',
  MChatNavigator: 'Chats',
  CEventNavigator: 'Events',
  CTribeNavigator: 'Forums',
  MMeetingNavigator: 'Meetings',
  MClientsNavigator: 'Clients',
};

const icons = (iconName: keyof typeof tabNames) => ({
  ...((iconName === 'MReminderNavigator' || iconName === 'CReminders') && {
    Icon: ({ focused, size, isManager }) => (
      <AntDesign
        name="clockcircleo"
        size={size}
        color={
          focused
            ? isManager
              ? theme.colors.manager
              : theme.colors.customer
            : 'black'
        }
      />
    ),
  }),
  ...((iconName === 'CHome' || iconName === 'MHome') && {
    Icon: ({ focused, size, isManager }) => (
      <Feather
        name="home"
        size={size}
        color={
          focused
            ? isManager
              ? theme.colors.manager
              : theme.colors.customer
            : 'black'
        }
      />
    ),
  }),
  ...((iconName === 'CChatNavigator' || iconName === 'MChatNavigator') && {
    Icon: ({ focused, size, isManager }) => (
      <Ionicons
        name="chatbubble-outline"
        size={size + 2}
        color={
          focused
            ? isManager
              ? theme.colors.manager
              : theme.colors.customer
            : 'black'
        }
      />
    ),
  }),
  ...((iconName === 'CEventNavigator' || iconName === 'MMeetingNavigator') && {
    Icon: ({ focused, size, isManager }) => (
      <Feather
        name="calendar"
        size={size}
        color={
          focused
            ? isManager
              ? theme.colors.manager
              : theme.colors.customer
            : 'black'
        }
      />
    ),
  }),
  ...((iconName === 'CTribeNavigator' || iconName === 'MClientsNavigator') && {
    Icon: ({ focused, size, isManager }) => (
      <Feather
        name="clipboard"
        size={size}
        color={
          focused
            ? isManager
              ? theme.colors.manager
              : theme.colors.customer
            : 'black'
        }
      />
    ),
  }),
});

type TabButtonProps = TabBarIconProps & {
  route: { name: any };
  isManager: boolean;
};
export const TabBarButton = ({
  focused,
  size,
  route,
  isManager,
}: TabButtonProps) => {
  const Icon = icons(route.name);
  return (
    <SView className="flex justify-center items-center gap-y-1">
      {Icon.Icon && (
        <Icon.Icon focused={focused} size={size} isManager={isManager} />
      )}
      <SText
        className={`text-xs ${
          focused
            ? isManager
              ? 'text-manager'
              : 'text-customer'
            : 'text-black'
        }`}
      >
        {tabNames[route.name]}
      </SText>
    </SView>
  );
};
