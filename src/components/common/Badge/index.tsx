import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { images } from 'assets/images'
import { $flexDirection } from '@theme/view'
import { BlurView } from '@react-native-community/blur'
import { IBadgeProps } from '@appTypes/type'

const Badge = ({ title, icon, appLanguage, textColor, borderColor }: IBadgeProps) => {
  return (
    <View style={[styles.blurWrapper, borderColor && {
          borderColor: borderColor
        }]}>
      <BlurView
        style={styles.blurBackground}
        blurType='light'
        blurAmount={8}
        overlayColor="rgba(0,0,0,0.05)"
      />

      <View style={[styles.blurContent, $flexDirection(appLanguage)]}>
        {icon ? <FastImage
          style={{ height: 16, width: 16 }}
          source={icon}
          resizeMode="cover"
        /> : null}
        <Text style={[styles.locationText, textColor && { color: textColor }]}>{title}</Text>
      </View>
    </View>
  )
}

export default Badge

const styles = StyleSheet.create({
  blurWrapper: {
    height: 28,
    borderRadius: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },

  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },

  blurContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 8,
    height: '100%',
    position: 'relative',
    zIndex: 1,           // 🔥 content on top, no blur
  },

  locationText: {
    color: 'white',
    fontSize: 12,
    // fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Charter',
    textTransform: 'uppercase',
  },
});