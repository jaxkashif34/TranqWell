import { type StyledProps, styled } from 'nativewind';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { Loader } from './Loader';
import { selectUiState } from '~helpers';
import { useAppSelector } from '~hooks';
import { ButtonVariants } from '~types';
import { theme } from '~assets';

const StyledButton = styled(TouchableOpacity);
type ButtonProps = StyledProps<TouchableOpacityProps> & {
  variant?: ButtonVariants;
  enableLoading?: boolean;
};

const styles = {
  customer: 'py-2 px-4 rounded-md bg-customer',
  text: 'py-1',
  outline: 'py-1 border-2 border-black rounded-md',
  attention: 'py-2 px-4 rounded-md bg-attention',
  zoom: 'py-2 px-4 rounded-md bg-[#4A8CFF]',
  manager: 'py-2 px-4 rounded-md bg-manager',
  councilor: `py-2 px-4 rounded-md bg-[${theme.colors.councilor}]`,
  disabled: 'py-2 px-4 rounded-md bg-disabled',
  alert: 'py-2 px-4 rounded-md bg-alert',
  emergency: 'py-2 px-4 rounded-md bg-emergency',
  warning: 'py-2 px-4 rounded-md bg-warning',
};

export const SButton = ({
  children,
  className: classes,
  variant,
  enableLoading = false,
  ...props
}: ButtonProps) => {
  const { userRole } = useAppSelector(selectUiState);
  let style = styles[variant ?? userRole];
  return (
    <StyledButton
      className={`flex flex-row justify-center items-center ${style} ${classes}`}
      {...props}
      disabled={enableLoading}
    >
      {children}
      {enableLoading && (
        <Loader
          height={30}
          width={30}
          borderWidth={5}
          topBottomColor="#e5e7eb"
        />
      )}
    </StyledButton>
  );
};
