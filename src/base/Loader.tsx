import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { theme } from '~assets';

type Props = {
  width: number;
  height: number;
  borderWidth?: number;
  rightLeftColor?: string;
  topBottomColor?: string;
};

export const Loader: FC<Props> = (props) => {
  const {
    width,
    height,
    borderWidth = 10,
    rightLeftColor = '#fff',
    topBottomColor = theme.colors.customer,
  } = props;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        ...styles.loader,
        transform: [{ rotate: rotateInterpolation }],
        width,
        height,
        borderWidth,
        borderLeftColor: rightLeftColor,
        borderRightColor: rightLeftColor,
        borderTopColor: topBottomColor,
        borderBottomColor: topBottomColor,
      }}
    />
  );
};

const styles = StyleSheet.create({ loader: { borderRadius: 100 } });
