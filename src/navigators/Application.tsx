import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens(true);
import AppStack from 'src/navigation-stack/app-stack';
import { useTheme } from '@theme/index';
import { navigationRef } from './navigationService';

const ApplicationNavigator = () => {
  const { navigationTheme } = useTheme();

  // Memoize navigation container props to prevent rerenders
  const navigationContainerProps = useMemo(() => ({
    theme: navigationTheme,
    ref: navigationRef,
  }), [navigationTheme]);

  return (
    <NavigationContainer {...navigationContainerProps}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <AppStack />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
