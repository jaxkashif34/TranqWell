import React from 'react';
import { AppBase } from './src/screens/App/App';
import { Provider } from 'react-redux';
import { store, persister } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { PreSplash } from '~screens';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<PreSplash />} persistor={persister}>
        <AppBase />
      </PersistGate>
    </Provider>
  );
}
