import React from 'react';
import { SView, SButton, SImage } from '~base';
import { savedImages } from '~assets';
import { Ionicons } from '@expo/vector-icons';

// only one property is allowed
type Props =
  | { goBack: () => void; hideBackBtn?: never }
  | { goBack?: never; hideBackBtn: boolean };

export const AuthHeader: React.FC<Props> = ({
  hideBackBtn = false,
  goBack,
}) => {
  return (
    <SView className="py-1 flex items-center flex-row">
      {!hideBackBtn && (
        <SButton onPress={goBack} className="flex-1" variant="text">
          <Ionicons
            name="arrow-back"
            size={26}
            color="black"
            style={{
              backgroundColor: '#fff',
              marginLeft: 10,
              padding: 3,
              borderRadius: 5,
            }}
          />
        </SButton>
      )}
      <SView className="flex-[8] items-center">
        <SImage
          source={savedImages.brandLogo}
          style={{ height: 80, width: 300, resizeMode: 'contain' }}
        />
      </SView>
    </SView>
  );
};
