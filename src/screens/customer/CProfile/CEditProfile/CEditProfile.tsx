import React, { useEffect, useState, type FC } from 'react';
import { GradientLayout, InputField, UserImage } from '~components';
import { SText, SView, SButton, SImage } from '~base';
import { AuthCustomerScreenProps, FieldsForForm } from '~types';
import { savedImages } from '~assets';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import {
  profileValidation,
  initialValues,
  pickImage,
  selectCustomerState,
  makeImageName,
  getImageExtension,
} from '~helpers';
import { useFormik } from 'formik';
import { fields } from '~constants';
import { useAppDispatch, useAppSelector } from '~hooks';
import { ImagePickerAsset } from 'expo-image-picker';
import { addCBio, addCCountry, addCCity, uploadCImage } from '~redux';
import { theme } from '~assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const CEditProfile: FC<AuthCustomerScreenProps<'CEditProfile'>> = ({
  navigation,
}) => {
  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const { customer } = useAppSelector(selectCustomerState);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: initialValues('EDIT_PROFILE'),
    validationSchema: profileValidation,
    onSubmit,
  });

  async function onSubmit(values: FieldsForForm<'EDIT_PROFILE'>) {
    setFormSubmitting(true);
    if (image !== null) {
      const formData = new FormData();
      // @ts-ignore
      formData.append('image', {
        uri: image.uri,
        name: makeImageName(customer.user_id, getImageExtension(image.uri)),
        type: `image/${getImageExtension(image.uri)}`,
      });
      await dispatch(uploadCImage({ formData, user_id: customer.user_id }));
    }
    if (values.bio !== '' && values.bio !== customer.bio) {
      await dispatch(addCBio({ bio: values.bio, user_id: customer.user_id }));
    }
    if (values.country !== '' && values.country !== customer.country) {
      await dispatch(
        addCCountry({
          country: values.country,
          user_id: customer.user_id,
        })
      );
    }
    if (values.city !== '' && values.city !== customer.city) {
      await dispatch(
        addCCity({
          city: values.city,
          user_id: customer.user_id,
        })
      );
    }

    setFormSubmitting(false);
  }

  const handleImage = async () => {
    await pickImage(setImage);
  };

  useEffect(() => {
    formik.setFormikState((state) => ({
      ...state,
      values: {
        ...state.values,
        ...customer,
      },
    }));
  }, [customer.user_id]);

  return (
    <GradientLayout hideBottomCircle variant="customer">
      <SView className="flex flex-row items-center space-x-3 px-4 mt-2">
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
        <SText className="font-osBold text-lg">Profile</SText>
      </SView>
      <SView className="flex-1 px-4">
        <SView className="p-3 flex items-center">
          <SView className="w-24 h-24 mt-4">
            {image !== null ? (
              <SImage
                source={{ uri: image.uri }}
                className="w-full h-full rounded-2xl"
              />
            ) : (
              <UserImage data={customer} size={'100%'} borderRadius={5} />
            )}
          </SView>
          <SView className="flex items-center">
            <SButton
              className="space-x-2"
              onPress={() => handleImage()}
              variant="text"
            >
              <SimpleLineIcons name="camera" size={24} color="black" />
              <SText className="underline">Upload Image</SText>
            </SButton>
          </SView>
        </SView>
        <KeyboardAwareScrollView>
          <InputField
            error={formik.errors.name}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            isTouched={formik.touched.name}
            value={formik.values.name}
            isSubmitting={isFormSubmitting}
            field={fields.name}
            title="Name"
            readOnly
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
            readOnly
            placeHolder="johndoe123@gmail.com"
            keyboardType="email-address"
            variant="customer"
          />

          <InputField
            error={formik.errors.bio}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            isTouched={formik.touched.bio}
            value={formik.values.bio}
            isSubmitting={isFormSubmitting}
            field="bio"
            title="Bio"
            placeHolder="Share your passions. Enter your bio here."
            variant="manager"
            multiline
            numberOfLines={4}
            style={{
              height: 'auto',
              textAlignVertical: 'top',
              borderColor: theme.colors.customer,
              padding: 5,
            }}
          />

          <SView className="flex flex-row justify-between">
            <InputField
              error={formik.errors.country}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              isTouched={formik.touched.country}
              value={formik.values.country}
              isSubmitting={isFormSubmitting}
              field={fields.country}
              title="Country"
              placeHolder="United States"
              classes="flex-1 mr-2"
              variant="customer"
            />

            <InputField
              error={formik.errors.city}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              isTouched={formik.touched.city}
              value={formik.values.city}
              isSubmitting={isFormSubmitting}
              field={fields.city}
              title="City"
              placeHolder="New York"
              classes="flex-1"
              variant="customer"
            />
          </SView>
          <SView className="justify-end flex-1 mb-4">
            <SButton
              className={`mt-5 ${isFormSubmitting && 'bg-gray-300'}`}
              disabled={isFormSubmitting}
              onPress={() => formik.handleSubmit()}
              variant="customer"
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
        </KeyboardAwareScrollView>
      </SView>
    </GradientLayout>
  );
};
