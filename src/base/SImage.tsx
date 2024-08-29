import { type StyledProps, styled } from 'nativewind';
import { Image, type ImageProps } from 'react-native';
const StyledImage = styled(Image);
// theme config
export const SImage = ({ source, ...props }: StyledProps<ImageProps>) => {
  return <StyledImage {...props} source={source} />;
};
