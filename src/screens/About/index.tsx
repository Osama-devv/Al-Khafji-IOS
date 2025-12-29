import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  Text,
  Linking,
  Platform,
} from 'react-native';
import { Screen } from '@components/common/Screen/Screen';
import TransparentHeader from '@components/common/Header/transparentHeader';
import { images } from 'assets/images';
import { colors } from '@theme/colors';
import CustomButton from '@components/common/CustomButton';
import Separator from '@components/common/Separator';
import DestinationCard from '@components/common/Card/DestinationCard';
import TimelineCard from '@components/common/Card/TimeLineCard';
import FeaturedLists from '@components/common/FeatureList';
import EducationCap from 'assets/images/svgs/graduation-cap.svg';
import HealthcareIcon from 'assets/images/svgs/healthcare.svg';
import DisctrictIcon1 from 'assets/images/svgs/Murjan.svg';
import DisctrictIcon2 from 'assets/images/svgs/Durrat.svg';
import Districts from '@components/common/Districts';
import Communities from '@components/common/Communities';
import CommunityImage from 'assets/images/svgs/CommunityImage.svg';
import FactPattern from 'assets/images/svgs/factPattern.svg';
import { Dimensions } from 'react-native';
import FactSections from '@components/common/FactSection/FactSection';
import NewsList from '@components/common/NewsList';
import { ContentBlock } from '@components/common/ContentBlock';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';
import { LanguageEnum } from '@appTypes/enums';
import { $directionRtl } from '@theme/view';
import {useIsFocused} from '@react-navigation/native';
import {useAboutQuery} from '@services/about/aboutApi';
import {IsValidArray} from '@utils/helpers';
import LatestUpdates from '@components/LatestUpdates';
import { useNavigation } from '@react-navigation/native';
import { COMMUNITYDETAIL } from '@navigators/navigation-routes';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const {width} = Dimensions.get('window');

const DATA = [
  {
    id: '1',
    title: 'Education',
    image: images.facilities2,
    icon: <EducationCap width={24} height={24} />,
  },
  {
    id: '2',
    title: 'Healthcare',
    image: images.facilities3,
    icon: <HealthcareIcon width={24} height={24} />,
  },
  {
    id: '3',
    title: 'Healthcare3',
    image: images.facilities1,
    icon: <HealthcareIcon width={24} height={24} />,
  },
];

const DISTRICTS_DATA = [
  {
    id: '1',
    image: <DisctrictIcon2 width={119} height={46} />,
  },
  {
    id: '2',
    image: <DisctrictIcon1 width={119} height={46} />,
  },
  {
    id: '3',
    image: <DisctrictIcon2 width={119} height={46} />,
  },
];

export const NEWS_DATA_WITH_BADGE_AND_ICON = [
  {
    id: "1",
    title: "Smart Cities: The Future of Urban Living",
    date: "25 Oct 2025",
    tag: "PRESS RELEASE",
    image: images.newsItem1,
  },
  {
    id: "2",
    title: "Revolutionising Coastal Tourism",
    date: "12 Nov 2025",
    tag: "REPORT",
    image: images.newsItem1,
  },
  {
    id: "3",
    title: "Sustainable Waterfront Communities",
    date: "03 Dec 2025",
    tag: "PRESS RELEASE",
    image: images.newsItem1,
  },
];


const COMMUNITIES_DATA = [
  {
    id: '1',
    title: 'Ansam',
    description:
      'A walkable coastal enclave offering comfort, connection, and direct access to the water.',
    image: images.community1,
    svg: <CommunityImage width={95} height={70} />,
  },
  {
    id: '2',
    title: 'Ansam',
    description:
      'A walkable coastal enclave offering comfort, connection, and direct access to the water.',
    image: images.community1,
    svg: <CommunityImage width={95} height={70} />,
  },
  {
    id: '3',
    title: 'Ansam',
    description:
      'A walkable coastal enclave offering comfort, connection, and direct access to the water.',
    image: images.community1,
    svg: <CommunityImage width={95} height={70} />,
  },
];

