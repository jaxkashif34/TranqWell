import type { UnAuthCustomerScreenProps } from '~types';
import type { FC } from 'react';
import React from 'react';
import { GradientLayout, AuthHeader } from '~components';
import { SText, SView, SButton } from '~base';
import { UnAuthCScreens } from '~helpers';

export const CGetStarted: FC<UnAuthCustomerScreenProps<'CGetStarted'>> = ({
  navigation,
  route,
}) => {
  return (
    <GradientLayout variant="customer">
      <SView className="px-4 py-4">
        <AuthHeader goBack={navigation.goBack} />
        <SView className="flex gap-y-4 mb-2 px-2 pt-28 ">
          <SText className="font-osBold text-2xl">Get Started!</SText>
          <SText className="text-lg font-osLight tracking-wide">
            You've taken the first step towards managing your account. As a{' '}
            <SText className="font-osSemibold">customer</SText>, you'll have
            access to all the features tailored specifically for you. Let's get
            started!
          </SText>
        </SView>
        <SView className="mt-8">
          <SButton
            onPress={() => navigation.navigate(UnAuthCScreens.CSignIn)}
            variant="customer"
          >
            <SText className="font-osBold text-white text-lg">
              Already have an Account
            </SText>
          </SButton>

          <SText className="text-center font-osBold text-xl my-5">OR</SText>

          <SButton
            onPress={() => navigation.navigate(UnAuthCScreens.CSignUp)}
            variant="customer"
          >
            <SText className="font-osBold text-white text-lg">
              Create a new Account
            </SText>
          </SButton>
        </SView>
      </SView>
    </GradientLayout>
  );
};
