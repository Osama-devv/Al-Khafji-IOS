import React from 'react';
import {
  FlatList,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowIcon from '../../../assets/images/svgs/arrow.svg';
import {$flexDirection, $textAlign} from '@theme/view';
import {LanguageEnum} from '@appTypes/enums';
import {useSelector} from 'react-redux';
import {IState} from '@reducers/index';
import {images} from 'assets/images';
import CustomButton from '@components/common/CustomButton';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import {useNavigation} from '@react-navigation/native';
import {RESIDENCE_SCREEN} from '@navigators/navigation-routes';
import {BlurView} from '@react-native-community/blur';
import Subtract from '../../../assets/images/svgs/Subtract.svg';
import {IsValidArray} from '@utils/helpers';

type ResidenceCard = {
  id: string;
  title: string;
  desc: string;
  price: string;
};

type ResidenceProps = {
  residences: ResidenceCard[]; // Accept array of residences
};

const Residence = ({data}: any) => {
  const {options} = useSelector((state: IState) => state.startup);
  const navigation = useNavigation();
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;

  const handleNavigate = () => {
    navigation.navigate(data.slug as never);
  };
  return (
    <View>
      <View style={[styles.container, $flexDirection(appLanguage)]}>
        {data?.title && <Text style={styles.txt}>{data.title}</Text>}
        <CustomButton
          title={data.cta}
          variant="outline"
          size="sm"
          backgroundColor="#f5f4f1"
          onPress={handleNavigate}
        />
      </View>
      {IsValidArray(data?.featuredResidences) && (
        <FlatList
          data={data.featuredResidences}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          inverted={appLanguage === LanguageEnum.AR}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 8,
            paddingTop: 24,
          }}
          renderItem={({item}) => {
            const p = item?.properties;
            return (
              <ImageBackground
                source={{uri: p?.largeImage?.src}}
                style={styles.residence}
                imageStyle={{
                  borderRadius: 2,
                  transform:
                    appLanguage === LanguageEnum.AR
                      ? [{scaleX: -1}]
                      : [{scaleX: 1}],
                }}>
                <ImageBackground
                  source={images.shadow}
                  style={{height: '100%', width: '100%'}}
                  imageStyle={{borderRadius: 2}}>
                  <View style={styles.container1}>
                    <View
                      style={[
                        styles.imgContent,
                        {borderRadius: 10},
                        $flexDirection(appLanguage),
                      ]}>
                      <View>
                        {p.heading &&
                          <Text style={[styles.title, $textAlign(appLanguage)]}>
                          {p.heading}
                        </Text>}
                        {(p?.startsFromLabel || p?.price) &&
                          <View
                          style={[
                            styles.txtprice,
                            $flexDirection(appLanguage),
                          ]}>
                          {<Text style={[styles.desc, $textAlign(appLanguage)]}>
                            {p?.startsFromLabel}
                          </Text>}
                          <View style={styles.currency}>
                            <SvgRenderer
                              src={Subtract}
                              style={{height: 16, width: 16}}
                            />
                          </View>
                          <Text style={[styles.desc, $textAlign(appLanguage)]}>
                            {p?.price}
                          </Text>
                        </View>}
                      </View>

                      <TouchableOpacity style={styles.outerIcon}>
                        <View style={styles.icon}>
                          <BlurView
                            style={styles.blurLayer}
                            blurType="light"
                            blurAmount={12}
                          />

                          <SvgRenderer
                            src={ArrowIcon}
                            style={{
                              width: 5,
                              height: 10,
                              transform:
                                appLanguage === LanguageEnum.AR
                                  ? [{scaleX: -1}]
                                  : [{scaleX: 1}],
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              </ImageBackground>
            );
          }}
        />
      )}
    </View>
  );
};

export default Residence;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    fontFamily: 'Charter',
    fontSize: 18,
    fontWeight: '400',
  },
  residence: {
    height: 300,
    width: 248,
    // marginRight: 16,
  },
  container1: {
    marginTop: 'auto',
    position: 'relative',
    overflow: 'hidden',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  imgContent: {
    // backgroundColor: 'rgba(0,0,0,0.20)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Charter',
    // fontWeight: '700',
    // fontWeight: 'bold',
    fontSize: 20,
    // paddingTop: 5,
  },
  txtprice: {
    paddingVertical: 5,
  },
  currency: {
    paddingTop: 2,
    paddingLeft: 6,
    paddingRight: 4,
  },
  desc: {
    color: '#FFFFFF',
    fontSize: 14,
    // paddingTop: 8,
    fontFamily: 'Charter',
    fontWeight: '400',
  },
  outerIcon: {
    marginTop: Platform.OS === 'android' ? 20 : 16,
    padding: 3,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    // width: 42,
    // marginTop: 8
  },
  icon: {
    height: 30,
    width: 30,
    borderRadius: 2,
    overflow: 'hidden',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(37, 150, 190)',
    // backgroundColor: 'rgba(0,0,0,0.25)', // dark glass effect
  },

  blurLayer: {
    ...StyleSheet.absoluteFillObject,
    // borderRadius: 8,
    // Inner border effect
    // borderWidth: 1,
    // borderColor: 'rgba(255,255,255,0.15)',
  },
});
