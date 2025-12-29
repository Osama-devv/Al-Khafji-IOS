import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {colors} from '@theme/colors';
import {BlurView} from '@react-native-community/blur';
import FastImage from 'react-native-fast-image';
import {$flexDirection} from '@theme/view';
import {getAppLanguage} from '@i18n/translate';
import Sheet from '../sheet';
import Education from '@components/Education/Education';
import {useSelector} from 'react-redux';
import {IState} from '@reducers/index';
import {LanguageEnum} from '@appTypes/enums';
import Cross from '@assets/images/svgs/cross.svg';
import SvgRenderer from '../SvgRenderer/SvgRender';

const {width} = Dimensions.get('window');

interface FeaturedItem {
  id: string;
  title: string;
  image: any;
  icon: any;
}

interface Props {
  data: any[];
  rtl?: boolean;
}

const FeaturedLists: React.FC<Props> = ({data, rtl = false}) => {
  const orderedData = rtl ? [...data].reverse() : data;

  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;

  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <FlatList
      horizontal
      data={orderedData}
      inverted={rtl}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 20,
        flexDirection: rtl ? 'row-reverse' : 'row',
        gap: 12,
      }}
      renderItem={({item}) => {
        const p = item?.properties;
        return (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setActiveId(item.id)}>
            <ImageBackground source={{uri:p?.backgroundImage?.src}} style={styles.image}>
              {p?.icon?.src && <View
                style={[
                  styles.iconBox,
                  rtl
                    ? {alignSelf: 'flex-end', marginRight: 12}
                    : {alignSelf: 'flex-start', marginLeft: 12},
                ]}>
                <BlurView
                  style={styles.iconBlurBackground}
                  blurType="light"
                  blurAmount={15}
                  reducedTransparencyFallbackColor="rgba(190, 190, 190, 0.3)"
                />
            <SvgRenderer src={p?.icon?.src}/>
              </View>}

              <View style={styles.blurWrapper}>
                <BlurView
                  style={styles.blurBackground}
                  blurType="light"
                  blurAmount={8}
                  overlayColor="transparent"
                />

                <View
                  style={[
                    styles.blurContent,
                    rtl
                      ? {
                          flexDirection: 'row-reverse',
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }
                      : {
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                        },
                  ]}>
                  {p?.title && <Text
                    style={[
                      styles.title,
                      rtl && {textAlign: 'right', width: '100%'},
                    ]}>
                    {p?.title}
                  </Text>}
                </View>
              </View>

              {activeId === item.id && (
                <Sheet
                  show={true}
                  snapPoints={['50%', '60%']}
                  onSheetClosed={() => setActiveId(null)}
                  bgColor="#EFEDE9"
                  sheetHeaderText={'Education'}
                  appLanguage={appLanguage}
                  rightIcon={Cross}
                  rightIconPress={() => setActiveId(null)}>
                  <Education />
                </Sheet>
              )}
            </ImageBackground>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default FeaturedLists;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    marginTop: 15,
  },

  card: {
    height: width * 0.438,
    width: 190,
    borderRadius: 1,
    overflow: 'hidden',
  },

  image: {
    flex: 1,
    justifyContent: 'space-between',
  },

  blurWrapper: {
    height: 40,
    borderRadius: 2,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.20)',
    backgroundColor: '#0000001A',
    marginBottom: -4,
  },

  blurContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
    paddingHorizontal: 8,
    height: '100%',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },

  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },

  iconBox: {
    marginTop: 12,
    marginLeft: 12,
    width: 48,
    height: 48,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 0.3,
    borderColor: colors.palette.white,
  },

  iconBlurBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 2,
    backgroundColor:
      Platform.OS === 'android' ? 'rgba(255,255,255,0.2)' : 'transparent',
  },

  title: {
    fontSize: 18,
    fontFamily: 'Charter',
    textAlign: 'left',
    lineHeight: 23.4,
    color: colors.palette.white,
    paddingBottom: 16,
  },
});
