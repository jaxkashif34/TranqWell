import type { FieldsForForm, UnAuthCustomerScreenProps } from '~types';
import React, { useState, type FC } from 'react';
import {
  AuthHeader,
  FormButton,
  GradientLayout,
  InputField,
} from '~components';
import { SText, SView } from '~base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik, type FormikHelpers } from 'formik';
import { initialValues, validationSchema } from '~helpers';
import { useAppDispatch } from '~hooks';
import { fields } from '~constants';

export const CForgotPassword: FC<
  UnAuthCustomerScreenProps<'CForgotPassword'>
> = ({ navigation, route }) => {
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: initialValues('FORGOT_PASSWORD'),
    validationSchema: validationSchema('FORGOT_PASSWORD'),
    onSubmit,
  });

  const dispatch = useAppDispatch();

  function onSubmit(
    values: FieldsForForm<'FORGOT_PASSWORD'>,
    actions: FormikHelpers<FieldsForForm<'SIGN_IN'>>
  ) {
    setFormSubmitting(true);

    setTimeout(async () => {
      // const response = await dispatch(customerForGetPassword(values));

      setFormSubmitting(false);
    }, 2000);
  }
  return (
    <GradientLayout variant="customer">
      <SView className="px-4 py-4">
        <AuthHeader goBack={navigation.goBack} />
        <KeyboardAwareScrollView style={{ marginBottom: 80 }}>
          <SView>
            <SView className="flex gap-y-4 mb-2 pt-28">
              <SText className="font-osBold text-2xl">
                Forgot your Password?
              </SText>
              <SText className="text-lg font-osLight tracking-wide">
                No problem. Please enter your email address below, and we'll
                send you a link to create a new password. Let's get you back
                into your account!
              </SText>
            </SView>

            <SView>
              <InputField
                error={formik.errors.email}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                isTouched={formik.touched.email}
                value={formik.values.email}
                isSubmitting={isFormSubmitting}
                field={fields.email}
                title="Email"
                placeHolder="johndoe123@gmail.com"
                keyboardType="email-address"
                variant='customer'
              />

              <FormButton
                isSubmitting={isFormSubmitting}
                handleSubmit={() => formik.handleSubmit()}
                title="SUBMIT"
                variant="customer"
              />
            </SView>
          </SView>
        </KeyboardAwareScrollView>
      </SView>
    </GradientLayout>
  );
};
