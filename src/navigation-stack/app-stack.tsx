import React, { useEffect, useState } from 'react'
import { BOTTOM_TABS, MAP_SCREEN, MORE_SCREEN, EVENTS_SCREEN, HOME, ONBOARDING, RESIDENCEFILTERS, ABOUT_SCREEN, NOTIFICATIONS, PROFILE_SCREEN, REGISTER_INTEREST, OTP_SCREEN, SUCCESSINTEREST, DISTRICT_DETAIL, RESIDENCE_DETAILS, NEWSROOM, ARTICLEDETAIL, COMMUNITYDETAIL, COMMUNITYZONEDETAIL } from '@navigators/navigation-routes';
import { useTheme } from '@theme/index';
import BottomTabsNavigator from '@navigators/bottom-tab-navigator';
import { AppStackParams } from '@navigators/app-stack-params';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@screens/Home';
import Map from '@screens/Map';
import Events from '@screens/Events';
import MoreScreen from '@screens/More';
import { startupApi, useStartupQuery } from '@services/startup/startupApi';
import { useIsReady } from '@helpers/index';
import { useDispatch, useSelector } from 'react-redux';
import { delayExecution } from '@utils/helpers';
import { SERVICE_TAGS } from '@constants/index';
import { emptySplitApi } from '@services/emptySplitApi';
import { IState } from '@reducers/index';
import OnBoardingScreen from '@screens/onBoarding';
import Splash from '@screens/splash';
import ResidenceFilters from '@screens/ResidenceFilters';
import Profile from '@screens/Profile';
import NotificationsScreen from '@screens/Notifications';
import { listenForNotifications, requestUserPermission } from 'src/Notifications';
import About from '@screens/About/index';
import ResidenceDetails from '@screens/ResidenceDetails';
import RegisterInterest from '@screens/register-interest';
import OtpScreen from '@screens/Otp';
import SuccessInterest from '@screens/SuccessInterest';
import DistrictDetail from '@screens/district-detail';
import Newsroom from '@screens/Newsroom';
import ArticleDetail from '@screens/article-detail';
import CommunityDetail from '@screens/community-details';
import CommunityZoneDetail from '@screens/community-zone-detail';

const Stack = createNativeStackNavigator<AppStackParams>();


const AppStack = () => {
  const { isLoading, refetch, status, } = useStartupQuery();
  const isFocused = useIsReady();
  const dispatch = useDispatch();
  const [showSplash, setShowSplash] = useState<boolean>(true);

  const { options } = useSelector((state: IState) => state.startup);
  const { showIntroSlides } = options;

  useEffect(() => {
    if (isFocused || !isLoading) {
      if (status === 'pending') {
        delayExecution(() => {
          dispatch(startupApi.util?.resetApiState());
          dispatch(emptySplitApi.util.invalidateTags(SERVICE_TAGS));
        }, 1000);
      }
      refetch();
      delayExecution(async () => {
        setShowSplash(false);
      }, 3000);
    }
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = listenForNotifications();
    requestUserPermission('general');
    return unsubscribe;
  }, []);

  const { variant } = useTheme();

  if (showSplash) {
    return <Splash />
  }

  return (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}>
        {showIntroSlides ? (
          <Stack.Screen name={ONBOARDING} component={OnBoardingScreen} />
        ) : (
          <>
            <Stack.Screen name={BOTTOM_TABS as keyof AppStackParams} component={BottomTabsNavigator} />
            <Stack.Screen component={Home} name={HOME as keyof AppStackParams} />
            <Stack.Screen component={Map} name={MAP_SCREEN as keyof AppStackParams} />
            <Stack.Screen component={Events} name={EVENTS_SCREEN as keyof AppStackParams} />
            <Stack.Screen component={MoreScreen} name={MORE_SCREEN as keyof AppStackParams} />
            <Stack.Screen component={About} name={ABOUT_SCREEN as keyof AppStackParams} />
            <Stack.Screen component={ResidenceFilters} name={RESIDENCEFILTERS as keyof AppStackParams} />
            <Stack.Screen component={Profile} name={PROFILE_SCREEN as keyof AppStackParams} />
            <Stack.Screen component={NotificationsScreen} name={NOTIFICATIONS as keyof AppStackParams} />
            <Stack.Screen component={ResidenceDetails} name={RESIDENCE_DETAILS as keyof AppStackParams} />
            <Stack.Screen component={RegisterInterest} name={REGISTER_INTEREST as keyof AppStackParams} />
            <Stack.Screen component={OtpScreen} name={OTP_SCREEN} />
            <Stack.Screen component={SuccessInterest} name={SUCCESSINTEREST} />
            <Stack.Screen component={DistrictDetail} name={DISTRICT_DETAIL as keyof AppStackParams} />
            <Stack.Screen component={Newsroom} name={NEWSROOM} />
            <Stack.Screen component={ArticleDetail} name={ARTICLEDETAIL} />
            <Stack.Screen component={CommunityDetail} name={COMMUNITYDETAIL} />
            <Stack.Screen component={CommunityZoneDetail} name={COMMUNITYZONEDETAIL} />
          </>
        )}
      </Stack.Navigator>
    </React.Fragment>
  )
}

export default AppStack
