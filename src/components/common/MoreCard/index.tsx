import {LanguageEnum} from '@appTypes/enums';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import {IState} from '@reducers/index';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {$flexDirection, $textAlign} from '@theme/view';
import {IMoreCardProps} from '@appTypes/type';

const MoreCard = ({
  title,
  subtitle,
  svg,
  fullWidth,
  pattern,
  backgroundColor,
  onPress,
}: IMoreCardProps) => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        fullWidth && styles.fullWidth,
        { backgroundColor },
      ]}>
      
      <View style={[styles.iconContainer, $flexDirection(appLanguage)]}>
        <SvgRenderer src={svg} style={{ height: 24, width: 24 }} />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, $textAlign(appLanguage)]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, $textAlign(appLanguage)]}>
            {subtitle}
          </Text>
        )}
      </View>

      {fullWidth && (
        <Image
          source={pattern}
          style={[
            styles.pattern,
            {
              [appLanguage === LanguageEnum.AR ? 'left' : 'right']: 0,
            },
          ]}
          resizeMode='stretch'
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    // paddingVertical: 12,
    // paddingHorizontal: 14,
    width: '44%',
    height: 110,
    borderRadius: 2,
    // borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  fullWidth: {
    width: '92%',
    alignSelf: 'center',
    marginTop:1
  },
  iconContainer: {
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  textContainer: {
    // flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 14,  
    marginBottom: 12,
    gap: 4
  },
  title: {
    fontSize: 16,
    fontFamily:'Charter',
    lineHeight: 24
  },
  subtitle: {
    fontSize: 22,
    fontFamily:"Sakkal Majalla",
    fontWeight: '400',
    zIndex: 10
    // marginVertical: 4,
  },
  pattern: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '46%',        
    height: '100%',
  },
});

export default MoreCard;

