import { type StyledProps, styled } from 'nativewind';
import { TextInput, type TextInputProps } from 'react-native';

const StyledTextInput = styled(TextInput);
export const STextInput = ({ ...props }: StyledProps<TextInputProps>) => {
  return <StyledTextInput {...props} />;
};