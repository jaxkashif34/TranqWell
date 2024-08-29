import { styled, type StyledProps } from 'nativewind';
import ToggleSwitch, {
  type ToggleSwitchProps,
} from 'toggle-switch-react-native';

const StyledSwitch = styled(ToggleSwitch);

export const SwitchBtn = ({
  className,
  ...props
}: StyledProps<ToggleSwitchProps>) => {
  return <StyledSwitch className={`${className}`} {...props} size='medium' />;
};