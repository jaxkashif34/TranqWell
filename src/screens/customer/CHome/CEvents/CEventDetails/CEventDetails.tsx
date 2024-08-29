import React, { FC, useEffect } from 'react';
import {
  GradientLayout,
  SetReminderModel,
  UpcomingEventModel,
} from '~components';
import { SText, SView, SButton, SImage, SScrollView } from '~base';
import { Ionicons, Feather, Octicons } from '@expo/vector-icons';
import { convertToAM_PM, timeRemaining, truncateString } from '~helpers';
import { BASE_URL } from '~services';
import { AuthCustomerScreenProps } from '~types';
import { useAppDispatch } from '~hooks';
import { toggleTabBar } from '~redux';
import { Path, Svg } from 'react-native-svg';

export const CEventDetails: FC<AuthCustomerScreenProps<'CEventDetails'>> = ({
  navigation,
  route,
}) => {
  const [visible, setModalVisible] = React.useState({
    reminder: false,
    event: false,
  });
  const dispatch = useAppDispatch();
  const event = route.params;
  useEffect(() => {
    dispatch(toggleTabBar(false));

    return () => {
      dispatch(toggleTabBar(true));
    };
  }, []);

  return (
    <GradientLayout hideBottomCircle variant="customer">
      <SView className="flex px-3 space-y-3 flex-1">
        <SView className="flex flex-row items-center space-x-3">
          <SButton onPress={() => navigation.goBack()} variant="text">
            <Ionicons
              name="arrow-back"
              size={26}
              color="black"
              style={{
                padding: 3,
                borderRadius: 5,
              }}
            />
          </SButton>
          <SText className="font-osBold text-lg">Back to Chat</SText>
        </SView>
        <SScrollView style={{ flex: 1 }}>
          <SView className="h-80 w-full rounded-2xl">
            {event.banner_or_image === null && (
              <SText className="text-center font-osBold text-2xl mt-4">
                Please add an image for this event.
              </SText>
            )}
            <SImage
              source={{
                uri: `${BASE_URL}${event.banner_or_image}`,
              }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 20,
                objectFit: 'cover',
              }}
            />
          </SView>

          <SView className="space-y-3 my-2 mt-6">
            <SText className="font-osBold text-xl tracking-wider">
              {truncateString(event.name, 80)}
            </SText>

            <SetReminderModel
              visible={visible}
              setModalVisible={setModalVisible}
            />

            <SButton
              onPress={() => setModalVisible((p) => ({ ...p, reminder: true }))}
              className="flex flex-row items-center space-x-2 self-start"
              variant="text"
            >
              <Feather name="calendar" size={24} color="black" />

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
            </SButton>

            <UpcomingEventModel
              visible={visible}
              setModalVisible={setModalVisible}
              event={event}
            />

            <SButton
              variant="text"
              className="flex flex-row gap-x-2 items-center self-start space-x-2"
              onPress={() => setModalVisible((p) => ({ ...p, event: true }))}
            >
              <SView className="h-9 w-9 rounded-xl flex items-center justify-center">
                <Svg width={30} height={30} viewBox="0 -30 300 300">
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

              <SText className="font-osSemibold">
                {truncateString(event.link, 30)}
              </SText>
            </SButton>

            <SView>
              <SText className="leading-6 tracking-wide">
                {event.description}
              </SText>
            </SView>
          </SView>
        </SScrollView>
        <SButton variant="customer" onPress={() => null}>
          <SText className="text-white uppercase font-osBold text-xl tracking-wider">
            Book Event
          </SText>
        </SButton>
      </SView>
    </GradientLayout>
  );
};
