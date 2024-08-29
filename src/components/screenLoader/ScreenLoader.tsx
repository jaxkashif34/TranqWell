import React from 'react';
import { SView, Loader } from '~base';

type Props = {};

export const ScreenLoader = (props: Props) => {
  return (
    <SView className="flex flex-1 items-center justify-center">
      <Loader height={100} width={100} />
    </SView>
  );
};
