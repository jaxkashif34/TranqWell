import React, { useEffect, useState } from 'react';
import { PreSplash, SplashScreen } from '~screens';
import { useAppDispatch, useAppSelector, useAssetsHook } from '~hooks';
import { RootNavigation } from '~navigation';
import {
  getCustomerMeetings,
  getInitialManagerMeetings,
  getMConversations,
} from '~redux';
import {
  selectCustomerState,
  selectManagerState,
  selectUiState,
} from '~helpers';

export const AppBase = () => {
  const [showSplash, setShowSplash] = useState(true);
  const IsReady = useAssetsHook();
  const { manager, authenticated: mAuthenticated } =
    useAppSelector(selectManagerState);
  const { customer, authenticated: cAuthenticated } =
    useAppSelector(selectCustomerState);
  const { userRole } = useAppSelector(selectUiState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getData = async () => {
      if (userRole === 'CaseManager' && mAuthenticated) {
        await dispatch(getInitialManagerMeetings(manager.user_id));
        await dispatch(
          getMConversations({ id: manager.user_id, access: manager.access })
        );
      } else if (userRole === 'Customer' && cAuthenticated) {
        dispatch(getCustomerMeetings(customer.user_id));
      }
    };
    getData();
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Change this to the number of milliseconds you want to show the SplashScreen

    return () => clearTimeout(timer); // This will clear the timer when the component unmounts
  }, []);

  if (!IsReady) return <PreSplash />;
  return showSplash ? <SplashScreen /> : <RootNavigation />;
};
