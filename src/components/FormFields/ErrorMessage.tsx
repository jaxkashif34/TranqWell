import React from 'react';
import { SText } from '~base';

type Props = {
  isTouched: boolean;
  error: string | undefined;
};

export const ErrorMessage: React.FC<Props> = (props: Props) => {
  const { error, isTouched } = props;
  return isTouched && error ? (
    <SText className="font-osLight text-red-500 text-xs">{error}</SText>
  ) : null;
};
