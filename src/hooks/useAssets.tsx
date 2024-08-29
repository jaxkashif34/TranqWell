import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { savedFonts } from '~assets';

export function useAssetsHook() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadAssetsAsync() {
      // const imageAssets = images.map((image) => {
      //   return Asset.fromModule(require(`./assets/${image}`)).downloadAsync();
      // });

      await Font.loadAsync(savedFonts).catch((error) => console.warn(error));

      setIsReady(true);
    }

    loadAssetsAsync();

    return () => {
      // cleanup
    };
  }, []);

  return isReady;
}
