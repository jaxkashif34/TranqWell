import type { FieldsForForm, UnAuthCustomerScreenProps } from '~types';
import React, { useState, type FC } from 'react';
import {
  GradientLayout,
  InputField,
  Password,
  AuthHeader,
  FormButton,
} from '~components';
import { SText, SView, SButton } from '~base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UnAuthCScreens, initialValues, validationSchema } from '~helpers';
import { FormikHelpers, useFormik } from 'formik';
import { loginCustomer } from '~redux';
import { Toast } from '~utils';
import { useAppDispatch } from '~hooks';
import { fields } from '~constants';

export const CSignIn: FC<UnAuthCustomerScreenProps<'CSignIn'>> = ({
  navigation,
}) => {
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: initialValues('SIGN_IN'),
    validationSchema: validationSchema('SIGN_IN'),
    onSubmit,
  });

  const dispatch = useAppDispatch();

  async function onSubmit(
    values: FieldsForForm<'SIGN_IN'>,
    action: FormikHelpers<FieldsForForm<'SIGN_UP'>>
  ) {
    setFormSubmitting(true);

    const response = (await dispatch(loginCustomer(values)))

    if (response.meta.requestStatus === 'fulfilled') {
      action.resetForm();
    }
    setFormSubmitting(false);
  }

  return (
    <GradientLayout variant="customer">
      <SView className="px-4 py-4">
        <AuthHeader goBack={navigation.goBack} />

        <Toast />
        <KeyboardAwareScrollView style={{ marginBottom: 80 }}>
          <SView>
            <SView className="flex gap-y-4 mb-2 pt-28">
              <SText className="font-osBold text-2xl">Welcome Back!</SText>
            </SView>

            <SView className="mt-8">
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

              <Password
                error={formik.errors.password}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                isTouched={formik.touched.password}
                value={formik.values.password}
                field={fields.password}
                title="Password"
                isSubmitting={isFormSubmitting}
                variant="customer"
              />

              <SButton
                onPress={() =>
                  navigation.navigate(UnAuthCScreens.CForgotPassword)
                }
                className="justify-end mb-2"
                variant="text"
              >
                <SText className="font-osBold">Forgot Password?</SText>
              </SButton>

              <FormButton
                isSubmitting={isFormSubmitting}
                handleSubmit={() => formik.handleSubmit()}
                title="SIGN IN"
                variant="customer"
              />
            </SView>
          </SView>
        </KeyboardAwareScrollView>
      </SView>
    </GradientLayout>
  );
};
