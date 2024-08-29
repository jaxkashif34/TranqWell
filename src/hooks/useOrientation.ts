import { ScaledSize, useWindowDimensions } from 'react-native';
import { Orientation } from '~utils';
const computeOrientation = (windowDimensions: ScaledSize): Orientation => {
  return windowDimensions.height >= windowDimensions.width
    ? Orientation.Portrait
    : Orientation.Landscape;
};

export const useOrientation = (): Orientation => {
  const windowDimensions = useWindowDimensions();
  return computeOrientation(windowDimensions);
};
