import React from 'react';
import { SButton, SText, SView } from '~base';
import { UserImage } from '../other/UserImage';

type Props = {
  name: string;
  image: string;
  navigation: () => void;
};

export const RecentChat = ({ image, name, navigation }: Props) => {
  return (
    <SButton
      className="flex items-center first:ml-0 mx-1 last:mr-0 py-0 flex-col"
      variant="text"
      onPress={navigation}
    >
      <SView>
        <UserImage data={{ profile_image: image, name }} size={65} />
        <SText className="text-sm">{name}</SText>
      </SView>
    </SButton>
  );
};
