import React, { useState } from 'react';
import { SView, SText, STextInput } from '~base';
import { Feather } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { ErrorMessage } from './ErrorMessage';
import { theme } from '~assets';
const StyledIcon = styled(Feather);

type Props = {
  isTouched: boolean;
  error: string | undefined;
  value: string;
  handleChange: any;
  handleBlur: any;
  title: string;
  field: string;
  isSubmitting: boolean;
  variant: 'customer' | 'manager';
};

export const Password: React.FC<Props> = (props: Props) => {
  const [visible, setVisible] = useState(true);
  const {
    isTouched,
    error,
    value,
    handleBlur,
    handleChange,
    title,
    field,
    isSubmitting,
    variant,
  } = props;
  return (
    <SView className="flex gap-y-2 mt-1">
      <SText className="font-osBold">{title}</SText>
      <SView
        className={`flex flex-row items-center ${
          isTouched && error ? 'border-red-500' : `border-${variant}`
        } border-2 rounded-lg`}
        style={{
          borderColor:
            isTouched && error
              ? theme.colors.attention
              : variant === 'customer'
              ? theme.colors.customer
              : theme.colors.manager,
        }}
      >
        <STextInput
          className="h-12 placeholder:font-osLight font-osRegular flex-1 placeholder:pl-2"
          placeholder="min 6 characters"
          secureTextEntry={visible}
          value={value}
          onChangeText={handleChange(field)}
          onBlur={handleBlur(field)}
          editable={!isSubmitting}
        />
        <StyledIcon
          name={`${visible ? 'eye-off' : 'eye'}`}
          size={24}
          className="text-gray-400 pr-2"
          onPress={() => setVisible(!visible)}
        />
      </SView>
      <ErrorMessage isTouched={isTouched} error={error} />
    </SView>
  );
};
