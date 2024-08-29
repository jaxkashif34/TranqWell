import React from 'react';
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { theme } from '~assets';
import { useOrientation } from '~hooks';
import { robotID, Orientation } from '~utils';
import { G, Path, Svg } from 'react-native-svg';
import { SView } from '~base';

type Props = {
  disabled?: boolean;
  onPress: () => void;
  muted?: boolean;
  robotId?: string;
  type: 'mic' | 'camera' | 'leave' | 'screenShare';
};
export default function TrayButton({
  disabled = false,
  onPress,
  muted = false,
  robotId = 'robots-leave-button',
  type,
}: Props) {
  const orientation = useOrientation();
  const isLeaveButton: boolean = type === 'leave';
  const isScreenShareButton: boolean = type === 'screenShare';
  const iconStyle = [
    styles.iconBase,
    orientation === Orientation.Portrait
      ? styles.iconPortrait
      : styles.iconLandscape,
    disabled && styles.disabled,
    isLeaveButton && styles.iconLeave,
  ];
  if (!isLeaveButton) {
    robotId = `robots-btn-${type.slice(0, 3)}-${muted ? 'mute' : 'unmute'}`;
  }

  const getSource = () => {
    switch (type) {
      case 'camera':
        return muted ? (
          <Feather name="camera" size={33} color="white" style={iconStyle} />
        ) : (
          <Feather
            name="camera-off"
            size={33}
            color="white"
            style={iconStyle}
          />
        );
      case 'mic':
        return muted ? (
          <Feather name="mic-off" size={33} color="white" style={iconStyle} />
        ) : (
          <Feather name="mic" size={33} color="white" style={iconStyle} />
        );
      case 'leave':
        return (
          <SView className="bg-red-600 w-11 h-11 rounded-full flex items-center justify-center">
            <Svg viewBox="0 0 24 11" height={33} width={33}>
              <G
                fill-rule="evenodd"
                id="Page-1"
                stroke="white"
                stroke-width="1"
              >
                <G
                  fill="white"
                  id="Icons-Communication"
                  transform="translate(-40.000000, -4.000000)"
                >
                  <G id="call-end" transform="translate(40.000000, 4.500000)">
                    <Path
                      d="M12,2 C10.4,2 8.9,2.3 7.4,2.7 L7.4,5.8 C7.4,6.2 7.2,6.5 6.8,6.7 C5.8,7.2 4.9,7.8 4.1,8.6 C3.9,8.8 3.7,8.9 3.4,8.9 C3.1,8.9 2.9,8.8 2.7,8.6 L0.2,6.1 C0.1,5.9 0,5.7 0,5.4 C0,5.1 0.1,4.9 0.3,4.7 C3.3,1.8 7.5,-8.8817842e-16 12,-8.8817842e-16 C16.5,-8.8817842e-16 20.7,1.8 23.7,4.7 C23.9,4.9 24,5.1 24,5.4 C24,5.7 23.9,5.9 23.7,6.1 L21.2,8.6 C21,8.8 20.8,8.9 20.5,8.9 C20.2,8.9 20,8.8 19.8,8.6 C19,7.9 18.1,7.2 17.1,6.7 C16.8,6.5 16.5,6.2 16.5,5.8 L16.5,2.7 C15.1,2.3 13.6,2 12,2 L12,2 Z"
                      id="Shape"
                    />
                  </G>
                </G>
              </G>
            </Svg>
          </SView>
        );
    }
  };

  const getButtonIcon = () => {
    if (isScreenShareButton) {
      return (
        <MaterialIcons name="mobile-screen-share" size={35} color="white" />
      );
    }
    return getSource();
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      disabled={disabled}
      {...robotID(robotId)}
    >
      <View style={styles.controlContainer}>{getButtonIcon()}</View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  iconBase: {
    // height: 32,
    // width: 32,
  },
  iconPortrait: {
    // marginHorizontal: 16,
  },
  iconLandscape: {
    marginTop: 16,
  },
  iconLeave: {
    height: 28,
    width: 36,
  },
  disabled: {
    opacity: 0.6,
  },
  controlContainer: {
    alignItems: 'center',
  },
  controlText: {
    fontWeight: '500',
    paddingTop: 4,
    color: theme.colors.blueDark,
  },
  offText: {
    color: theme.colors.red,
  },
});
