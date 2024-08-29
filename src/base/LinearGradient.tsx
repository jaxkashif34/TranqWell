import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import type { StyledProps } from 'nativewind';
import { styled } from 'nativewind';

const StyledLinearGradient = styled(LinearGradient);

export const SLinearGradient = ({
  className,
  ...props
}: StyledProps<LinearGradientProps>) => {
  return <StyledLinearGradient className={`${className}`} {...props} />;
};