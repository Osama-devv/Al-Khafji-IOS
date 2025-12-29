import {LanguageEnum} from '@appTypes/enums';
import {IState} from '@reducers/index';
import {$flexDirection} from '@theme/view';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import MoreCard from '../common/MoreCard';
import {images} from 'assets/images';
import Calculator from '../../../assets/images/svgs/moreCalculator.svg';
import GetInTouch from '@assets/images/svgs/chatLines.svg'
import itenary from '@assets/images/svgs/itenary.svg';
import {useState} from 'react';
import Sheet from '@components/common/sheet';
import ContactField from '@components/ContactField/ContactField';
import Cross from '@assets/images/svgs/cross.svg'

const ToolandAssistance = (onPress: any) => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;

  return (
    <View>
      <View style={[styles.container, $flexDirection(appLanguage)]}>
        <Text style={styles.txt}>Tools & Assistance</Text>
      </View>
      <View
        style={[
          $flexDirection(appLanguage),
          {gap: 10, justifyContent: 'center'},
        ]}>
        <MoreCard
          title={'Mortage Calculator'}
          svg={Calculator}
          backgroundColor="#F9F8F6"
        />
        <MoreCard
          title={'Itinerary Builder'}
          svg={itenary}
          backgroundColor="#F9F8F6"
        />
      </View>
      <MoreCard
        title="Get in Touch"
        subtitle="Connect with us through chat"
        svg={GetInTouch}
        fullWidth={true}
        backgroundColor="#B2CCD1"
        pattern={images.pattern}
        onPress={() => onPress()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    fontSize: 18,
    fontFamily:'Charter'
  },
});

export default ToolandAssistance;
