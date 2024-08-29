import type {
  FieldsForForm,
  MAuthScreenProps,
  UnAuthManagerParamsList,
} from '~types';
import React, { useState, type FC } from 'react';
import {
  GradientLayout,
  Password,
  AuthHeader,
  FormButton,
  InputField,
} from '~components';
import { SText, SView, SButton } from '~base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { initialValues, validationSchema } from '~helpers';
import { FormikHelpers, useFormik } from 'formik';
import { Toast } from '~utils';
import { useAppDispatch } from '~hooks';
import { fields } from '~constants';
import { loginManager } from '~redux';

export const MSignIn: FC<
  MAuthScreenProps<UnAuthManagerParamsList, 'MSignIn'>
> = ({ navigation }) => {
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      ...initialValues('SIGN_IN'),
      email: 'alishaalba@gmail.com',
    },
    validationSchema: validationSchema('SIGN_IN'),
    onSubmit,
  });

  const dispatch = useAppDispatch();

  async function onSubmit(
    values: FieldsForForm<'SIGN_IN'>,
    action: FormikHelpers<FieldsForForm<'SIGN_UP'>>
  ) {
    setFormSubmitting(true);
    const response = await dispatch(loginManager(values));

    if (response.meta.requestStatus === 'fulfilled') {
      action.resetForm();
    }
    setFormSubmitting(false);
  }

  return (
    <GradientLayout variant="manager">
      <SView className="px-4 py-4">
        <AuthHeader goBack={navigation.goBack} />

        <Toast />
        <KeyboardAwareScrollView style={{ marginBottom: 130 }}>
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
                variant="manager"
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
                variant="manager"
              />

              <SButton
                onPress={() => navigation.navigate('MForgotPassword')}
                className="justify-end mb-2"
                variant="text"
              >
                <SText className="font-osBold">Forgot Password?</SText>
              </SButton>

              <FormButton
                isSubmitting={isFormSubmitting}
                handleSubmit={() => formik.handleSubmit()}
                title="SIGN IN"
                variant="manager"
              />
            </SView>
          </SView>
        </KeyboardAwareScrollView>
      </SView>
    </GradientLayout>
  );
};
