// Anything exported under this directory that will be used outside of this directory will be exported from here

import { fontNames } from "./fontNames";
import { timeout } from "./timeOut";
import { getErrorMessage } from "./getErrorMessage";
import { pickImage, getImageExtension, makeImageName } from "./imagePicker";
import {
  initialValues,
  validationSchema,
  profileValidation,
  changePasswordValidation,
  deleteProfileValidation,
  createMeetingValidation,
  createForumValidation,
} from "./formValidation";
import { truncateString } from "./truncateString";
import {
  convertToAM_PM,
  timeRemaining,
  getDayNamesFromNumbers,
  getNextWeekDates,
  getRelativeTime,
  getPassedMeetingLinks,
} from "./dateTime";
import {
  eventKeys,
  getRandomColor,
  hexToRGBA,
  getUserName,
  getUserImage,
  getOtherUserId,
  createImage,
} from "./others";

// customer screens
import {
  UnAuthCScreens,
  CHomeNavigators,
  CHomeTabsScreens,
  CEventsScreens,
  CChatsScreens,
} from "./customerScreens";

// common
import {
  selectCustomerState,
  selectManagerState,
  selectUiState,
} from "./storeSelectors";
import { showToast } from "./showToast";
import { getStoredValue, removeStoreValue, storeValue } from "./secureStore";
import { arrangeMeetings, arrangeReminders } from "./organizeMeetings";

export {
  fontNames,
  timeout,
  getErrorMessage,
  pickImage,
  initialValues,
  validationSchema,
  profileValidation,
  changePasswordValidation,
  deleteProfileValidation,
  truncateString,
  convertToAM_PM,
  timeRemaining,
  eventKeys,
  UnAuthCScreens,
  CHomeNavigators,
  CHomeTabsScreens,
  selectUiState,
  selectCustomerState,
  selectManagerState,
  getStoredValue,
  removeStoreValue,
  storeValue,
  showToast,
  CEventsScreens,
  CChatsScreens,
  arrangeMeetings,
  createMeetingValidation,
  getRandomColor,
  hexToRGBA,
  getImageExtension,
  makeImageName,
  getUserName,
  getDayNamesFromNumbers,
  getNextWeekDates,
  getUserImage,
  getOtherUserId,
  createForumValidation,
  getRelativeTime,
  createImage,
  arrangeReminders,
  getPassedMeetingLinks,
};
