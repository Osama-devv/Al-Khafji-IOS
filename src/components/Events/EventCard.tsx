import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '@theme/colors';
import HeartIcon from '@assets/images/svgs/eventHeart.svg'; // adjust path
import ClockIcon from '@assets/images/svgs/clock.svg'; // optional
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import { $flexDirection, $textAlign } from '@theme/view';
import { LanguageEnum } from '@appTypes/enums';

interface EventCardProps {
  image: any;
  title: string;
  date: string;
  location: string;
  category: string;
  isFavourite?: boolean;
  onPress?: () => void;
  onFavouritePress?: () => void;
  appLanguage: LanguageEnum
}

const EventCard: React.FC<EventCardProps> = ({
  image,
  title,
  date,
  location,
  category,
  isFavourite = false,
  onPress,
  onFavouritePress,
  appLanguage
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, $flexDirection(appLanguage)]}
      onPress={onPress}>
      {/* Image */}
      <Image source={image} style={styles.image} />

      <View style={[styles.container, $flexDirection(appLanguage)]}>
        {/* Content */}
        <View style={styles.content}>
          <Text style={[styles.title,$textAlign(appLanguage)]} numberOfLines={2}>
            {title}
          </Text>

          <View style={[styles.metaRow, $flexDirection(appLanguage)]}>
            <ClockIcon width={16} height={16} opacity={0.6} />
            <Text style={styles.metaText}>
              {date} | {location}
            </Text>
          </View>

          <Text style={[styles.category, $textAlign(appLanguage)]}>{category}</Text>
        </View>

        {/* Favourite */}
        <TouchableOpacity
          hitSlop={10}
          onPress={onFavouritePress}
          style={styles.heart}>
          <SvgRenderer
          src={HeartIcon}
          style={{width: 18, height: 18}}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 2,
    // padding: 12,
    gap: 19,
    overflow: 'hidden',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    // borderRadius: 2,
    // marginRight: 12,
  },

  content: {
    // flex: 1,
    gap: 4,
  },

  title: {
    fontSize: 16,
    fontFamily: 'Charter',
    fontWeight: '400',
    color: colors.palette.textPrimary,
    lineHeight: 24,
    letterSpacing: 0.16
    // marginBottom: 6,
  },

  metaRow: {
    alignItems: 'center',
    // marginBottom: 6,
    gap: 9,
  },

  metaText: {
    fontSize: 20,
    color: '#333A3B',
    fontFamily: 'Sakkal Majalla',
    fontWeight: '400',
    lineHeight: 20
  },

  category: {
    fontSize: 12,
    fontFamily: 'Charter',
    fontWeight: '400',
    letterSpacing: 0.6,
    color: '#A0805C',
    lineHeight: 14.4,
    textTransform: 'uppercase',
    paddingVertical: 8
  },

  heart: {
    paddingHorizontal: 12
  },
});
