import * as ImagePicker from 'expo-image-picker';
import React, { SetStateAction } from 'react';

export const pickImage = async (
  setImage: React.Dispatch<SetStateAction<ImagePicker.ImagePickerAsset>>
) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    setImage(result.assets[0]);
  } else {
    setImage(null);
  }
};

export const getImageExtension = (uri: string) => {
  const uriParts = uri.split('.');
  return uriParts[uriParts.length - 1];
};

export const makeImageName = (user_id: number, ext: string) => {
  return `profile_image_${user_id}.${ext}`;
};
