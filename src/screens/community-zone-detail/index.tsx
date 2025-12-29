import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import {Screen} from '@components/common/Screen/Screen';
import TransparentHeader from '@components/common/Header/transparentHeader';
import ImageLoader from '@components/common/Image-loader';
import CustomButton from '@components/common/CustomButton';
import Separator from '@components/common/Separator';
import Card from '@components/residences/card';
import DistrictCard from '@components/residences/districtCard';
import {useSelector} from 'react-redux';
import {IState} from '@reducers/index';
import {LanguageEnum} from '@appTypes/enums';
import {$flexDirection, $textAlign} from '@theme/view';
import {images} from 'assets/images';
import CommunityImage from 'assets/images/svgs/CommunityImage.svg';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import {BlurView} from '@react-native-community/blur';
import FastImage from 'react-native-fast-image';
import mapPinIcon from '@assets/images/svgs/mapPin.svg';
import heartIcon from '@assets/images/svgs/heart.svg';
import shoppingIcon from '@assets/images/svgs/shopping.svg';
import healthcareIcon from '@assets/images/svgs/healthcare.svg';
import graduationIcon from '@assets/images/svgs/graduation-cap.svg';
import communityIcon from '@assets/images/svgs/tree.svg';
import murjanIcon from '@assets/images/svgs/marjannn.svg';
import musarratIcon from '@assets/images/svgs/musarrat.svg';
import ansam from '@assets/images/svgs/ansam.svg';
import {colors} from '@theme/colors';
import Communities from '@components/common/Communities';
import BackIcon from 'assets/images/svgs/backIcon.svg';
import {useNavigation} from '@react-navigation/native';
import DynamicBlurredIcon from '@components/DynamicBlurredIcon';
import DetailsImageSlider from '@components/common/DetailsImageSlider';
import AmenitiesList from '@components/common/AmenitiesList';
import Badge from '@components/common/Badge';
import NewsList from '@components/common/NewsList';
import EventCard from '@components/Events/EventCard';
import { COMMUNITYZONEDETAIL } from '@navigators/navigation-routes';

const {width} = Dimensions.get('window');

const data = {
  district: {
    id: 1,
    name: 'Sahat Ansam',
    description:
      `Sales Center, Local Mosque, and Retail Area. A pedestrian-friendly area lined with cafés and local stores, Sahat Ansam encourages social connection and cultural exchange, bringing the warmth of Khaleeji hospitality into a contemporary context.`,
    headerImage: 'https://example.com/images/durrat_header.jpg',
    location: {
      latitude: 27.9803,
      longitude: 48.4922,
    },
  },
  districts: [
    {
        id: '1',
    image: images.outdoor,
    title: 'Outdoor kids playground',
    date: 'Jan - Dec 2026',
    desc: 'Beach 5',
  },
  {
    id: '2',
    image: images.coffee,
    title: 'Coffee at the beach',
    date: 'Jan - Dec 2026',
    desc: 'Beach 5',
  },
  {
    id: '3',
    image: images.walkathons,
    title: 'Walkathons',
    date: 'Jan - Dec 2026',
    desc: 'Beach 5',
  },
  ],
  cta: {
    showOnMapLabel: 'Show on map',
  },

  COMMUNITIES_DATA: [
    {
      id: '1',
      title: 'Community Center',
      description:
        'The civic and social anchor of Ansam North.',
      image: images.community1,
      key: COMMUNITYZONEDETAIL
    },
    {
      id: '2',
      title: 'Community Center',
      description:
        'The civic and social anchor of Ansam North.',
      image: images.community1,
      key: COMMUNITYZONEDETAIL
    },
    {
      id: '3',
      title: 'Ansam',
      description:
        'Sales Center, Local Mosque, Retail Area and more to discover.',
      image: images.community1,
      key: COMMUNITYZONEDETAIL
    },
  ],

  amenities: [
    {id: '1', title: 'Community Park', icon: communityIcon},
    {id: '2', title: 'Retail Promenade', icon: communityIcon},
    {id: '3', title: 'Healthcare Center', icon: communityIcon},
    {id: '4', title: 'Education & Learning', icon: communityIcon},
    {id: '5', title: 'Premium Accommodation', icon: communityIcon},
  ],

  residences: [
    {
      id: '1',
      title: 'Signature Villa #1',
      type: 'Type 02 • 4 bedrooms • 456.75 m²',
      price: 'Starting from ﷼ 10,000,000',
      // badgeTitle: ['DURRAT AL KHAFJI'],
      image: images.homeBg,
    },
    {
      id: '2',
      title: 'Signature Villa #1',
      type: 'Type 02 • 4 bedrooms • 456.75 m²',
      price: 'Starting from ﷼ 10,000,000',
      // badgeTitle: ['DURRAT AL KHAFJI'],
      image: images.homeBg,
    },
    {
      id: '3',
      title: 'Signature Villa #1',
      type: 'Type 02 • 4 bedrooms • 456.75 m²',
      price: 'Starting from ﷼ 10,000,000',
      // badgeTitle: ['DURRAT AL KHAFJI'],
      image: images.homeBg,
    },
  ],
  bannerImages: [
    {id: '1', image: images.community1},
    {id: '2', image: images.community1},
    {id: '3', image: images.community1},
  ],
};

