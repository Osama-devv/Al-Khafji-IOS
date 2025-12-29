import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  ImageBackground,
} from 'react-native';
import TransparentHeader from '@components/common/Header/transparentHeader';
import { images } from 'assets/images';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import Clock from '@assets/images/svgs/clock.svg';

import Badge from '@components/common/Badge';
import LatestUpdates from '@components/LatestUpdates';
import { LanguageEnum } from '@appTypes/enums';
import { $textAlign, $flexDirection, $directionRtl } from '@theme/view';

import BackIcon from '@assets/images/svgs/backIcon.svg';
import DownloadIcon from "@assets/images/svgs/download.svg";
import { Screen } from '@components/common/Screen/Screen';
import Separator from '@components/common/Separator';
import { colors } from '@theme/colors';
import DynamicBlurredIcon from '@components/DynamicBlurredIcon';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';

const { width } = Dimensions.get('window');

const ArticleDetail = () => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;
  const navigation = useNavigation();

  // Mock Data for Similar Articles
  const similarArticles = [
    {
      id: '1',
      title: 'Smart Cities: The Future of Urban Living',
      date: '15 Oct 2025',
      image: images.smartcity,
    },
    {
      id: '2',
      title: 'Revitalizing the Coast: The New Waterfront',
      date: '12 Oct 2025',
      image: images.outdoor,
    },
  ];

  return (
    <Screen preset="fixed" contentContainerStyle={{ flexGrow: 1 }}>
      {/* Absolute Header Overlay */}
      <ImageBackground
        source={images.residenceBg}
        // style={styles.imageWrapper}
        resizeMode="cover"
      >

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
        >
          {/* Hero Image */}
          <View style={styles.imageWrapper}>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
              <View
                style={[
                  styles.topControls,
                ]}
              >

                <View style={[styles.rightControls, $flexDirection(appLanguage)]}>
                  <DynamicBlurredIcon onPress={() => navigation.goBack()}>
                    <BackIcon width={5} height={10} stroke="#fff" />
                  </DynamicBlurredIcon>
                  <DynamicBlurredIcon onPress={() => { }}>
                    <DownloadIcon width={20} height={20} stroke="#fff" />
                  </DynamicBlurredIcon>
                </View>
              </View>
              <TransparentHeader
                title=""
                showBackButton={false}
              />
            </View>
            <Image source={images.smartcity} style={styles.heroImage} resizeMode="cover" />
            <View style={styles.heroOverlay} />
          </View>

          <View style={styles.headerContainer}>
            {/* Article Header */}
            <Text style={[styles.articleTitle, $textAlign(appLanguage)]}>
              Sustainable Living: Eco-
              {'\n'}Friendly Trends in Urban
              {'\n'}Development
            </Text>

            <View style={[styles.metaRow, $flexDirection(appLanguage)]}>
              <View style={[styles.svgTxt, $flexDirection(appLanguage)]}>
                <SvgRenderer
                  src={Clock}
                  style={{ height: 18, width: 18 }}
                />
                <Text style={styles.date}>15 Oct 2025</Text>
              </View>
            </View>

            <View style={[styles.badgeRow, $flexDirection(appLanguage)]}>
              <Badge title="PRESS RELEASE" appLanguage={appLanguage} textColor="#000" 
              borderColor="rgba(51, 58, 59, 0.4)" />
            </View>


          </View>
          <Separator />
          <View style={styles.contentContainer}>
            {/* Body Text */}
            <Text style={[styles.bodyText, $textAlign(appLanguage)]}>
              Nested on the northeastern edge of the Kingdom of Saudi Arabia, directly adjacent to the Saudi—Kuwaiti border. Al Khafji holds a unique position. Once a frontier town in the former Saudi—Kuwaiti Neutral Zone, it is now emerging as both a cross-border investment hub and a test-bed for sustainable living in desert coastal regions.
            </Text>

            <Text style={[styles.bodyText, $textAlign(appLanguage)]}>
              In this article we explore three key facets: its strategic location and growth potential, recent sustainability-driven initiatives, and how developers and residents can tap into the region's evolving real-estate and lifestyle narrative.
            </Text>

            {/* Quote Block */}
            <View style={[styles.quoteContainer, $flexDirection(appLanguage)]}>
              <View style={styles.quoteBar} />
              <View style={[styles.quoteContent, $directionRtl(appLanguage)]}>
                <Text style={styles.quoteText}>
                  "Today, your role isn't just about construction, it is about connecting people to their environment. None of us can live in a vacuum. We create communities not just buildings."
                </Text>
                <Text style={styles.quoteAuthor}>Ahmed Abdullah Al-Saad</Text>
              </View>
            </View>

            <Text style={[styles.bodyText, $textAlign(appLanguage)]}>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
            </Text>

            {/* Subheader */}
            <Text style={[styles.subHeader, $textAlign(appLanguage)]}>Strategic Location & Growth Potential</Text>

            <Text style={[styles.bodyText ,$textAlign(appLanguage)]}>
              Al Khafji lies just south of the Saudi—Kuwait border on the Persian/Arabian Gulf coast, a region historically anchored in oil and gas, but now poised for diversification.
            </Text>
            <Text style={[styles.bodyText, $textAlign(appLanguage)]}>
              The city's oil-field legacy continues, but modern development agendas are broadening the narrative: real estate, cross-border trade, coastal living, and new infrastructure.
            </Text>

            {/* Inline Image */}
            <View style={styles.inlineImageContainer}>
              <Image source={images.smartcity} style={styles.inlineImage} resizeMode="cover" />
            </View>

            {/* Investment Section */}
            <Text style={[styles.subHeader, $textAlign(appLanguage)]}>Investment & Real Estate Angle</Text>
            <Text style={[styles.bodyText, $textAlign(appLanguage)]}>
              Analysts identify Al Khafji as an emerging investment hub thanks to:
            </Text>

            <View style={styles.listContainer}>
              <View style={[styles.listItem, $flexDirection(appLanguage)]}>
                <View style={styles.bullet} />
                <Text style={[styles.bodyText, $textAlign(appLanguage)]}>Its border-gateway status between Saudi Arabia and Kuwait.</Text>
              </View>
              <View style={[styles.listItem, $flexDirection(appLanguage)]}>
                <View style={styles.bullet} />
                <Text style={[styles.bodyText, $textAlign(appLanguage)]}>Undersupplied grade-A office and residential inventory in the broader Eastern Province region.</Text>
              </View>
              <View style={[styles.listItem, $flexDirection(appLanguage)]}>
                <View style={styles.bullet} />
                <Text style={[styles.bodyText, $textAlign(appLanguage)]}>Government-driven frameworks for development and infrastructure in line with Saudi Vision 2030 and the broader drive for balanced regional growth.</Text>
              </View>
            </View>

            {/* Key Takeaways */}
            <Text style={[styles.subHeader, $textAlign(appLanguage)]}>Key Takeaways</Text>
            <Text style={[styles.bodyText,$textAlign(appLanguage)]}>
              For residential development, Al Khafji offers a first-mover advantage in a small-but-agile border city with unique positioning, including coastal living, border access, and evolving infrastructure. This creates a "new wave" market narrative that developers can leverage.
            </Text>
            <View style={{ paddingTop: 8 }}>
              <Separator />
            </View>
          </View>

          {/* Similar Articles */}
          <LatestUpdates
            title='Explore Similar Articles'
            appLanguage={appLanguage}
            data={similarArticles}
          />
        </ScrollView>
      </ImageBackground>
    </Screen>
  );
};

