import React from 'react';
import { SView, SText, SImage } from '~base';
import { savedImages } from '~assets';

type Props = {};

export const StackImages = (props: Props) => {
  return (
    <SView className="flex flex-row items-center">
      <SView className="flex flex-row mt-4">
        <SImage
          source={savedImages.splashBG}
          className="rounded-full w-10 h-10"
        />
        <SImage
          source={savedImages.Profile}
          className="rounded-full w-10 h-10 transform -translate-x-4"
        />
        <SImage
          source={savedImages.splashBG}
          className="rounded-full w-10 h-10 transform -translate-x-8"
        />
      </SView>
      <SText className="font-osSemibold text-center mt-3 transform -translate-x-4 text-sm">
        +23
      </SText>
    </SView>
  );
};
