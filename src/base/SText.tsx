import type { TextProps } from 'react-native';
import type { StyledProps } from 'nativewind';
import { styled } from 'nativewind';
import { Text } from 'react-native';

const StyledText = styled(Text);

export const SText = ({ className, ...props }: StyledProps<TextProps>) => {
  return <StyledText className={`font-osRegular text-base ${className}`} {...props} />;
};