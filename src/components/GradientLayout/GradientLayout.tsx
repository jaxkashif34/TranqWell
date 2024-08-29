import React from 'react';
import { FC } from 'react';
import { SView } from '~base';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';
import { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '~assets';

type SelectScreenProps = {
  isSelectUserScreen: boolean;
  variant?: never;
};

type OtherScreenProps = {
  isSelectUserScreen?: never;
  variant: 'customer' | 'manager';
};

type Props = (SelectScreenProps | OtherScreenProps) & {
  children: React.ReactNode;
  hideBottomCircle?: boolean;
  containerStyle?: ViewStyle;
};

export const GradientLayout: FC<Props> = ({
  children,
  isSelectUserScreen = false,
  hideBottomCircle = false,
  variant,
  containerStyle,
}) => {
  const circleColor =
    variant === 'customer' ? theme.colors.customer : theme.colors.manager;
  return (
    // top circle
    <SView
      className="relative h-screen flex-1"
      style={{ ...containerStyle, padding: 2 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Svg
          height="40%"
          width="100%"
          viewBox="-50 50 100 100"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: -100,
          }}
        >
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              rx="50%"
              ry="50%"
              fx="50%"
              fy="50%"
              gradientUnits="objectBoundingBox"
            >
              <Stop
                offset="0%"
                stopColor={isSelectUserScreen ? '#29CCAD' : circleColor}
                stopOpacity="0.25"
              />
              <Stop
                offset="100%"
                stopColor={isSelectUserScreen ? '#29CCAD' : circleColor}
                stopOpacity="0"
              />
            </RadialGradient>
          </Defs>
          <Circle cx="50" cy="50" r="120" fill="url(#grad)" />
        </Svg>
        {children}
        {/* bottom circle */}
        {!hideBottomCircle && (
          <Svg
            height="30%"
            width="100%"
            viewBox="50 -50 100 100"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              zIndex: -100,
              pointerEvents: 'none',
            }}
          >
            <Defs>
              <RadialGradient
                id="grad"
                cx="50%"
                cy="50%"
                rx="50%"
                ry="50%"
                fx="50%"
                fy="50%"
                gradientUnits="objectBoundingBox"
              >
                <Stop
                  offset="0%"
                  stopColor={
                    isSelectUserScreen ? theme.colors.manager : circleColor
                  }
                  stopOpacity="0.25"
                />
                <Stop
                  offset="100%"
                  stopColor={
                    isSelectUserScreen ? theme.colors.manager : circleColor
                  }
                  stopOpacity="0"
                />
              </RadialGradient>
            </Defs>
            <Circle cx="50" cy="50" r="120" fill="url(#grad)" />
          </Svg>
        )}
      </SafeAreaView>
    </SView>
  );
};
