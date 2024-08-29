import ToastComponent from 'react-native-toast-message';

type ToastTypes = {
  type: 'success' | 'error' | 'info';
  heading: string;
  subHeading: string;
  color?: string;
};
export const showToast = ({ color, type, heading, subHeading }: ToastTypes) => {
  return ToastComponent.show({
    type,
    text1: heading,
    text2: subHeading,
    swipeable: true,
    text1Style: { color },
    text2Style: { color },
  });
};
