import React from 'react';
import { Provider } from 'react-redux';
import '@i18n';
import store, { persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import ApplicationNavigator from '@navigators/Application';
// import { sentryInit } from 'src/Sentry';
import {
    initialWindowMetrics,
    SafeAreaProvider,
} from 'react-native-safe-area-context';
// import * as Sentry from '@sentry/react-native';
import Config from 'src/config';
import { ErrorBoundary } from '@screens/error-screen/ErrorBoundary';
import '@utils/ignoreWarnings';
import { ThemeProvider } from './theme';
const App = () => {
    // if (!__DEV__) {
    //     sentryInit();
    // }
    return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ErrorBoundary catchErrors={Config.catchErrors}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ThemeProvider>
                <ApplicationNavigator />
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </ErrorBoundary>
      </SafeAreaProvider>
    );
};

export default App;
// export default Sentry.wrap(App);
