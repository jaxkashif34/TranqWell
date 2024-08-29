import React from 'react';
import { SText, SButton } from '~base';

type Props = {
  isSubmitting?: boolean;
  handleSubmit: () => void;
  title: string;
  // rest of the props
  [x: string]: any;
};

export const FormButton = (props: Props) => {
  const { isSubmitting = false, handleSubmit, title } = props;
  return (
    <SButton
      className={`mt-6 ${isSubmitting && 'bg-gray-300'}`}
      disabled={isSubmitting}
      onPress={() => handleSubmit()}
      enableLoading={isSubmitting}
      {...props}
    >
      <SText
        className={`font-osBold mr-4 ${
          isSubmitting ? 'text-gray-200' : 'text-white'
        } text-center text-lg`}
      >
        {title}
      </SText>
    </SButton>
  );
};
