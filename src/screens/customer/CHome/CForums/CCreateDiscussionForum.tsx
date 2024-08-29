import { Ionicons } from '@expo/vector-icons';
import React, { FC, useEffect, useState } from 'react';
import { AuthCustomerScreenProps, FieldsForForm } from '~types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SButton, SText, SView } from '~base';
import { InputField } from '~components';
import { FormikHelpers, useFormik } from 'formik';
import { createForumValidation, initialValues } from '~helpers';
import { theme } from '~assets';
import { useAppDispatch } from '~hooks';
import { createCDiscussionForum, toggleTabBar } from '~redux';

export const CCreateDiscussionForum: FC<
  AuthCustomerScreenProps<'CCreateDiscussionForum'>
> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(toggleTabBar(false));

    return () => {
      dispatch(toggleTabBar(true));
    };
  }, []);

  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: initialValues('DISCUSSION_FIELDS'),
    validationSchema: createForumValidation,
    onSubmit,
  });
  async function onSubmit(
    values: FieldsForForm<'DISCUSSION_FIELDS'>,
    action: FormikHelpers<FieldsForForm<'DISCUSSION_FIELDS'>>
  ) {
    setFormSubmitting(true);
    await dispatch(createCDiscussionForum(values));
    navigation.goBack();
    setFormSubmitting(false);
  }
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
        <SText className="font-osBold text-lg">Start Discussion</SText>
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
            placeHolder="Therapy Session 1.0"
            variant="customer"
            multiline={true}
            numberOfLines={1}
            style={{
              height: 'auto',
              textAlignVertical: 'top',
              padding: 10,
              borderColor: theme.colors.customer,
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
            variant="customer"
            multiline={true}
            numberOfLines={10}
            style={{
              height: 'auto',
              textAlignVertical: 'top',
              padding: 10,
              borderColor: theme.colors.customer,
            }}
          />
        </SView>

        <SView className="px-4 flex-1 justify-end py-2">
          <SButton
            variant={isFormSubmitting ? 'disabled' : 'customer'}
            onPress={() => formik.handleSubmit()}
            enableLoading={isFormSubmitting}
            disabled={isFormSubmitting}
          >
            <SText
              className={`text-white font-osSemibold text-lg tracking-wider mr-4`}
            >
              Post discussion
            </SText>
          </SButton>
        </SView>
      </SView>
    </SafeAreaView>
  );
};
