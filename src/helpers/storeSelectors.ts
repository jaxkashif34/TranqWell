import { RootStateType } from '~redux';

export const selectCustomerState = (state: RootStateType) => state.customer;
export const selectManagerState = (state: RootStateType) => state.manager;
export const selectUiState = (state: RootStateType) => state.ui;
