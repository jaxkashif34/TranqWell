import React, { useState, type FC } from 'react';
import type {
  FieldsForForm,
  MAuthScreenProps,
  MProfileNavigatorParamsList,
} from '~types';
import { Password } from '~components';
import { SText, SView, SButton } from '~base';
import { useFormik } from 'formik';
import { changePasswordValidation, initialValues, timeout } from '~helpers';
import { fields } from '~constants';
import { useAppDispatch } from '~hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export const MChangePassword: FC<
  MAuthScreenProps<MProfileNavigatorParamsList, 'MChangePassword'>
> = ({ navigation, route }) => {
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: initialValues('CHANGE_PASSWORD'),
    validationSchema: changePasswordValidation,
    onSubmit,
  });

  const dispatch = useAppDispatch();

  async function onSubmit(values: FieldsForForm<'CHANGE_PASSWORD'>) {
    setFormSubmitting(true);
    // const response = await dispatch(customerForGetPassword(values));

    // if (response.meta.requestStatus === 'fulfilled') {
    //   timeout(() => navigation.navigate(Screens.CSignIn));
    // }
    setFormSubmitting(false);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SView className="flex flex-row items-center space-x-3 px-3 mt-3">
        <Ionicons
          name="arrow-back"
          size={26}
          color="black"
          style={{
            padding: 3,
            borderRadius: 5,
          }}
          onPress={navigation.goBack}
        />
        <SText className="font-osBold text-lg">Change Password</SText>
      </SView>
      <SView className="mt-4 p-4 flex-1">
        <Password
          error={formik.errors.current_password}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          isTouched={formik.touched.current_password}
          value={formik.values.current_password}
          field={fields.current_password}
          title="Current Password"
          isSubmitting={isFormSubmitting}
          variant="manager"
        />
        <Password
          error={formik.errors.new_password}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          isTouched={formik.touched.new_password}
          value={formik.values.new_password}
          field={fields.new_password}
          title="New Password"
          isSubmitting={isFormSubmitting}
          variant="manager"
        />
        <Password
          error={formik.errors.confirm_new_password}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          isTouched={formik.touched.confirm_new_password}
          value={formik.values.confirm_new_password}
          field={fields.confirm_new_password}
          title="Confirm Password"
          isSubmitting={isFormSubmitting}
          variant="manager"
        />

        <SView className="flex-1 justify-end">
          <SButton
            className={`mt-6 ${isFormSubmitting && 'bg-gray-300'}`}
            disabled={isFormSubmitting}
            onPress={() => formik.handleSubmit()}
            variant="manager"
            enableLoading={isFormSubmitting}
          >
            <SText
              className={`font-osBold mr-4 ${
                isFormSubmitting ? 'text-gray-200' : 'text-white'
              } text-center text-lg`}
            >
              SAVE CHANGES
            </SText>
          </SButton>
        </SView>
      </SView>
    </SafeAreaView>
  );
};
