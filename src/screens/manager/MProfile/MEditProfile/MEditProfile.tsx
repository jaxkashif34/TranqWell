import React, { useEffect, useState, type FC } from 'react';
import { GradientLayout, InputField, UserImage } from '~components';
import { SText, SView, SButton, SImage } from '~base';
import {
  FieldsForForm,
  MAuthScreenProps,
  MProfileNavigatorParamsList,
} from '~types';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import {
  profileValidation,
  initialValues,
  pickImage,
  selectManagerState,
  getImageExtension,
  makeImageName,
} from '~helpers';
import { useFormik } from 'formik';
import { fields } from '~constants';
import { useAppDispatch, useAppSelector } from '~hooks';
import { ImagePickerAsset } from 'expo-image-picker';
import {
  addMBio,
  addMCity,
  addMCountry,
  addMSpecialization,
  uploadMImage,
} from '~redux';
import { theme } from '~assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const MEditProfile: FC<
  MAuthScreenProps<MProfileNavigatorParamsList, 'MEditProfile'>
> = ({ navigation }) => {
  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: { ...initialValues('EDIT_PROFILE'), specialization: '' },
    validationSchema: profileValidation,
    onSubmit,
  });
  const { manager } = useAppSelector(selectManagerState);
  const dispatch = useAppDispatch();

  async function onSubmit(values: FieldsForForm<'EDIT_PROFILE'>) {
    setFormSubmitting(true);
    if (image !== null) {
      const formData = new FormData();
      // @ts-ignore
      formData.append('image', {
        uri: image.uri,
        name: makeImageName(manager.user_id, getImageExtension(image.uri)),
        type: `image/${getImageExtension(image.uri)}`,
      });
      await dispatch(uploadMImage({ formData, user_id: manager.user_id }));
    }
    if (values.bio !== '' && values.bio !== manager.bio) {
      await dispatch(addMBio({ bio: values.bio, user_id: manager.user_id }));
    }
    if (
      values.specialization !== '' &&
      values.specialization !== manager.specialization
    ) {
      await dispatch(
        addMSpecialization({
          specialization: values.specialization,
          user_id: manager.user_id,
        })
      );
    }
    if (values.country !== '' && values.country !== manager.country) {
      await dispatch(
        addMCountry({
          country: values.country,
          user_id: manager.user_id,
        })
      );
    }
    if (values.city !== '' && values.city !== manager.city) {
      await dispatch(
        addMCity({
          city: values.city,
          user_id: manager.user_id,
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
        ...manager,
      },
    }));
  }, [manager.user_id]);

  return (
    <GradientLayout hideBottomCircle variant="manager">
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
              <UserImage data={manager} size={'100%'} borderRadius={5} />
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
            readOnly
            title="Name"
            placeHolder="John Doe"
            variant="manager"
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
            variant="manager"
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
              borderColor: theme.colors.manager,
              padding: 5,
            }}
          />

          <InputField
            error={formik.errors.specialization}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            isTouched={formik.touched.specialization}
            value={formik.values.specialization}
            isSubmitting={isFormSubmitting}
            field="specialization"
            title="Specialization"
            placeHolder="Anesthesiologist"
            variant="manager"
          />

          <SView className="flex flex-row justify-between">
            <InputField
              error={formik.errors.country}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              isTouched={formik.touched.country}
              value={formik.values.country}
              isSubmitting={isFormSubmitting}
              field="country"
              title="Country"
              placeHolder="United States"
              classes="flex-1 mr-2"
              variant="manager"
            />

            <InputField
              error={formik.errors.city}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              isTouched={formik.touched.city}
              value={formik.values.city}
              isSubmitting={isFormSubmitting}
              field="city"
              title="City"
              placeHolder="New York"
              classes="flex-1"
              variant="manager"
            />
          </SView>
          <SView className="justify-end flex-1 mb-4">
            <SButton
              className={`mt-10 ${isFormSubmitting && 'bg-gray-300'}`}
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
        </KeyboardAwareScrollView>
      </SView>
    </GradientLayout>
  );
};
