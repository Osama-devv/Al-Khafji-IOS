import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '@components/common/CustomButton';
import {$flexDirection, $textAlign} from '@theme/view';
import Badge from '@components/common/Badge';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import {LanguageEnum} from '@appTypes/enums';
import Clock from '@assets/images/svgs/clock.svg';
import {formatDate, IsValidArray} from '@utils/helpers';
import { images } from 'assets/images';

interface ILatestUpdatesProps {
  title?: string,
  appLanguage: LanguageEnum,
  data: any
}

const LatestUpdates = ({
  title,
  appLanguage,
  data
}: ILatestUpdatesProps) => {
  return (
    <View style={styles.main}>
      <View style={[styles.container, $flexDirection(appLanguage)]}>
        {data?.title && <Text style={styles.txt}>{data?.title}</Text>}
        {data?.cta && (
          <CustomButton
            title={data?.cta}
            variant="outline"
            size="sm"
            backgroundColor="#f5f4f1"
          />
        )}
      </View>

      {/* Updates FlatList (Dynamic) */}
      {IsValidArray(data?.mediaCentres) && (
        <View style={styles.imageContainer}>
          <FlatList
            data={data?.mediaCentres} // <<--- USING DATA FROM PROPS
            horizontal
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 8, paddingHorizontal: 16}}
            inverted={appLanguage === LanguageEnum.AR}
            renderItem={({item}) => {
              const p = item?.properties;
              return (
                <View>
                  {/* Image */}
                  <ImageBackground
                    // source={{uri: p?.thumbnailImage?.src}}
                    source={images.newsItem1}
                    style={styles.smartCity}
                    imageStyle={{
                      borderTopLeftRadius:2,
                      borderTopRightRadius:2,
                      transform:
                        appLanguage === LanguageEnum.AR
                          ? [{scaleX: -1}]
                          : [{scaleX: 1}],
                    }}>
                    {p?.mediaCentreCategory?.properties?.displayText && (
                      <View
                        style={[styles.imgtxt, $flexDirection(appLanguage)]}>
                        <Badge
                          title={
                            p?.mediaCentreCategory?.properties?.displayText
                          }
                          appLanguage={appLanguage}
                        />
                      </View>
                    )}
                  </ImageBackground>

                  {/* Text */}
                  <View style={styles.container1}>
                    {p?.heading && (
                      <Text 
                      numberOfLines={2}
                      style={[styles.titleExp, $textAlign(appLanguage)]}>
                        {p?.heading}
                      </Text>
                    )}

                    <View style={[styles.svgTxt, $flexDirection(appLanguage)]}>
                      <SvgRenderer
                        src={Clock}
                        style={{height: 18, width: 18}}
                      />
                      <Text style={styles.date}>{formatDate(p?.date)}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default LatestUpdates;

const styles = StyleSheet.create({
  main: {
    marginBottom: 12,
  },
  container: {
    marginTop: 24,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgtxt: {
    marginVertical: 20,
    marginHorizontal: 12,
  },
  imgtxt1: {
    fontSize: 14,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.40)',
    height: 32,
    width: 114,
    color: 'white',
    fontWeight: 700,
    textAlign: 'center',
    paddingVertical: 4,
  },
  txt: {
    fontFamily: 'Charter',
    fontSize: 18,
    fontWeight: '400',
  },
  imageContainer: {
    marginVertical: 16,
    // marginHorizontal:8,
  },
  smartCity: {
    width: 325,
    height: 172,
    // marginHorizontal: 12,
  },
  container1: {
    // marginHorizontal: 12,
    backgroundColor: '#f8f9fa',
    width: 325,
    // height: 108,
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 12,
    borderBottomRightRadius:2,
    borderBottomLeftRadius:2,
  },
  titleExp: {
    fontSize: 18,
    // fontWeight: 700,
    fontFamily: 'Charter',
    lineHeight: 23,
  },
  svgTxt: {
    // paddingVertical: 14,
    alignItems: 'center',
  },
  date: {
    paddingHorizontal: 9,
    fontWeight: 400,
    fontFamily: 'Sakkal Majalla',
    fontSize: 22,
    color: '#333A3B',
  },
});
