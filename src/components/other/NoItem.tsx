import React from 'react';
import { SButton, SText, SView } from '~base';
import { hexToRGBA } from '~helpers';
import { theme } from '~assets';
import { useNavigation } from '@react-navigation/native';

type Props = {
  text: string;
  variant: 'customer' | 'manager';
  btnText?: string;
  route?: 'MReminderNavigator' | 'MMeetingNavigator' | 'MSetMeetingData' | "MSetReminderData";
  showBtn?: boolean;
};

export const NoItem = ({
  text,
  variant,
  btnText,
  route,
  showBtn = true,
}: Props) => {
  const navigation = useNavigation<any>();
  return (
    <SView
      className={`bg-white p-2 rounded-xl border border-${variant} space-y-1`}
      style={{
        backgroundColor: hexToRGBA(theme.colors[variant], '0.7'),
      }}
    >
      <SText className="font-osSemibold tracking-wider text-center text-white font-bold text-lg">
        {text}
      </SText>
      {showBtn && (
        <SButton
          variant={variant}
          className="p-0"
          onPress={() => navigation.navigate(route)}
        >
          <SText className="text-white font-osSemibold">{btnText}</SText>
        </SButton>
      )}
    </SView>
  );
};
