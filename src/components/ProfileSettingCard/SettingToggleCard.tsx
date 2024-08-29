import { SView, SText, SLinearGradient, SwitchBtn } from '~base';

import React, { useState } from 'react';
import { theme } from '~assets';
import { hexToRGBA } from '~helpers';

type Props = {
  heading: string;
  text: string;
  icon: React.ReactNode;
  variant: 'customer' | 'manager';
};

export const SettingToggleCard = ({ heading, text, icon, variant }: Props) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = (isOn: boolean) => {
    setToggle(isOn);
  };
  return (
    <SLinearGradient
      colors={[
        'rgba(255, 255, 255, 0)',
        hexToRGBA(theme.colors[variant], '0.2'),
      ]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      className={`border border-${variant} rounded-2xl flex flex-row px-4 py-4 w-full my-2`}
    >
      <SView className="w-[85%]">
        <SView className="flex flex-row space-x-2 items-center">
          <SView className="w-10 h-10">{icon}</SView>
          <SText className="font-osBold mb-2">{heading}</SText>
        </SView>

        <SText>{text}</SText>
      </SView>

      <SView className={`flex justify-end`}>
        <SwitchBtn
          isOn={toggle}
          onColor={theme.colors[variant]}
          offColor={theme.colors.disabled}
          trackOffStyle={{ width: 50, height: 20 }}
          thumbOffStyle={{ width: 20, height: 20 }}
          thumbOnStyle={{ width: 20, height: 20 }}
          trackOnStyle={{ width: 50, height: 20 }}
          onToggle={handleToggle}
        />
      </SView>
    </SLinearGradient>
  );
};
