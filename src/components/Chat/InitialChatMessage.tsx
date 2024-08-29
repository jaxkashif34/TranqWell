import React from 'react';
import { SText, SView } from '~base';
import { Feather } from '@expo/vector-icons';
import { hexToRGBA } from '~helpers';
import { theme } from '~assets';
type Props = {
  variant: 'customer' | 'manager';
};

export const InitialChatMessage = ({ variant }: Props) => {
  return (
    <SView className="flex-1">
      <SView
        className="mt-5 mx-auto w-2/3 flex flex-row rounded-lg p-2 space-x-2 cursor-none"
        style={{
          backgroundColor: hexToRGBA(theme.colors[variant], '0.2'),
        }}
      >
        <SText className="text-xs text-center tracking-wide">
          <Feather name="lock" size={12} color="black" />
          Messages are end-to-end encrypted. No one outside of this chat, can
          read them.
        </SText>
      </SView>
    </SView>
  );
};
