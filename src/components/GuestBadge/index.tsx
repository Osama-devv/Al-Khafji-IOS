import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { BlurView } from '@react-native-community/blur';

interface GuestBadgeProps {
  isRTL?: boolean;
  guestLabel? : string
}

const GuestBadge = ({ guestLabel,  isRTL = false }: GuestBadgeProps) => {
  return (
    <View style={[styles.blurWrapper, isRTL && styles.containerRTL]}>
      <BlurView
        style={styles.blurBackground}
        blurType="light"
        blurAmount={16}
        overlayColor="solid"
      />

      {guestLabel &&  <View style={styles.blurContent}>
        <Text style={[styles.text, isRTL && styles.textRTL]}>{guestLabel}</Text>
      </View>}
    </View>
  );
};

export default GuestBadge;

const styles = StyleSheet.create({
  blurWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 2,
    borderWidth: 0.8,
    borderColor: 'rgb(125,128,122)',
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
    alignSelf: 'flex-start',
    overflow: 'hidden',         
    position: 'relative',
  },

  containerRTL: {
    alignSelf: 'flex-end',
  },

  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },

  blurContent: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: colors.palette.white,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontFamily: 'Charter',
  },

  textRTL: {
    textAlign: 'right',
  },
});
