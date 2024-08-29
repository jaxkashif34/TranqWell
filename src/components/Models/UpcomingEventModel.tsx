import React from 'react';
import { SView, SText, SImage, SButton, SModel } from '~base';
import { Octicons } from '@expo/vector-icons';
import { convertToAM_PM, timeRemaining, truncateString } from '~helpers';
import { EventType } from '~types';
import { useOpenURL } from '~hooks';
import { Path, Svg } from 'react-native-svg';

type Props = {
  visible: {
    reminder: boolean;
    event: boolean;
  };
  setModalVisible: React.Dispatch<
    React.SetStateAction<{
      reminder: boolean;
      event: boolean;
    }>
  >;
  event: EventType;
};

export const UpcomingEventModel = ({
  setModalVisible,
  visible,
  event,
}: Props) => {
  const { handleOpenURL } = useOpenURL();
  const handleAck = () => {};
  return (
    <SModel
      visible={visible.event}
      setModalVisible={() => setModalVisible((p) => ({ ...p, event: false }))}
    >
      <SView className="space-y-4 items-center">
        <SView className="px-6 items-center space-y-4">
          <SText className="text-2xl font-osSemibold tracking-wide text-center my-2">
            Upcoming Event
          </SText>
          <SView className="w-32 h-32">
            <SImage
              source={{
                uri: 'https://www.befunky.com/images/prismic/82e0e255-17f9-41e0-85f1-210163b0ea34_hero-blur-image-3.jpg?auto=avif,webp&format=jpg&width=896',
              }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 20,
                objectFit: 'cover',
              }}
            />
          </SView>

          <SText className="text-center font-osBold text-lg">
            {truncateString(event.name)}
          </SText>

          <SView className="flex flex-row gap-x-2 items-center">
            <SText className="font-osSemibold">
              {timeRemaining(event.time)}
            </SText>
            <Octicons
              name="dot-fill"
              size={14}
              color="black"
              style={{ marginTop: 6 }}
            />
            <SText className="font-osSemibold">
              {convertToAM_PM(event.time)}
            </SText>
          </SView>
        </SView>

        <SButton
          variant="customer"
          className="px-[18%]"
          onPress={() => handleOpenURL(event.link)}
        >
          <SView className="bg-current h-9 w-9 rounded-xl flex items-center justify-center">
            <Svg width={30} height={30} viewBox="0 -50 300 300">
              <Path
                fill="#00832d"
                d="m144.822 105.322l24.957 28.527l33.562 21.445l5.838-49.792l-5.838-48.669l-34.205 18.839z"
              />
              <Path
                fill="#0066da"
                d="M0 150.66v42.43c0 9.688 7.864 17.554 17.554 17.554h42.43l8.786-32.059l-8.786-27.925l-29.11-8.786z"
              />
              <Path
                fill="#e94235"
                d="M59.984 0L0 59.984l30.876 8.765l29.108-8.765l8.626-27.545z"
              />
              <Path fill="#2684fc" d="M.001 150.679h59.983V59.983H.001z" />
              <Path
                fill="#00ac47"
                d="M241.659 25.398L203.34 56.834v98.46l38.477 31.558c5.76 4.512 14.186.4 14.186-6.922V32.18c0-7.403-8.627-11.495-14.345-6.781"
              />
              <Path
                fill="#00ac47"
                d="M144.822 105.322v45.338H59.984v59.984h125.804c9.69 0 17.553-7.866 17.553-17.554v-37.796z"
              />
              <Path
                fill="#ffba00"
                d="M185.788 0H59.984v59.984h84.838v45.338l58.52-48.49V17.555c0-9.69-7.864-17.554-17.554-17.554"
              />
            </Svg>
          </SView>
          <SText className="text-white font-osSemibold text-lg tracking-wider">
            Join with Meet
          </SText>
        </SButton>
        <SButton variant="zoom" className="px-[20%]" onPress={handleAck}>
          <SText className="text-white font-osSemibold text-lg tracking-wider uppercase">
            Acknowledged
          </SText>
        </SButton>
      </SView>
    </SModel>
  );
};
