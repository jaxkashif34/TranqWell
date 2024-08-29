import React from 'react';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import { savedImages } from '~assets';
import { fontNames } from '~helpers';
import { SText, SView } from '~base';
import { Octicons } from '@expo/vector-icons';

export const SplashScreen = () => {
  return (
    <ImageBackground
      source={savedImages.splashBG}
      style={styles.backgroundImage}
    >
      <SView style={styles.logoContainer}>
        <Image source={savedImages.brandLogo} style={styles.logo} />
        <SText style={styles.text}>
          Expert home care services. On-demand virtual platform. Compassionate
          support.
        </SText>
      </SView>

      <SView className="flex-1 justify-end pb-20">
        <SView className="flex flex-row items-center space-x-4 mx-auto px-16">
          <Octicons name="verified" size={30} color="white" />
          <SText className="text-white text-lg tracking-wide">
            America’s most secure application for medical data
          </SText>
        </SView>
      </SView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: '35%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logo: {
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: fontNames.osRegular ?? 'System',
    textAlign: 'center',
  },
});
