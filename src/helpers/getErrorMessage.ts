const errorKeys = [
  'non_field_errors',
  'msg',
  'email',
  'name',
  'confirm_password',
  'password' /* other keys */,
  'user_role',
];
export const getErrorMessage = (
  response: { [key: string]: any },
  keys: string[] = errorKeys
): string => {
  for (const key of keys) {
    if (response?.[key]) {
      if (Array.isArray(response[key])) {
        return response[key][0];
      } else if (typeof response[key] === 'string') {
        return response[key];
      }
    }
  }
  return 'Something went wrong';
};