const CommunityZoneDetail = () => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;
  const isRTL = appLanguage === LanguageEnum.AR;
  const navigation = useNavigation();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleShowOnMap = () => {
    // Navigate to map screen
    console.log('Show on map');
  };

  return (
    <>
      <Screen
        preset="fixed"
        style={{backgroundColor: 'transparent'}}
        contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          source={images.homeBg}
          style={{width: '100%', flexGrow: 1}}
          resizeMode="cover">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            nestedScrollEnabled={true}>
            {/* Image Carousel */}
            <View style={styles.bannerContainer}>
              <View
                style={[
                  styles.backButton,
                  isRTL
                    ? {right: 16, left: undefined}
                    : {left: 16, right: undefined},
                ]}>
                <DynamicBlurredIcon
                  onPress={() => navigation.goBack()}
                  blurAmount={12}>
                  <BackIcon
                    style={{
                      transform: [{scaleX: appLanguage === 'ar' ? -1 : 1}],
                    }}
                  />
                </DynamicBlurredIcon>
              </View>
              <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
              />
              <DetailsImageSlider
                data={data}
                isRTL={isRTL}
                appLanguage={appLanguage}
              />
            </View>

            {/* Project Title and Description */}
            <View style={styles.contentContainer}>
              <Text style={[styles.projectTitle, $textAlign(appLanguage)]}>
                {data?.district?.name}
              </Text>
              <View style={[styles.badgeRow, $flexDirection(appLanguage)]}>
                <Badge
                  title="DURRAT AL KHAFJI"
                  appLanguage={appLanguage}
                  textColor="#000"
                  borderColor="rgba(51, 58, 59, 0.4)"
                />
                <Badge
                  title="ANSAM"
                  appLanguage={appLanguage}
                  textColor="#000"
                  borderColor="rgba(51, 58, 59, 0.4)"
                />
              </View>
              <Text
                style={[styles.projectDescription, $textAlign(appLanguage)]}>
                {data?.district?.description}
              </Text>

              {/* Show on Map Button */}
              <View style={styles.mapButtonContainer}>
                <CustomButton
                  title={data?.cta?.showOnMapLabel}
                  variant="outline"
                  size="md"
                  leftIcon={
                    isRTL ? null : (
                      <SvgRenderer
                        src={mapPinIcon}
                        style={{width: 20, height: 20}}
                      />
                    )
                  }
                  rightIcon={
                    isRTL ? (
                      <SvgRenderer
                        src={mapPinIcon}
                        style={{width: 20, height: 20}}
                      />
                    ) : null
                  }
                  onPress={handleShowOnMap}
                  backgroundColor="#fff"
                  textStyle={styles.mapText}
                  // style={styles.mapButton}
                />
              </View>
            </View>

            {/* Communities Section */}
            <View style={styles.communityContainer}>
              <Text
                style={[
                  styles.sectionTitle,
                  $textAlign(appLanguage),
                  {paddingHorizontal: 16},
                  Platform.OS == 'ios' && {paddingTop: 9},
                ]}>
                Key Landmarks
              </Text>
              <NewsList
                data={data?.COMMUNITIES_DATA}
                cardWidth={300}
                showIcon={false}
                rtl={appLanguage === LanguageEnum.AR}
              />
            </View>

            <Separator />

            {/* Explore More Districts Section */}
            <View style={styles.sectionContainer}>
              <View
                style={[
                  styles.sectionHeader,
                  $flexDirection(appLanguage),
                  {paddingHorizontal: 16},
                ]}>
                <Text style={[styles.sectionTitle, $textAlign(appLanguage)]}>
                  Upcoming Events
                </Text>
                <CustomButton
                  title="View all"
                  variant="outline"
                  size="sm"
                  backgroundColor="#fff"
                  textStyle={styles.viewAllButton}
                />
              </View>
              <FlatList
                data={data?.districts}
                renderItem={({item}) => (
                  <EventCard
                    image={item?.image}
                    title="Coffee at the beach"
                    date="Jan - Dec 2026"
                    location="Beach 5"
                    category="Culture & Heritage"
                    isFavourite={false}
                    appLanguage={appLanguage}
                    onPress={() => console.log('Open Event')}
                    onFavouritePress={() => console.log('Toggle Favourite')}
                  />
                )}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.moreDistrictList}
                inverted={isRTL}
                scrollEnabled={true}
                nestedScrollEnabled={true}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </Screen>
    </>
  );
};

