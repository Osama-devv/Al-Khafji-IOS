import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import ChatLines from '@assets/images/svgs/chat-lines.svg';
import {images} from 'assets/images';
import { $flexDirection } from '@theme/view';
import { LanguageEnum } from '@appTypes/enums';
import NavArrowRight from '@assets/images/svgs/nav-arrow-right.svg';
import { colors } from '@theme/colors';

interface SupportComponentProps {
  appLanguage: LanguageEnum;
  onPress?: () => void;
  title: string;
}

const SupportComponent = ({ appLanguage, onPress, title }: SupportComponentProps) => {
  const isRtl = appLanguage === LanguageEnum.AR;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.container, $flexDirection(appLanguage)]}>
        
        <View style={[styles.leftContent, isRtl && { flexDirection: 'row-reverse' }]}>
          <SvgRenderer
            src={ChatLines}
            style={{ 
              height: 20, 
              width: 20, 
              marginRight: isRtl ? 0 : 8,
              marginLeft: isRtl ? 8 : 0
            }}
          />
          <Text style={styles.txt}>{title}</Text>
        </View>

        <NavArrowRight
            width={20}
            height={20}
            style={[isRtl && { transform: [{ scaleX: -1 }] }, isRtl ? {marginLeft: 2}: {marginRight: 2}]}
          />

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 15,

  },
  txt: {
    fontFamily: 'Charter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 34,
    fontStyle: 'normal',

    color: colors.palette.black,
  },
});

export default SupportComponent;
