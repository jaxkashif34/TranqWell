import { type StyledProps, styled } from 'nativewind';
import { ScrollView, type ScrollViewProps } from 'react-native';
const StyledScrollView = styled(ScrollView);

export const SScrollView = ({
  children,
  ...props
}: StyledProps<ScrollViewProps>) => {
  return <StyledScrollView {...props}>{children}</StyledScrollView>;
};