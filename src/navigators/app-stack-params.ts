import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { BOTTOM_TABS, MAP_SCREEN, MORE_SCREEN, PROJECTS_SCREEN, HOME } from './navigation-routes';
import { BOTTOM_TABS, MAP_SCREEN, MORE_SCREEN, PROJECTS_SCREEN, HOME,ONBOARDING, RESIDENCEFILTERS, ABOUT_SCREEN, REGISTER_INTEREST, OTP_SCREEN, SUCCESSINTEREST, DISTRICT_DETAIL,RESIDENCE_DETAILS, NEWSROOM, ARTICLEDETAIL, COMMUNITYDETAIL, COMMUNITYZONEDETAIL } from '@navigators/navigation-routes';

export type AppStackParams = {
  [HOME]: undefined;
  [MAP_SCREEN]: undefined;
  [BOTTOM_TABS]: undefined;
  [PROJECTS_SCREEN]: undefined;
  [MORE_SCREEN]: undefined;
  [ONBOARDING]: undefined;
  [ABOUT_SCREEN]: undefined;
  [RESIDENCEFILTERS]: undefined;
  [RESIDENCE_DETAILS]: undefined;
  [OTP_SCREEN]: undefined;
  [SUCCESSINTEREST]: undefined;
  [DISTRICT_DETAIL]: undefined;
  [NEWSROOM]: undefined;
  [ARTICLEDETAIL]: undefined;
  [COMMUNITYDETAIL]: undefined;
  [COMMUNITYZONEDETAIL]: undefined;
  // Your screens go here
};

export type AppNavigationProps = NativeStackNavigationProp<AppStackParams>;
