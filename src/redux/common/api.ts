import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_PATHS, makeRequest } from '~services';

export const sendDeviceToken = createAsyncThunk(
  'ui/sendDeviceToken',
  async ({ user_id, token }: { user_id: number; token: string }, thunkApi) => {
    try {
      const response = await makeRequest(
        `${API_PATHS['get-device-token']}?user_id=${user_id}`,
        {
          method: 'POST',
          data: { token },
        }
      );
      return response;
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);