export default ArticleDetail;

const styles = StyleSheet.create({
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageWrapper: {
    width: '100%',
    height: 287,
    position: 'relative',
  },
  topControls: {
    position: "absolute",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS == 'ios' ? 55 : 40,
    zIndex: 20,
  },

  rightControls: {
    justifyContent: 'space-between',
    gap: 10,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)', // Slight overlay for header visibility
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 16,
    // marginTop: 24,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 8,
    gap: 16,
    // marginTop: 24,
  },
  articleTitle: {
    fontFamily: 'Charter', // Serif font as seen in screenshot
    fontSize: 28,
    fontWeight: '400',
    color: '#000',
    lineHeight: 34,
  },
  metaRow: {
    alignItems: 'center',
  },
  svgTxt: {
    // paddingVertical: 14,
    alignItems: 'center',
  },
  date: {
    paddingHorizontal: 9,
    fontWeight: 400,
    fontFamily: 'Sakkal Majalla',
    fontSize: 22,
    color: '#333A3B',
  },
  dateText: {
    fontFamily: 'Sakkal Majalla', // Or similar sans/serif
    fontSize: 14,
    color: '#666',
  },
  badgeRow: {
    // marginBottom: 20,
    justifyContent: 'flex-start',
  },
  separator: {
    height: 1,
    backgroundColor: '#D1D1D1',
    // marginBottom: 20,
    width: 100, // Partial separator or full? Screenshot shows line below badge? Wait, verify image.
    // Image shows a line below title? No. Below date? No.
    // Actually, maybe just spacing.
  },
  bodyText: {
    fontFamily: 'Sakkal Majalla', // Using serif for body to match "book" feel
    fontSize: 24,
    lineHeight: 24,
    color: colors.textSecondary,
    fontWeight: '400',
    // marginBottom: 16,
  },
  quoteContainer: {
    marginVertical: 8,
    backgroundColor: '#F0EFE9', // Light beige bg for quote
    borderRadius: 4,
    overflow: 'hidden',
    gap: 16,
  },
  quoteBar: {
    width: 2,
    backgroundColor: '#00646E', // Greenish accent color
  },
  quoteContent: {
    padding: 16,
    gap: 24,
    flex: 1,
  },
  quoteText: {
    fontFamily: 'Sakkal Majalla',
    fontSize: 22,
    color: '#000',
    lineHeight: 22,
  },
  quoteAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  subHeader: {
    fontFamily: 'Charter',
    fontSize: 20,
    fontWeight: '400',
    color: '#000',
    lineHeight: 26,
    marginVertical: 8
    // marginTop: 16,
    // marginBottom: 12,
  },
  inlineImageContainer: {
    marginVertical: 8,
    borderRadius: 2,
    overflow: 'hidden',
  },
  inlineImage: {
    width: '100%',
    height: 209,
  },
  listContainer: {
    marginBottom: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  listItem: {
    // marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#333',
    marginTop: 10,
    marginRight: 10,
  },
});