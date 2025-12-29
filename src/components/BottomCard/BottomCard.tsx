import {LanguageEnum} from '@appTypes/enums';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import {IState} from '@reducers/index';
import {$flexDirection} from '@theme/view';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import EventArrow from '../../../assets/images/svgs/eventArrow.svg';
import { IBottomCardProps } from '@appTypes/type';

const BottomCard = ({title, onPress, variant = 'normal', svg, isSelected}: IBottomCardProps) => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      {variant === 'radio' ? (
        <View style={styles.radioCard}>
           <View style={[styles.radioContent, $flexDirection(appLanguage)]}>
              {title && <Text style={styles.radioTitle}>{title}</Text>}
              <View style={[
                styles.radioButton,
                isSelected && styles.radioButtonSelected
              ]}>
                {isSelected && <View style={styles.radioButtonInner} />}
              </View>
           </View>
        </View>
      ) : (
        <View style={styles.card}>
            <View
              style={[
                styles.mainCard,
                $flexDirection(appLanguage),
                {alignItems: 'center'},
              ]}>
              <View style={[$flexDirection(appLanguage), {alignItems: 'center'}]}>
                {svg && (
                  <SvgRenderer
                    src={svg}
                    style={{height: 22, width: 22, marginTop: 2}}
                  />
                )}
                {title && <Text style={styles.title}>{title}</Text>}
              </View>
              <SvgRenderer
                src={EventArrow}
                style={{
                  height: 22,
                  width: 22,
                  transform: [{scaleX: appLanguage === 'ar' ? -1 : 1}],
                }}
              />
            </View>
          </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical:6,
    marginHorizontal: 17,
    backgroundColor: '#F5F5F5',
    width: '90%',
    height: 72,
  },
  mainCard: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'charter',
    fontSize: 18,
    paddingHorizontal: 12,
  },
  radioCard: {
    marginVertical: 6,
    marginHorizontal: 17,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    padding: 16,
  },
  radioContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioTitle: {
    fontFamily: 'Charter',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7F7F7F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#00646E',
    backgroundColor: '#00646E',
  },
  radioButtonInner: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
});

export default BottomCard;
