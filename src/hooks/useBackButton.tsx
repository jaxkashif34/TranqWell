import { BackHandler } from 'react-native';
import { useEffect } from 'react';

type Props = {
  navigation: any;
  screen: any;
};

export const useBackButton = ({ navigation, screen }: Props) => {
  return useEffect(() => {
    const backAction = () => {
      // Here you can write your own logic to handle back button press
      // For example, you can navigate to a different screen
      navigation.navigate(screen);

      // Returning true will prevent the default behavior of the back button
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // Don't forget to remove the event listener when the component is unmounted
    return () => backHandler.remove();
  }, [screen]);
};
