import ToastComponent, {
  type BaseToastProps,
  ToastConfig,
} from 'react-native-toast-message';
import type { ToastProps } from 'react-native-toast-message';
import { SText, SView } from '~base';

type ToastBaseProps = BaseToastProps & {
  heading: string;
  text: string;
  containerStyle: string;
  textStyle: string;
};

const ToastBaseComponent = ({
  textStyle,
  containerStyle,
  heading,
  text,
}: ToastBaseProps) => {
  return (
    <SView
      className={`bg-white px-4 py-2 rounded-xl w-2/3 border-l-4 ${containerStyle}`}
      style={{ elevation: 1, zIndex:10000 }}
    >
      <SText className={`font-osBold text-sm ${textStyle} tracking-wide`}>
        {heading}
      </SText>
      <SText className={`font-osLight text-xs ${textStyle} tracking-wide`}>
        {text}
      </SText>
    </SView>
  );
};

const toastConfig: ToastConfig = {
  success: (props) => (
    <ToastBaseComponent
      heading={props.text1}
      text={props.text2}
      containerStyle="border-l-customer"
      textStyle="text-customer"
      {...props}
    />
  ),

  error: (props) => (
    <ToastBaseComponent
      heading={props.text1}
      text={props.text2}
      containerStyle="border-l-attention"
      textStyle="text-attention"
      {...props}
    />
  ),
  info: (props) => (
    <ToastBaseComponent
      heading={props.text1}
      text={props.text2}
      containerStyle="border-l-alert"
      textStyle="text-alert"
      {...props}
    />
  ),
};

export const Toast = ({ ...props }: ToastProps) => {
  return (
    <ToastComponent visibilityTime={4000} {...props} config={toastConfig} />
  );
};