export default CommunityZoneDetail;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },
  bannerContainer: {
    height: 260,
    position: 'relative',
  },
  bannerImage: {
    width,
    height: '100%',
    // height: 300,
  },
  logoContainer: {
    height: 56,
    backgroundColor: '#021C3B',
    // paddingVertical: 16,
    alignItems: 'center',
    paddingHorizontal: 16,
    // borderRadius: 2
  },
  logoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F386C',
  },
  logoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Charter',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  wrapperDot: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 50,
    padding: 3,
  },
  activewrapperDot: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 50,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
  },
  activeDot: {
    backgroundColor: '#fff',
    // width: 20,
    borderRadius: 50,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16
  },
   badgeRow: {
    // marginBottom: 20,
    gap: 9,
    justifyContent: 'flex-start',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 36,
    // padding: 8,
    // backgroundColor: 'rgba(0,0,0,0.4)',
    // borderRadius: 20,
    zIndex: 10,
  },
  projectTitle: {
    fontSize: 28,
    fontWeight: '400',
    fontFamily: 'Charter',
    color: '#000',
    lineHeight: 36,
    // marginBottom: 24,
  },
  projectDescription: {
    fontSize: 20,
    lineHeight: 20,
    color: '#000',
    fontFamily: 'Sakkal Majalla',
    paddingVertical: 16
    // marginBottom: 16,
  },
  mapButtonContainer: {
    // alignItems: 'center',
    paddingBottom: 16
  },
  mapText: {
    fontFamily: 'Charter',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.48,
  },
  communityContainer: {
    paddingTop: 16,
    // paddingBottom: 16,
  },
  amenitiesSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 12,
  },
  residenceSection: {
    paddingVertical: 24,
    paddingBottom: 12,
    gap: 16,
  },
  sectionContainer: {
    paddingTop: 32,
    gap: 16,
    marginBottom: 24
    // borderWidth: 1
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Charter',
    color: '#000',
    lineHeight: 17.6,
  },
  viewAllButton: {
    fontSize: 14,
    fontFamily: 'Charter',
    fontWeight: '400',
    // lineHeight: 17,
    // letterSpacing: 0.7
  },
  communityCard: {
    marginHorizontal: 16,
    borderRadius: 2,
    overflow: 'hidden',
  },
  communityImage: {
    width: '100%',
    height: 280,
    justifyContent: 'space-between',
  },
  communityOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  communityLogoContainer: {
    backgroundColor: '#1F386C',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 2,
  },
  communityLogoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Charter',
  },
  communityContent: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  communityTitle: {
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Charter',
    color: '#000',
    marginBottom: 8,
  },
  communityDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333A3B',
    fontFamily: 'Charter',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 16,
    paddingVertical: 16,
    // borderWidth: 1,
    gap: 12,
  },
  amenityIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityText: {
    fontSize: 22,
    fontFamily: 'Sakkal Majalla',
    color: colors.palette.textSecondary,
    fontWeight: '400',
    lineHeight: 22,
  },
  horizontalList: {
    paddingHorizontal: 16,
    gap: 12,
    // paddingVertical: 8,
  },
  moreDistrictList: {
    paddingHorizontal: 16,
    gap: 12,
  },
});
