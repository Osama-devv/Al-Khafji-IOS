import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import ImageLoader from '@components/common/Image-loader';
import { BlurView } from '@react-native-community/blur';
import FastImage from 'react-native-fast-image';
import { images } from 'assets/images';
import { $alignLeftRight, $flexDirection, $textAlign } from '@theme/view';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';
import { LanguageEnum } from '@appTypes/enums';
import Badge from '@components/common/Badge';
import { colors } from '@theme/colors';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import Clock from '@assets/images/svgs/clock.svg';
import rightArrow from '@assets/images/svgs/rightArrow.svg';

type CardProps = {
  title: string;
  type?: string;
  desc?: string;
  price?: string;
  badgeTitle?: Array<string> | undefined;
  width?: number;
  isDistrictDetails?: boolean;
  arrowButton?: boolean;
  isFavourite?: boolean;
  date?: string;
  isNewsroom?: boolean;
  onPress?: () => void;
};


const Card = ({ title, desc, type, price, badgeTitle, width, date, isNewsroom = false,
  isDistrictDetails = false, onPress,
  arrowButton = true,
  isFavourite = true }: CardProps) => {
  const { options } = useSelector((state: IState) => state.startup);
  const { language } = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;

  return (
    <View style={[styles.cardContainer, { width: width ? width : '100%' }]}>
      {/* Top image */}
      <ImageLoader
        style={{
          width: '100%',
          height: 236,
          borderRadius: 2,
        }}
      //   appLanguage={appLanguage}
      //   imageUrl={data?.data?.smallImageUrl}
      />

      {/* Overlay location tags */}
      <View style={[styles.locationContainer, $flexDirection(appLanguage),
      badgeTitle && badgeTitle?.length > 0 ? { justifyContent: 'space-between' } : { justifyContent: 'flex-end' },
      ]}>
        {badgeTitle && badgeTitle?.length > 0
          ? <View style={{ flexDirection: 'row', gap: 8 }}>
            {badgeTitle?.map((value: any, index: number) => (
              <Badge
                key={index}
                title={value}
                icon={images?.district}
                appLanguage={appLanguage}
              />
            ))}
          </View> : null}
        {isFavourite ? <View style={styles.heartContainer}>
          <BlurView
            style={styles.blurBackground}
            blurType="light"
            blurAmount={8}
            overlayColor="transparent"
          />
          <View style={{ paddingHorizontal: 1.67, paddingVertical: 2.5 }}>
            <Image
              style={{ height: 15, width: 16.667 }}
              source={images.heartIcon}
              resizeMode="contain"
            />
          </View>
        </View>
          : null
        }
      </View>

      {/* Bottom content */}
      <TouchableOpacity
        onPress={onPress}
        style={[styles.content,
        $flexDirection(appLanguage),
        isDistrictDetails && { paddingHorizontal: 0 },
        { justifyContent: isNewsroom ? 'center' : 'space-between' }
        ]}>
        <View style={{ gap: 6 }}>
          {title ? <Text style={[styles.title, $textAlign(appLanguage)]}>
            {/* Signature Villa #1 */}
            {title}
          </Text> : null}
          {desc ? <Text numberOfLines={2} style={[styles.desc, $textAlign(appLanguage)]}>
            {/* Type 02 • 4 bedrooms • 456.75 m² */}
            {desc}
          </Text> : null}
          {type ? <Text style={[styles.subtitle, $textAlign(appLanguage)]}>
            {/* Type 02 • 4 bedrooms • 456.75 m² */}
            {type}
          </Text> : null}
          {price ? <Text style={[styles.price, $textAlign(appLanguage)]}>
            {/* From 1,000,000 SAR */}
            {price}
          </Text> : null}
          {date ? <View style={[styles.svgTxt, $flexDirection(appLanguage)]}>
            <SvgRenderer
              src={Clock}
              style={{ height: 18, width: 18 }}
            />
            <Text style={styles.date}>{date}</Text>
          </View> : null}
        </View>
        {arrowButton ?
          <SvgRenderer src={rightArrow}
            style={{ height: 10, width: 10, marginTop: isNewsroom ? 21 : 12 }}
          />
          : null}
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    overflow: 'hidden',
    // height: 332,
    width: '100%',
    borderRadius: 2,
  },
  locationContainer: {
    position: 'absolute',
    top: 12,
    // left: 12,
    paddingHorizontal: 16,
    gap: 8,
    width: '100%',
  },
  locationBadge: {
    backgroundColor: 'rgba(60, 50, 40, 0.7)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  blurView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0.5,
    height: 28,
    paddingHorizontal: 8
  },
  locationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  blurWrapper: {
    height: 28,
    borderRadius: 6,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },

  blurContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 8,
    height: '100%',
  },
  content: {
    // alignItems: 'center',
    // width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Charter',
  },
  desc: {
    fontSize: 22,
    color: colors.textSecondary,
    fontWeight: '400',
    fontFamily: 'Sakkal Majalla',
    lineHeight: 22
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
  subtitle: {
    fontSize: 22,
    color: '#333A3B',
    fontWeight: '400',
    fontFamily: 'Sakkal Majalla',
  },
  price: {
    fontSize: 16,
    color: '#000',
    // fontWeight: '700',
    fontFamily: 'Charter',
  },
  heartContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.20)',
    backgroundColor: '#0000001A'
  },
});
