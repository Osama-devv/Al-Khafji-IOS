import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IncrementButton} from '../CustomButton/IncrementButton';
import {colors} from '@theme/colors';

// SVG icons
import PlusSvg from '@assets/images/svgs/positiveSign.svg';
import Necessary from '@assets/images/svgs/Necessary.svg'
import MinusSvg from '@assets/images/svgs/negativeSign.svg';
import {$directionRtl, $flexDirection, $textAlign} from '@theme/view';
import {LanguageEnum} from '@appTypes/enums';
import SvgRenderer from '../SvgRenderer/SvgRender';

interface CounterSelectorProps {
  label: string;
  value: number | null;
  onIncrease: () => void;
  onDecrease: () => void;
  appLanguage?: LanguageEnum;
  isRegisterInterest?: boolean;
  desc?: string;
  required?: boolean;
  anyLabel?:string
}

export const CounterSelector: React.FC<CounterSelectorProps> = ({
  label,
  value,
  onIncrease,
  onDecrease,
  appLanguage,
  desc,
  isRegisterInterest = false,
  required = false,
  anyLabel,
}) => {
  return (
    <View
      style={[
        isRegisterInterest ? styles.registerContainer : styles.container,
        $directionRtl(appLanguage),
      ]}>
      <View style={{maxWidth: '50%'}}>
        <View style={[{gap: 2, flexDirection: 'row'}]}>
        <Text style={isRegisterInterest ? styles.registerLabel : styles.label}>
          {label}
        </Text>
          {required ? (
            <SvgRenderer src={Necessary} style={{width: 4, height: 4}} />
          ) : null}
        </View>
        {desc ? <Text style={styles.desc}>{desc}</Text> : null}
      </View>

      <View style={styles.controls}>
        <IncrementButton
          onPress={onDecrease}
          isRegisterInteres={isRegisterInterest}>
          <MinusSvg style={styles.svg} />
        </IncrementButton>
        <View
          style={{
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.valueText}>{value === null ? anyLabel : value}</Text>
        </View>

        <IncrementButton
          onPress={onIncrease}
          isRegisterInteres={isRegisterInterest}>
          <PlusSvg style={styles.svg} />
        </IncrementButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  registerContainer: {
    //  marginTop: 30,
    // marginBottom: 30,
    // paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1
  },
  desc: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Sakkal Majalla',
    color: '#333A3B',
  },
  svg: {
    width: 9,
    height: 9,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Charter',
    color: colors.palette.textPrimary,
    lineHeight: 20.8,
    letterSpacing: 0,
  },
  registerLabel: {
    fontSize: 22,
    fontFamily: 'Sakkal Majalla',
    color: colors.textPrimary,
    lineHeight: 22,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
  },

  valueText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.palette.textPrimary,
    lineHeight: 20,
    fontFamily: 'Charter',
  },
});
