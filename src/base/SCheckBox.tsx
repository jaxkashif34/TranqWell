import CheckBox, { type CheckboxProps } from 'expo-checkbox';
import type { StyledProps } from 'nativewind';
import { styled } from 'nativewind';

const StyledCheckBox = styled(CheckBox);

export const SCheckBox = ({ className, ...props }: StyledProps<CheckboxProps>) => {
  return <StyledCheckBox className={`${className}`} {...props} />;
};
