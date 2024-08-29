import type {
  FieldsForForm,
  MAuthScreenProps,
  UnAuthManagerParamsList,
} from '~types';
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

export const MForgotPassword: FC<
  MAuthScreenProps<UnAuthManagerParamsList, 'MForgotPassword'>
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
      setFormSubmitting(false);
    }, 2000);
  }
  return (
    <GradientLayout variant="manager">
      <SView className="px-4 py-4">
        <AuthHeader goBack={navigation.goBack} />
        <KeyboardAwareScrollView style={{ marginBottom: 130 }}>
          <SView>
            <SView className="flex gap-y-4 mb-2 pt-28">
              <SText className="font-osBold text-2xl">
                Forgot your Password?
              </SText>
              <SText className="text-lg font-osLight">
                No worries. We're here to assist. Please enter your email
                address below, and we'll send you a link to reset your password.
                Let's get you back to managing cases swiftly!
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
                variant="manager"
              />

              <FormButton
                isSubmitting={isFormSubmitting}
                handleSubmit={() => formik.handleSubmit()}
                title="SUBMIT"
                variant="manager"
              />
            </SView>
          </SView>
        </KeyboardAwareScrollView>
      </SView>
    </GradientLayout>
  );
};
