import React, { useEffect, useState, type FC } from 'react';
import type {
  FieldsForForm,
  MAuthScreenProps,
  MMeetingNavigatorParamsList,
  MReminderNavigatorParamsList,
} from '~types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SButton, SText, SView } from '~base';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '~hooks';
import { getCustomers, toggleTabBar } from '~redux';
import { FormikHelpers, useFormik } from 'formik';
import { createMeetingValidation, initialValues } from '~helpers';
import { InputField } from '~components';
import { theme } from '~assets';

export const MSetReminderData: FC<
  MAuthScreenProps<MReminderNavigatorParamsList, 'MSetReminderData'>
> = ({ navigation }) => {
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: initialValues('REMINDER_FIELDS'),
    validationSchema: createMeetingValidation,
    onSubmit,
  });

  async function onSubmit(
    values: FieldsForForm<'REMINDER_FIELDS'>,
    action: FormikHelpers<FieldsForForm<'REMINDER_FIELDS'>>
  ) {
    setFormSubmitting(true);

    navigation.navigate('MSetReminderUsers', { data: values });

    setFormSubmitting(false);
  }
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(toggleTabBar(false));

    dispatch(getCustomers());

    return () => {
      dispatch(toggleTabBar(true));
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SView className="flex flex-row items-center mt-2 space-x-3 px-4">
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
        <SText className="font-osBold text-lg">Go Back</SText>
      </SView>

      <SView className="flex-1">
        <SView className="pb-3 space-y-6 px-4">
          <InputField
            error={formik.errors.title}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            isTouched={formik.touched.title}
            value={formik.values.title}
            isSubmitting={isFormSubmitting}
            field="title"
            title="Title"
            placeHolder="Enter title..."
            variant="manager"
            multiline={true}
            numberOfLines={1}
            style={{
              height: 'auto',
              textAlignVertical: 'top',
              padding: 10,
              borderColor: theme.colors.manager,
            }}
          />
          <InputField
            error={formik.errors.description}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            isTouched={formik.touched.description}
            value={formik.values.description}
            isSubmitting={isFormSubmitting}
            field="description"
            title="Description"
            placeHolder="Explore thoughts, feelings, and behaviors to improve well-being..."
            variant="manager"
            multiline={true}
            numberOfLines={10}
            style={{
              height: 'auto',
              textAlignVertical: 'top',
              padding: 10,
              borderColor: theme.colors.manager,
            }}
          />
        </SView>

        <SView className="px-4 flex-1 justify-end py-2">
          <SButton variant="manager" onPress={() => formik.handleSubmit()}>
            <SText className="text-white font-osSemibold text-lg tracking-wider">
              Invite
            </SText>
          </SButton>
        </SView>
      </SView>
    </SafeAreaView>
  );
};
