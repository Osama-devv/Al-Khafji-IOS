import {Platform, StyleSheet, Text, View} from 'react-native';
import SvgRenderer from '../common/SvgRenderer/SvgRender';
import {IExperienceProps} from '@appTypes/type';
import {useSelector} from 'react-redux';
import {IState} from '@reducers/index';
import {LanguageEnum} from '@appTypes/enums';
import {$alignItems, $flexDirection, $textAlign} from '@theme/view';

const Card = ({svg, title, backgroundColor}: IExperienceProps) => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;

  return (
    <View style={styles.container}>
      <View style={[styles.inner, $flexDirection(appLanguage)]}>
        <View
          style={[
            styles.svgRenderer,
            {backgroundColor: backgroundColor},
            // $alignItems(appLanguage),
          ]}>
          {svg && <View style={styles.iconBox}>
            <SvgRenderer src={svg} style={{height: 22, width: 26}} />
          </View>}
        </View>
      </View>

      {title && <Text style={[styles.title, $textAlign(appLanguage)]}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Platform.OS === 'ios' ? 176 : '48%',
    minHeight: 122,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 12,
    
  },
  inner: {
    flex: 1,
  },
  svgRenderer: {
    // marginTop: 16,
    // marginHorizontal: 12,
    // paddingTop: 14,
    // paddingHorizontal: 11,
    height: 48,
    width: 48,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.40)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 'auto',
    fontSize: 16,
    // fontWeight: 700,
    fontFamily: 'Charter',
    lineHeight: 19,
    letterSpacing: 0.32,
    // marginVertical: 24,
    // marginHorizontal: 12,
  },
});

export default Card;
