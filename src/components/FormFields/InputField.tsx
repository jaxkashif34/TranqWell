import React from 'react';
import { SView, SText, STextInput } from '~base';
import { ErrorMessage } from './ErrorMessage';
import { type TextInputProps } from 'react-native';
import { fields } from '~constants';
import { theme } from '~assets';

type Props = {
  isTouched: boolean;
  error: string | undefined;
  value: string;
  handleChange: any;
  handleBlur: any;
  isSubmitting: boolean;
  title: string;
  field: keyof typeof fields;
  placeHolder: string;
  classes?: string;
  variant: 'customer' | 'manager';
  additionalTitleInfo?: string;
} & TextInputProps;

export const InputField: React.FC<Props> = ({
  isTouched,
  error,
  value,
  handleBlur,
  handleChange,
  isSubmitting,
  title,
  field,
  placeHolder,
  classes,
  variant,
  additionalTitleInfo,
  ...props
}: Props) => {
  return (
    <SView className={`flex gap-y-2 mt-1 ${classes}`}>
      <SText className="font-osBold">{title}</SText>
      <STextInput
        className={`h-12 border-2 rounded-lg placeholder:pl-4 placeholder:font-osLight font-osRegular`}
        placeholder={placeHolder}
        value={value}
        onChangeText={handleChange(field)}
        onBlur={handleBlur(field)}
        editable={!isSubmitting}
        style={{
          borderColor:
            isTouched && error
              ? theme.colors.attention
              : variant === 'customer'
              ? theme.colors.customer
              : theme.colors.manager,
        }}
        {...props}
      />
      <ErrorMessage isTouched={isTouched} error={error} />
    </SView>
  );
};
