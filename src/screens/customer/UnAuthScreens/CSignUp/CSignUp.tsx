import type { FieldsForForm, UnAuthCustomerScreenProps } from '~types';
import React, { useEffect, useState, type FC } from 'react';
import {
  GradientLayout,
  Password,
  AuthHeader,
  FormButton,
  InputField,
} from '~components';
import { SButton, SCheckBox, SText, SView } from '~base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FormikHelpers, useFormik } from 'formik';
import { createCustomer } from '~redux';
import {
  timeout,
  initialValues,
  validationSchema,
  UnAuthCScreens,
  showToast,
} from '~helpers';
import { Toast } from '~utils';
import { useAppDispatch, useKeyboardStatus } from '~hooks';
import { fields } from '~constants';
import { theme } from '~assets';

export const CSignUp: FC<UnAuthCustomerScreenProps<'CSignUp'>> = ({
  navigation,
}) => {
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const [termsConditions, setTermsConditions] = useState(false);
  const formik = useFormik({
    initialValues: initialValues('SIGN_UP'),
    validationSchema: validationSchema('SIGN_UP'),
    onSubmit,
  });
  const { isKeyboardVisible } = useKeyboardStatus();
  const dispatch = useAppDispatch();

  async function onSubmit(
    values: FieldsForForm<'SIGN_UP'>,
    action: FormikHelpers<FieldsForForm<'SIGN_UP'>>
  ) {
    if (!termsConditions) {
      return showToast({
        type: 'error',
        heading: 'Error',
        subHeading: 'Please accept terms and conditions',
      });
    }
    setFormSubmitting(true);
    const response = await dispatch(createCustomer(values));

    if (response.meta.requestStatus === 'fulfilled') {
      timeout(() => navigation.navigate(UnAuthCScreens.CSignIn));
      action.resetForm();
    }
    setFormSubmitting(false);
  }
  return (
    <GradientLayout variant="customer" hideBottomCircle={isKeyboardVisible}>
      <SView className="px-2 py-4">
        <AuthHeader goBack={navigation.goBack} />
        <Toast />
        <KeyboardAwareScrollView style={{ marginBottom: 80 }}>
          <SView>
            <SView className="flex gap-y-4 mb-2 mt-14">
              <SText className="font-osBold text-2xl">
                Create your Account
              </SText>
            </SView>

            <SView className="mt-4">
              <InputField
                error={formik.errors.name}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                isTouched={formik.touched.name}
                value={formik.values.name}
                isSubmitting={isFormSubmitting}
                field={fields.name}
                title="Name"
                placeHolder="John Doe"
                variant="customer"
              />

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
                variant="customer"
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

              <Password
                error={formik.errors.confirm_password}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                isTouched={formik.touched.confirm_password}
                value={formik.values.confirm_password}
                field={fields.confirm_password}
                title="Confirm Password"
                isSubmitting={isFormSubmitting}
                variant="customer"
              />
              <SButton
                className="p-0 my-4 flex flex-row space-x-2 justify-start items-center"
                variant="text"
                onPress={() => setTermsConditions((p) => !p)}
              >
                <SCheckBox
                  className="rounded-lg w-7 h-7"
                  value={termsConditions}
                  color={theme.colors.customer}
                />
                <SText>Accept terms and Conditions</SText>
              </SButton>
              <FormButton
                isSubmitting={isFormSubmitting}
                handleSubmit={() => formik.handleSubmit()}
                title="SIGN UP"
                variant="customer"
              />
            </SView>
          </SView>
        </KeyboardAwareScrollView>
      </SView>
    </GradientLayout>
  );
};
