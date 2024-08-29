// ********************* Forms Types ************************

import { UserType } from "./RolesType";

type FormFields = {
  name: string;
  confirm_password: string;
  email: string;
  password: string;
  specialization: string;
  user_role: UserType;
};

type SIGN_UP_FIELDS = Omit<FormFields, "specialization">;
type M_SIGN_UP_FIELDS = FormFields;
type SIGN_IN_FIELDS = Omit<
  FormFields,
  "name" | "confirm_password" | "specialization" | "user_role"
>;
type FORGOT_PASSWORD_FIELDS = Omit<
  FormFields,
  "name" | "confirm_password" | "password" | "specialization" | "user_role"
>;
type EDIT_PROFILE_FIELDS = Omit<
  FormFields,
  "confirm_password" | "password" | "specialization" | "user_role"
> & {
  country: string;
  city: string;
  bio: string;
  specialization: string;
};

type MEETING_FIELDS = {
  title: string;
  description: string;
};

export type DISCUSSION_FIELDS = {
  title: string;
  description: string;
};
type CHANGE_PASSWORD_FIELDS = {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
};

type InitialFormStateType = {
  SIGN_UP: SIGN_UP_FIELDS;
  M_SIGN_UP_FIELDS: M_SIGN_UP_FIELDS;
  SIGN_IN: SIGN_IN_FIELDS;
  FORGOT_PASSWORD: FORGOT_PASSWORD_FIELDS;
  EDIT_PROFILE: EDIT_PROFILE_FIELDS;
  CHANGE_PASSWORD: CHANGE_PASSWORD_FIELDS;
  DELETE_PROFILE: { password: string };
  MEETING_FIELDS: MEETING_FIELDS;
  DISCUSSION_FIELDS: DISCUSSION_FIELDS;
  REMINDER_FIELDS: DISCUSSION_FIELDS;
};

type Forms = keyof InitialFormStateType;

// keys should be same as initialFormFields but values should be string
type FieldsForForm<T extends Forms> = InitialFormStateType[T];

export type {
  FORGOT_PASSWORD_FIELDS,
  InitialFormStateType,
  SIGN_IN_FIELDS,
  SIGN_UP_FIELDS,
  Forms,
  FieldsForForm,
  M_SIGN_UP_FIELDS,
  MEETING_FIELDS,
};
