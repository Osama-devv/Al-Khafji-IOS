import {LanguageEnum} from '@appTypes/enums';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import {IState} from '@reducers/index';
import {$flexDirection, $textAlign} from '@theme/view';
import {images} from 'assets/images';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextComponent,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import Logo from '../../../assets/images/svgs/Logo.svg';
import Arrow from '../../../assets/images/svgs/arrow.svg';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { ABOUT_SCREEN } from '@navigators/navigation-routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParams } from '@navigators/app-stack-params';
import { IImageTitleWithTooltip } from '@services/more/types';

const MoreBanner = ({data, navBarTitle }:any ) => {
  type NavProps = NativeStackNavigationProp<AppStackParams>;
  
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const navigation = useNavigation<NavProps>();
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;
  return (
    <View>
      <View style={[styles.container, $flexDirection(appLanguage)]}>
        {navBarTitle && <Text style={styles.txt}>{navBarTitle}</Text>}
      </View>
      <View style={styles.wrapper}>
        <ImageBackground
          source={{uri:data?.backgroundImage?.src}}
          style={styles.shadow}
          resizeMode='cover'
          imageStyle={{
            borderRadius: 2,
            transform:
              appLanguage === LanguageEnum.AR ? [{scaleX: -1}] : [{scaleX: 1}],
          }}>
            <View style={{
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              height: '100%',
              paddingHorizontal: 14,
              paddingVertical: 14
              }}>
          <View style={[styles.logo, $flexDirection(appLanguage)]}>
            <SvgRenderer src={Logo} style={{width: 62, height: 35}} />
          </View>
          <View style={[$flexDirection(appLanguage), {justifyContent: 'space-between', alignItems: 'center'}]}>
            <View style={styles.textContent}>
              {data?.title && <Text style={[styles.title, $textAlign(appLanguage)]}>
                {data?.title}
              </Text>}
              {data?.tooltipText && <Text style={[styles.desc, $textAlign(appLanguage)]}>
                {data?.tooltipText}
              </Text>}
            </View>
           <TouchableOpacity
              // style={styles.Arrow}
              onPress={() => navigation.navigate(ABOUT_SCREEN)}
            >
              <Image
              source={images.arrow}
              style={{
                  height: 40,
                  width: 40,
                  transform:
                    appLanguage === LanguageEnum.AR
                      ? [{scaleX: -1}]
                      : [{scaleX: 1}],
                }}
              />
            </TouchableOpacity>
          </View>
            </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    marginBottom: -8,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    fontSize: 24,
    fontFamily:'Charter'
  },
  wrapper: {
    paddingHorizontal: 16,
    marginVertical: 16,
    alignItems: 'center',
    // borderWidth: 1,
    height: 156
  },
  shadow: {
    width: '100%',
    height: '100%',
    // borderWidth: 1
    // height: 156,
  },
  logo: {
    // paddingVertical: 32,
    // paddingHorizontal: 14,
  },
  title: {
    fontSize: 18,
    fontFamily:"Charter",
    color: '#FFF',
  },
  desc: {
    fontSize: 22,
    fontFamily:"Sakkal Majalla",
    fontWeight: '400',
    color: '#FFF',
  },
  textContent: {
    // paddingHorizontal: 14,
  },
  Arrow: {
    // marginHorizontal: 14,
    // marginVertical: 2,
    // marginHorizontal: 35,
    // marginVertical: 9,
    width: 40,
    height: 40,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.20)',
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MoreBanner;
