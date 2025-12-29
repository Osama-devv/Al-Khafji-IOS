import {ImageBackground, Platform, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import React from 'react';
import {Screen} from '@components/common/Screen/Screen';
import Event from '@components/Events/Event';
import Experience from '@components/Experiences/Experience';
import Residence from '@components/Residence/Residence';
import calculator from 'assets/images/svgs/calculator.svg';
import mail from 'assets/images/svgs/mail.svg';
import {useSelector} from 'react-redux';
import {IState} from '@reducers/index';
import {LanguageEnum} from '@appTypes/enums';
import Separator from '@components/common/Separator';
import {images} from 'assets/images';
import {useHomeQuery} from '@services/home/homeApi';
import {useIsFocused} from '@react-navigation/native';
import {IsValidArray} from '@utils/helpers';
import HomeBanner from '@components/HomeBanner';
import LatestUpdates from '@components/LatestUpdates';
import Destination from '@components/Destination/Destination';
import {OTP_SCREEN, REGISTER_INTEREST} from '@navigators/navigation-routes';

type ActivityCard = {
  image: any;
  title: string;
  date: string;
  desc: string;
};

// const residencesData = [
//   {id: '1', title: 'Signature Villas', desc: 'From 1,000,000 SAR'},
//   {id: '2', title: 'Luxury Villas', desc: 'From 850,000 SAR'},
//   {id: '3', title: 'Signature Villas', desc: 'From 950,000 SAR'},
//   {id: '4', title: 'Luxury Villas', desc: 'From 1,200,000 SAR'},
// ];

const activityCards: ActivityCard[] = [
  {
    image: images.outdoor,
    title: 'Outdoor kids playground',
    date: 'Jan - Dec 2026',
    desc: 'Beach 5',
  },
  {
    image: images.coffee,
    title: 'Coffee at the beach',
    date: 'Jan - Dec 2026',
    desc: 'Beach 5',
  },
  {
    image: images.walkathons,
    title: 'Walkathons',
    date: 'Jan - Dec 2026',
    desc: 'Beach 5',
  },
];

const items = [
  {
    id: 1,
    title: 'Register Interest',
    bg: '#006E6A',
    icon: mail,
    href: REGISTER_INTEREST,
  },
  {
    id: 2,
    title: 'Mortgage Calculator',
    bg: '#B58D67',
    icon: calculator,
    href: '',
  },
];

// const updatesData = [
//   {
//     id: '1',
//     image: images.smartcity,
//     title: 'Smart Cities: The Future of Urban\nLiving',
//     date: '25 Oct 2025',
//   },
//   {
//     id: '2',
//     image: images.smartcity,
//     title: 'Smart Cities: The Future of Urban\nLiving',
//     date: '25 Oct 2025',
//   },
//   {
//     id: '3',
//     image: images.smartcity,
//     title: 'Smart Cities: The Future of Urban\nLiving',
//     date: '25 Oct 2025',
//   },
//   {
//     id: '4',
//     image: images.smartcity,
//     title: 'Smart Cities: The Future of Urban\nLiving',
//     date: '25 Oct 2025',
//   },
//   {
//     id: '5',
//     image: images.smartcity,
//     title: 'Smart Cities: The Future of Urban\nLiving',
//     date: '25 Oct 2025',
//   },
//   {
//     id: '6',
//     image: images.smartcity,
//     title: 'Smart Cities: The Future of Urban\nLiving',
//     date: '25 Oct 2025',
//   },
// ];

const Home = () => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;
  const isFocused = useIsFocused();
  let {data} = useHomeQuery(undefined, {skip: !isFocused});
  const components = data?.data?.components;

  const bannerData =
    IsValidArray(components) &&
    components?.find(item => item.alias === 'messageDescriptionHeroSectionWithCta')
      ?.properties;
  const residenceData =
    IsValidArray(components) &&
    components?.find(item => item.alias === 'mobileFeaturedResidences')
      ?.properties;
  const experienceData =
    IsValidArray(components) &&
    components?.find(item => item.alias === 'eventsCategories')
      ?.properties;
  const eventsData =
    IsValidArray(components) &&
    components?.find(item => item.alias === 'mobileFeaturedEvents')
      ?.properties;
  const updatesData =
    IsValidArray(components) &&
    components?.find(item => item.alias === 'mobileFeaturedMediaCentres')
      ?.properties;

  const destinationData =
    IsValidArray(components) &&
    components?.find(item => item.alias === 'captionTitleCtaWithDetailCards')
      ?.properties;
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Screen
        preset="fixed"
        safeAreaEdges={['bottom']}
        style={{ backgroundColor: 'transparent' }}
          StatusBarProps={{
          translucent: true,
          backgroundColor: 'transparent',
        }}
        backgroundColor="transparent"
        >
        <ScrollView contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={images.homeBg}
            style={{width: '100%',  minHeight: '100%'}}
            resizeMode="cover"
            >
          {/* Banner */}
            <HomeBanner appLanguage={appLanguage} data={bannerData} />
            {/* Residence component */}
            <Residence data={residenceData} />
            {/* Experience component */}
            <Experience data={experienceData} />
            {/* Events component */}
            <Event data={eventsData} />
            <Separator />
            {/* Latest updates component */}
            <LatestUpdates appLanguage={appLanguage} data={updatesData} />
            <Separator />
            <Destination  data={destinationData}/>
          </ImageBackground>
        </ScrollView>
      </Screen>
    </>
  );
};

export default Home;

