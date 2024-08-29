import type { MAuthScreenProps, UnAuthManagerParamsList } from '~types';
import type { FC } from 'react';
import React from 'react';
import { GradientLayout, AuthHeader } from '~components';
import { SText, SView, SButton } from '~base';

export const MGetStarted: FC<
  MAuthScreenProps<UnAuthManagerParamsList, 'MGetStarted'>
> = ({ navigation, route }) => {
  return (
    <GradientLayout variant="manager">
      <SView className="px-4 py-4">
        <AuthHeader goBack={navigation.goBack} />
        <SView className="flex gap-y-4 mb-2 px-2 pt-28 ">
          <SText className="font-osBold text-2xl">Get Started!</SText>
          <SText className="text-lg font-osLight tracking-wide">
            You're all set to start managing cases. As a case{' '}
            <SText className="font-osSemibold">manager</SText>, you'll have
            access to all the tools and features designed specifically for your
            role. {'\n'}Let's get started!
          </SText>
        </SView>
        <SView className="mt-8">
          <SButton
            onPress={() => navigation.navigate('MSignIn')}
            variant="manager"
          >
            <SText className="font-osBold text-white text-lg">
              Already have an Account
            </SText>
          </SButton>

          <SText className="text-center font-osBold text-xl my-5">OR</SText>

          <SButton
            onPress={() => navigation.navigate('MSignUp')}
            variant="manager"
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
