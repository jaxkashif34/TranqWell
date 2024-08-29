import * as Linking from 'expo-linking';
import { useCallback } from 'react';
import { showToast } from '~helpers';

export const useOpenURL = () => {
  const handleOpenURL = useCallback(async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (!supported)
      return showToast({
        type: 'error',
        heading: 'Error',
        subHeading: 'This URL is not supported',
      });

    return Linking.openURL(url);
  }, []);

  return { handleOpenURL };
};
