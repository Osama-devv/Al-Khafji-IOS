import {LanguageEnum} from '@appTypes/enums';
import CustomButton from '@components/common/CustomButton';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import {IState} from '@reducers/index';
import {$alignItems, $flexDirection, $textAlign} from '@theme/view';
import {images} from 'assets/images';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import infoCircle from '../../../assets/images/svgs/infoCircle.svg';
import bgCard from '../../../assets/images/svgs/bgCard.svg';
import { useNavigation } from '@react-navigation/native';

const Destination = ({data}: any) => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
    const navigation = useNavigation();
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;
  const handleNavigate = () => {
    navigation.navigate(data?.slug as never);
  };

  const DATA = [
    {
      id: '1',
      title1: 'LEARN MORE',
      title2: 'About Al Khafji Project',
      image: images?.discover,
    },
    {
      id: '2',
      title1: 'LEARN MORE',
      title2: 'Project Information',
      image: images?.discover,
    },
    {
      id: '3',
      title1: 'EXPLORE',
      title2: 'Saudi Aramco Details',
      image: images?.discover,
    },
    {
      id: '4',
      title1: 'EXPLORE',
      title2: 'Saudi Aramco Details',
      image: images?.discover,
    },
    {
      id: '5',
      title1: 'EXPLORE',
      title2: 'Saudi Aramco Details',
      image: images?.discover,
    },
    {
      id: '6',
      title1: 'EXPLORE',
      title2: 'Saudi Aramco Details',
      image: images?.discover,
    },
  ];

  return (
    <View>
      <View style={[styles.container, $flexDirection(appLanguage)]}>
        {data?.title && <Text style={styles.txt}>{data?.title}</Text>}
        {data?.cta && (
          <CustomButton
            title={data?.cta}
            variant="outline"
            size="sm"
            backgroundColor="#f5f4f1"
            onPress={handleNavigate}
          />
        )}
      </View>
      <FlatList
        data={data?.cards}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        inverted={false}
        contentContainerStyle={{
          paddingBottom: 20,
          gap: 10,
          paddingHorizontal: 16,
          flexDirection:
            appLanguage === LanguageEnum.AR ? 'row-reverse' : 'row', // RTL support
        }}
        renderItem={({item, index}) => {
          const p = item?.properties;
          return (
            <View style={styles.img} key={index}>
              <ImageBackground
                source={{uri: p?.image?.src}}
                style={{
                  width: '100%',
                  height: '100%',
                  // backgroundColor: 'pink',
                  // overflow: 'hidden',
                }}
                imageStyle={{
                  borderRadius: 2,
                  transform:
                    appLanguage === LanguageEnum.AR ? [{scaleX: -1}] : [],
                }}>
                <SvgRenderer
                  src={bgCard}
                  style={{
                    width:  Platform.OS === 'android' ? '100%' : '100%', 
                    height: Platform.OS === 'android' ? '100%' : '100%',
                    borderRadius: 2,
                    zIndex: 0,
                    transform:
                      appLanguage === LanguageEnum.AR ? [{scaleX: -1}] : [],
                  }}
                />
                <View
                  style={[
                    {
                      flexDirection: 'column',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: 'space-between',
                      paddingVertical: 18,
                      paddingHorizontal: 18,
                      paddingBottom: 15,
                    },
                    $alignItems(appLanguage),
                  ]}>
                  {p?.svg?.src && (
                    <View style={styles.icon}>
                      <SvgRenderer
                        src={p?.svg?.src}
                        style={{
                          height: 20,
                          width: 20,
                          transform:
                            appLanguage === LanguageEnum.AR
                              ? [{scaleX: -1}]
                              : [],
                        }}
                      />
                    </View>
                  )}

                  <View style={styles.content}>
                    {p?.title && (
                      <Text style={[styles.cont1, $textAlign(appLanguage)]}>
                        {p?.title}
                      </Text>
                    )}
                    {p?.description && (
                      <Text style={[styles.cont2, $textAlign(appLanguage)]}>
                        {p?.description}
                      </Text>
                    )}
                  </View>
                </View>
              </ImageBackground>
            </View>
          );
        }}
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
    height: 52,
  },
  txt: {
    fontFamily: 'Charter',
    fontSize: 18,
    fontWeight: '400',
  },
  img: {
    marginTop: 12,
    marginBottom: 62,
    width: 258,
    height: 146,
    borderRadius: 2,
    overflow: 'hidden',
  },
  svgOverlay: {
    height: 146,
    width: 258,
  },
  icon: {
    // paddingVertical: 18,
    // paddingHorizontal: 18,
  },
  content: {
    // paddingVertical: 26,
    // paddingHorizontal: 18,
    // gap: 4,
  },
  cont1: {
    fontFamily: 'Sakkal Majalla',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16,
    textTransform: 'uppercase'
  },
  cont2: {
    // paddingTop:4,
    fontFamily: 'Charter',
    fontSize: 18,
  },
});

export default Destination;