const About = () => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage = language ?? LanguageEnum.AR;
  const isFocused = useIsFocused();
  let {data, isLoading} = useAboutQuery(undefined, {skip: !isFocused});
  const components = data?.data?.components;

  const aboutBanner = IsValidArray(components)
    ? components?.find(item => item.alias === 'mobileHeroBanner')?.properties
    : undefined;
  const descriptionData = IsValidArray(components)
    ? components?.find(item => item.alias === 'headingDescriptionWithCta')
        ?.properties
    : undefined;
  const districtsData = IsValidArray(components)
    ? components?.find(item => item.alias === 'mobileFeaturedDistricts')
        ?.properties
    : undefined;
  const communitiesData = IsValidArray(components)
    ? components?.find(item => item.alias === 'mobileFeaturedCommunity')
        ?.properties
    : undefined;
  const destinationsData = IsValidArray(components)
    ? components?.find(item => item.alias === 'headingWithTwoCardsWithItems')
        ?.properties
    : undefined;
  const updatesData = IsValidArray(components)
    ? components?.find(item => item.alias === 'mobileFeaturedMediaCentres')
        ?.properties
    : undefined;
  const featuresData = IsValidArray(components)
    ? components?.find(item => item.alias === 'featuredAmenities')?.properties
    : undefined;
  const factsData = IsValidArray(components)
    ? components?.find(item => item.alias === 'headingBgImageWithCards')
        ?.properties
    : undefined;
  const navigation = useNavigation();

  if(isLoading) return <></>
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
        style={{ backgroundColor: 'transparent' }}>
        <ScrollView>
          <View style={styles.heroSection}>
            {aboutBanner?.image?.src && (
              <ImageBackground
                source={{uri: aboutBanner?.image?.src}}
                style={styles.heroImage}
                resizeMode="cover">
                {aboutBanner?.title && (
                  <TransparentHeader
                    title={aboutBanner?.title}
                    titleColor={colors.palette.white}
                    showBackButton={true}
                    showSeparator={true}
                  />
                )}
              </ImageBackground>
            )}
          </View>

          <ImageBackground source={images.homeBg} resizeMode="cover">
            <View style={styles.contentBlock}>
              <ContentBlock
                title={descriptionData?.heading}
                description={descriptionData?.description}
                linkText={descriptionData?.readMoreText}
                seeLessText={descriptionData?.readLessText}
                onPressLink={() => Linking.openURL('https://google.com')}
                rtl={appLanguage === LanguageEnum.AR}
              />
            </View>
            <Separator />
            {districtsData?.title && (
              <View
                style={[styles.componentWrapper, $directionRtl(appLanguage)]}>
                <Text style={styles.componentTitle}>
                  {districtsData?.title}
                </Text>
              </View>
            )}
            <Districts
              data={districtsData?.featuredItems}
              rtl={appLanguage === LanguageEnum.AR}
            />
            {/* <Separator /> */}
            {communitiesData?.title && (
              <View
                style={[styles.componentWrapper, $directionRtl(appLanguage)]}>
                <Text style={styles.componentTitle}>
                  {communitiesData?.title}
                </Text>
              </View>
            )}
            <Communities
              data={communitiesData?.communities}
              rtl={appLanguage === LanguageEnum.AR}
              onPress={()=> navigation.navigate(COMMUNITYDETAIL as never)}
            />
            {/* <Separator /> */}
            {destinationsData?.heading && (
              <View
                style={[styles.componentWrapper, $directionRtl(appLanguage)]}>
                <Text style={styles.componentTitle}>
                  {destinationsData?.heading}
                </Text>
              </View>
            )}
            {IsValidArray(destinationsData?.children) &&  destinationsData?.children?.map((item, index) => {
              if (item?.slug === 'vision-mission-and-values') {
                return (
                  <DestinationCard
                    key={index}
                    title={item?.heading}
                    subtitle={item?.description}
                  />
                );
              }
              const mappedImages =
                (IsValidArray(item?.images) &&
                  item?.images
                    ?.map(img => img?.properties?.image?.src)
                    ?.filter(Boolean)) ||
                [];
              return (
                <TimelineCard
                  key={index}
                  title={item?.heading}
                  subtitle={item.description}
                  images={mappedImages}
                  // timelineData={item.children}
                />
              );
            })}

            <Separator />
            {/* <View style={[styles.rowComponents, $directionRtl(appLanguage)]}>
              <Text style={styles.componentTitle}>Latest Updates</Text>
              <CustomButton
                title="View all"
                variant="outline"
                size="sm"
                onPress={() => { }}
                backgroundColor="#f0ebe2"
              />
            </View> */}
            {/* <NewsList rtl={appLanguage === LanguageEnum.AR} /> */}
            <LatestUpdates appLanguage={appLanguage} data={updatesData} />

            <Separator/>

            <View style={[styles.rowComponents, $directionRtl(appLanguage)]}>
              {featuresData?.heading && (
                <Text style={styles.componentTitle}>
                  {featuresData?.heading}
                </Text>
              )}
              {featuresData?.cta && (
                <CustomButton
                  title={featuresData?.cta}
                  variant="outline"
                  size="sm"
                  onPress={() => {}}
                  backgroundColor="#f0ebe2"
                />
              )}
            </View>
            <FeaturedLists
              data={featuresData?.amenties}
              rtl={appLanguage === LanguageEnum.AR}
            />
            {IsValidArray(factsData?.projectFeatures) && (
              <FactSections
                title={factsData?.heading}
                image={factsData?.backgroundImage?.src}
                number="10 km"
                description="of shoreline shaped by beaches, marinas, and promenades"
                pattern={
                  <FactPattern
                    width="100%"
                    height={210}
                    preserveAspectRatio="none"
                  />
                }
              />
            )}
          </ImageBackground>
        </ScrollView>
      </Screen>
    </>
  );
};

export default About;

const styles = StyleSheet.create({
  heroSection: {
    height: SCREEN_HEIGHT * 0.4,
    width: '100%',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  contentBlock: {
    paddingHorizontal: 16,
  },
  componentWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  rowComponents: {
    marginTop: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  componentTitle: {
    fontFamily: 'Charter',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 24,
    color: colors.textPrimary,
  },
});
