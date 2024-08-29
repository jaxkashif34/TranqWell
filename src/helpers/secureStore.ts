import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistedDataType } from '~types';

export const getStoredValue = async <K extends keyof PersistedDataType>(
  key: K
) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value) as PersistedDataType[K];
  } catch (error) {
    console.error('Error getting user credentials:', error);
  }
};

export const storeValue = async <K extends keyof PersistedDataType>(
  key: K,
  credentials: PersistedDataType[K]
) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(credentials));
  } catch (error) {
    console.error('Error saving user credentials:', error);
  }
};

export const removeStoreValue = async (key: keyof PersistedDataType) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing user credentials:', error);
  }
};
