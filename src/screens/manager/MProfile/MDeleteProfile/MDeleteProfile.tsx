import React, { FC } from 'react';
import {
  FieldsForForm,
  MAuthScreenProps,
  MProfileNavigatorParamsList,
} from '~types';
import { Password } from '~components';
import { SText, SView, SButton } from '~base';
import { useFormik } from 'formik';
import { deleteProfileValidation, initialValues } from '~helpers';
import { fields } from '~constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export const MDeleteProfile: FC<
  MAuthScreenProps<MProfileNavigatorParamsList, 'MDeleteProfile'>
> = ({ navigation }) => {
  const [isFormSubmitting, setFormSubmitting] = React.useState(false);
  const formik = useFormik({
    initialValues: initialValues('DELETE_PROFILE'),
    validationSchema: deleteProfileValidation,
    onSubmit,
  });

  async function onSubmit(values: FieldsForForm<'DELETE_PROFILE'>) {
    setFormSubmitting(true);
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
        <SText className="font-osBold text-lg">Delete Profile</SText>
      </SView>
      <SView className="flex justify-center items-stretch px-4 py-8 mt-12">
        <SText className="text-center font-osExtraBold tracking-wider">
          This Action is Undoable!
        </SText>
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
          className={`mt-10  ${isFormSubmitting && 'bg-gray-300'}`}
          disabled={isFormSubmitting}
          onPress={() => formik.handleSubmit()}
          variant="attention"
          enableLoading={isFormSubmitting}
        >
          <SText
            className={`font-osBold uppercase ${
              isFormSubmitting ? 'text-gray-200' : 'text-black'
            } text-center text-lg`}
          >
            Confirm Deletion
          </SText>
        </SButton>
      </SView>
    </SafeAreaView>
  );
};
