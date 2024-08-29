import { type StyledProps, styled } from 'nativewind';
import { View, type ViewProps } from 'react-native';

const StyledView = styled(View);
export const SView = ({ ...props }: StyledProps<ViewProps>) => {
  return <StyledView {...props} />;
};