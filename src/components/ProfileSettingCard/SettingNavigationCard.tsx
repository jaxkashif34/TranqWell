import { SView, SText, SButton, SLinearGradient } from '~base';

import { Ionicons } from '@expo/vector-icons';
import { hexToRGBA } from '~helpers';
import { theme } from '~assets';

type Props = {
  heading: string;
  text: string;
  icon: React.ReactNode;
  onPress: () => void;
  variant: 'customer' | 'manager';
};

export const SettingNavigationCard = ({
  heading,
  text,
  icon,
  onPress,
  variant,
}: Props) => {
  return (
    <SLinearGradient
      colors={[
        'rgba(255, 255, 255, 0)',
        hexToRGBA(theme.colors[variant], '0.2'),
      ]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      className={`border border-${variant} rounded-2xl flex flex-row px-4 py-4 w-full my-2`}
    >
      <SView className="w-[85%]">
        <SView className="flex flex-row space-x-2 items-center">
          <SView className="w-10 h-10">{icon}</SView>
          <SText className="font-osBold mb-2">{heading}</SText>
        </SView>

        <SText>{text}</SText>
      </SView>

      <SView className={`flex justify-center`}>
        <SButton onPress={onPress} variant="text">
          <Ionicons
            name="arrow-forward"
            size={26}
            color="black"
            style={{
              backgroundColor: '#fff',
              marginLeft: 10,
              padding: 7,
              borderRadius: 100,
            }}
          />
        </SButton>
      </SView>
    </SLinearGradient>
  );
};
