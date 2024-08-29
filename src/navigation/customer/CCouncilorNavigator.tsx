import { View, Text } from 'react-native';
import React, { type FC } from 'react';
import { AuthCustomerScreenProps } from '~types';

type Props = {};

export const CCouncilorNavigator:FC<AuthCustomerScreenProps<"CCouncilorNavigator">> = (props: Props) => {
  return (
    <View>
      <Text>CCouncilorNavigator</Text>
    </View>
  );
};
