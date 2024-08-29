import React from 'react';
import { SImage } from '~base';
import { createImage } from '~helpers';
import UserAvatar from 'react-native-user-avatar';

type Props = {
  data: {
    profile_image: string;
    name: string;
  };
  borderRadius?: number;
  size: any;
  [key: string]: any;
};

export const UserImage = ({
  data,
  size,
  borderRadius = 50,
  ...props
}: Props) => {
  return Boolean(data.profile_image) ? (
    <SImage
      source={{
        uri: createImage(data.profile_image),
      }}
      style={{
        width: size,
        height: size,
        borderRadius: borderRadius,
        resizeMode: 'cover',
      }}
      {...props}
    />
  ) : (
    <UserAvatar
      // remove % from size
      size={typeof size === 'string' ? +size.slice(0, -1) : size}
      name={data.name}
      style={{ borderRadius: 50, height: size, width: size }}
    />
  );
};
