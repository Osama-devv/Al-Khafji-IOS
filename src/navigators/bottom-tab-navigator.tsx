import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// import {
//   MAP_SCREEN,
//   MORE_SCREEN,
//   EVENTS_SCREEN,
//   HOME,
//   Residence_Screen,
// } from './navigation-routes';

import { MAP_SCREEN, MORE_SCREEN, HOME, EVENTS_SCREEN,RESIDENCE_SCREEN, PROFILE_SCREEN } from '@navigators/navigation-routes';

// import { Home, Map, More, Events,Residencies} from '../screens';

import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import HomeIcon from '@assets/images/svgs/home.svg';
import InactiveHomeIcon from '@assets/images/svgs/inactiveHome.svg';
import user from '@assets/images/svgs/user.svg';
import ResidenceIcon from '@assets/images/svgs/Residences.svg';
import ActiveResidences from '@assets/images/svgs/activeResidences.svg';
import EventIcon from '@assets/images/svgs/calendar.svg';
import MapIcon from '@assets/images/svgs/map2.svg'
import ActiveMap from '@assets/images/svgs/activeMap.svg';
import MoreIcon from '@assets/images/svgs/view-grid.svg';
import ActiveMore from '@assets/images/svgs/activeMore.svg';
import User from '@assets/images/svgs/user.svg';
import ActiveUser from '@assets/images/svgs/activeUser.svg';
import Home from '@screens/Home';
import Residencies from '@screens/Residencies';
import Events from '@screens/Events';
import More from '@screens/More';
import Profile from '@screens/Profile';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';
import { LanguageEnum } from '@appTypes/enums';
import LinearGradient from 'react-native-linear-gradient';
import { IFooter } from '@services/startup/types';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
const Tab = createBottomTabNavigator();

interface IFooterKeys {
    [key: string]: string;
    home: string;
    residences: string;
    map: string;
    more: string;
    profile: string;
}

const BottomTabsNavigator = () => {
      const { options, footer } = useSelector((state: IState) => state.startup);
      const { language, isLanguageProcessing } = options;
       const appLanguage = language?.toString() ?? LanguageEnum.AR;
       const isRTL = appLanguage !== LanguageEnum.EN;
       const [activeTab, setActiveTab] = useState('Home');
       console.log("tabActive== >", activeTab)

let footerLabels: any = {
  home: { label: '', active: '', inactive: '' },
  residences: { label: '', active: '', inactive: '' },
  map: { label: '', active: '', inactive: '' },
  more: { label: '', active: '', inactive: '' },
  profile: { label: '', active: '', inactive: '' },
};

const handleMenu = () => {
  footer?.forEach((item: any) => {
    const key = item?.slug.toLowerCase();

    footerLabels[key] = {
      label: item?.navBarTitle,
      active: item?.activeIcon,
      inactive: item?.inActiveIcon,
    };
  });
};

handleMenu();
const tabScreens = [
  { 
    name: HOME, 
    component: Home, 
    label: footerLabels?.home?.label,
    icon: { 
      active: (
        <SvgRenderer 
          src={footerLabels.home.active} 
          style={{ width: 24, height: 24 }} 
        />
      ), 
      inactive: (
        <SvgRenderer 
          src={footerLabels.home.inactive} 
          style={{ width: 24, height: 24 }} 
        />
      )
    } 
  },

  { 
    name: RESIDENCE_SCREEN, 
    component: Residencies, 
    label: footerLabels?.residences?.label,
    icon: { 
      active: (
        <SvgRenderer 
          src={footerLabels.residences.active} 
          style={{ width: 24, height: 24 }} 
        />
      ),
      inactive: (
        <SvgRenderer 
          src={footerLabels.residences.inactive} 
          style={{ width: 24, height: 24 }} 
        />
      )
    }
  },

  { 
    name: MAP_SCREEN, 
    component: Events, 
    label: footerLabels?.map?.label,
    icon: { 
      active: (
        <SvgRenderer 
          src={footerLabels.map.active} 
          style={{ width: 24, height: 24 }} 
        />
      ), 
      inactive: (
        <SvgRenderer 
          src={footerLabels.map.inactive} 
          style={{ width: 24, height: 24 }} 
        />
      )
    }
  },

  { 
    name: MORE_SCREEN, 
    component: More, 
    label: footerLabels?.more?.label,
    icon: { 
      active: (
        <SvgRenderer 
          src={footerLabels.more.active} 
          style={{ width: 24, height: 24 }} 
        />
      ), 
      inactive: (
        <SvgRenderer 
          src={footerLabels.more.inactive} 
          style={{ width: 24, height: 24 }} 
        />
      )
    }
  },

  { 
    name: PROFILE_SCREEN, 
    component: Profile, 
    label: footerLabels?.profile?.label,
    icon: { 
      active: (
        <SvgRenderer 
          src={footerLabels.profile.active} 
          style={{ width: 24, height: 24 }} 
        />
      ), 
      inactive: (
        <SvgRenderer 
          src={footerLabels.profile.inactive} 
          style={{ width: 24, height: 24 }} 
        />
      )
    }
  },
];



    const orderedTabs = isRTL ? [...tabScreens].reverse() : tabScreens;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          display: isLanguageProcessing ? 'none' : 'flex',
          height: Platform.OS === 'android' ? 65 : undefined,
          // paddingBottom: 32,
          // paddingTop: 10,
          position: 'absolute',
          backgroundColor: '#fff',
          borderColor: 'transparent'
          // elevation: 12
          // shadowRadius: 5,
        },
      }}
      initialRouteName={HOME}>
      {orderedTabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          listeners={{
            focus: () => {
              setActiveTab(tab?.name);
            },
          }}
          options={{
            headerShown: false,

            tabBarButton: props => {
              const {onPress} = props;
              const focused = tab?.name;
              return (
                <TouchableOpacity
                  onPress={(e) => {
                    setActiveTab(tab?.name);
                    props?.onPress?.(e);
                  }}
                  activeOpacity={1}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* Highlight background */}

                  {focused == activeTab ? (
                    <LinearGradient
                      colors={[
                        'rgba(0, 100, 110, 0.10)',
                        'rgba(0, 100, 110, 0.00)',
                      ]}
                      style={{
                        position: 'absolute',
                        top: 0,
                        height: 60,
                        width: '100%',
                        // borderWidth: 1
                      }}
                    />
                  ) : null}

                  {/* Top teal border */}
                  {focused == activeTab ? (
                    <View
                      style={{
                        position: 'absolute',
                        top: -1,
                        height: 3,
                        width: '100%',
                        backgroundColor: '#00646E',
                      }}
                    />
                  ) : null}

                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingTop: 10,
                    }}>
                    {/* Icon */}
                    <View style={{marginBottom: 4, 
                      height: 20, width: 20, 
                      overflow: 'hidden',
                      alignContent:'center',
                      alignItems:'center',
                      justifyContent:'center',
                      }}>
                      {focused == activeTab
                        ? tab.icon.active
                        : tab.icon.inactive}
                    </View>

                    {/* Label */}
                    <Text
                      numberOfLines={1}
                      style={{
                        fontWeight: '400',
                        color: focused == activeTab ? '#00646E' : '#8A8A8A',
                        lineHeight: 13.2,
                        fontFamily: 'Charter',
                        textAlign: 'center',
                        fontSize: 12,
                        paddingBottom: 5,
                      }}>
                      {tab.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            },

            // tabBarStyle: {
            //   height: 70,
            //   paddingBottom: 10,
            //   backgroundColor: '#FFF',
            //   borderTopWidth: 0.5,
            //   borderTopColor: '#CCCCCC',
            // },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
