import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import Language from '@assets/images/svgs/language.svg';
import NavArrowRight from '@assets/images/svgs/nav-arrow-right.svg';
import { $flexDirection } from '@theme/view';
import { LanguageEnum } from '@appTypes/enums';
import { colors } from '@theme/colors';

interface LanguageToggleProps {
  appLanguage: LanguageEnum;
  onPress?: () => void;
  title?: string;
}

const LanguageToggle = ({ appLanguage, onPress, title }: LanguageToggleProps) => {
  const isRtl = appLanguage === LanguageEnum.AR;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.container, $flexDirection(appLanguage)]}>
        
        <View style={[styles.leftContent, isRtl && { flexDirection: 'row-reverse' }]}>
          <SvgRenderer
            src={Language}
            style={{ 
              height: 20, 
              width:20, 
              marginRight: isRtl ? 0 : 8,
              marginLeft: isRtl ? 8 : 0
            }}
          />
          <Text style={styles.txt}>{title}</Text>
        </View>

        <View style={[styles.rightContent, isRtl && { flexDirection: 'row-reverse' }]}>
           <Text style={styles.englishTxt}>{appLanguage === LanguageEnum.EN ? 'English' : 'Arabic'}</Text>
           <NavArrowRight
            width={20}
            height={20}
            style={[isRtl && { transform: [{ scaleX: -1 }]}, isRtl ? {marginLeft: 2}: {marginRight: 2}]}
          />
        </View>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,

  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  txt: {
    fontFamily: 'Charter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 34,
    fontStyle: 'normal',

    color: colors.palette.black,
  },
  englishTxt: {
    fontFamily: 'Charter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontStyle: 'normal',
    color: colors.palette.dullText,
    // marginRight: 8,
  }
});

export default LanguageToggle;
