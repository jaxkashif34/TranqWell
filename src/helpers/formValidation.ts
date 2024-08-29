import * as yup from 'yup';
import type { InitialFormStateType, Forms } from '~types';

const initialFormFields: InitialFormStateType = {
  SIGN_UP: {
    name: 'Abhijit Dey',
    email: 'abihijitdey@gmail.com',
    password: '123456',
    confirm_password: '123456',
    user_role: 'Customer',
  },
  SIGN_IN: {
    email: 'sebastianlucase@gmail.com',
    password: '123456',
  },
  FORGOT_PASSWORD: {
    email: '',
  },
  // @ts-ignore
  EDIT_PROFILE: {
    name: '',
    email: '',
    country: '',
    city: '',
    bio: '',
  },
  CHANGE_PASSWORD: {
    current_password: '',
    new_password: '',
    confirm_new_password: '',
  },
  DELETE_PROFILE: {
    password: '',
  },
  M_SIGN_UP_FIELDS: {
    name: 'Alisha Alba',
    email: 'alishaalba@gmail.com',
    password: '123456',
    confirm_password: '123456',
    specialization: 'Anesthesiologist',
    user_role: 'CaseManager',
  },
  MEETING_FIELDS: {
    title: 'This is a meeting title',
    description: 'This is a meeting description',
  },
  DISCUSSION_FIELDS: {
    title: 'This is a discussion title',
    description: 'This is a discussion description',
  },
  REMINDER_FIELDS: {
    title: 'This is a reminder title',
    description: 'This is a reminder description',
  },
} as const;

export const initialValues = <T extends Forms>(form: T) => {
  return initialFormFields[form];
  // type ValuesType<T> = T extends keyof typeof formFields ? (typeof formFields)[T] : never;
};

export const validationSchema = <T extends Forms>(form: T) => {
  return yup.object().shape({
    ...((form === 'SIGN_UP' ||
      form === 'EDIT_PROFILE' ||
      form === 'M_SIGN_UP_FIELDS') && {
      name: yup
        .string()
        .matches(
          /^(?!.*  )[a-zA-Z ]+$/,
          'only one space is allowed between words'
        )
        .min(3)
        .required(),
    }),
    email: yup
      .string()
      .lowercase()
      .email()
      .matches(/^[^\s]*$/, 'no spaces are allowed')
      .required(),
    ...((form === 'SIGN_UP' ||
      form === 'SIGN_IN' ||
      form === 'M_SIGN_UP_FIELDS') && {
      password: yup
        .string()
        .matches(
          /^(?!.*  )[a-zA-Z0-9 ]+$/,
          'only one space is allowed between words'
        )
        .min(6)
        .required(),
    }),
    ...((form === 'SIGN_UP' || form === 'M_SIGN_UP_FIELDS') && {
      confirm_password: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('confirm password is required'),
    }),
    ...(form === 'EDIT_PROFILE' && {
      country: yup.string(),
      city: yup.string(),
    }),
    ...(form === 'M_SIGN_UP_FIELDS' && {
      specialization: yup.string().required(),
    }),
  });
};

export const createMeetingValidation = yup.object().shape({
  title: yup.string().min(3).required(),
  description: yup.string().min(3).required(),
});

export const createForumValidation = yup.object().shape({
  title: yup
    .string()
    .min(3)
    .max(100, 'Title cannot exceed 100 characters')
    .required(),
  description: yup.string().min(3).required(),
});

export const profileValidation = yup.object().shape({
  name: yup.string().notRequired().min(3),
  email: yup.string().notRequired().lowercase().email(),
  country: yup.string().notRequired(),
  city: yup.string().notRequired(),
  bio: yup.string().notRequired().min(20, 'Bio must be 10 words'),
});

export const changePasswordValidation = yup.object().shape({
  current_password: yup
    .string()
    .min(6, 'must be at least 6 characters')
    .required('current password is required'),
  new_password: yup
    .string()
    .min(6, 'must be at least 6 characters')
    .required('new password is required'),
  confirm_new_password: yup
    .string()
    .oneOf([yup.ref('new_password'), null], 'Passwords must match')
    .required('confirm password is required'),
});

export const deleteProfileValidation = yup.object().shape({
  password: yup.string().min(6).required(),
});
