import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../common/CustomButton';
import {$flexDirection, $textAlign} from '@theme/view';
import {useSelector} from 'react-redux';
import {IState} from '@reducers/index';
import {LanguageEnum} from '@appTypes/enums';
import {images} from 'assets/images';
import {BlurView} from '@react-native-community/blur';
import SvgRender from '../common/SvgRenderer/SvgRender';
import EventArrow from '../../../assets/images/svgs/eventArrow.svg';
import Clock from '../../../assets/images/svgs/clock.svg';
import homeMap from '../../../assets/images/svgs/homeMap.svg';
import LinearGradient from 'react-native-linear-gradient';

import Card from './Card';
import Badge from '@components/common/Badge';
import Separator from '@components/common/Separator';
import {IsValidArray} from '@utils/helpers';

// type EventProps = {
//   cards: {
//     image: any;
//     title: string;
//     date: string;
//     desc: string;
//   }[];
// };

const Event = ({data}: any) => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;
  const featruedEvent = data?.featuredEvent?.properties;
  let tags: any = {
    popular: '',
    free: '',
  };

  const handleTags = () => {
    featruedEvent?.tag.forEach((item: any) => {
      const key = item?.properties?.key;
      const value = item?.properties?.displ1ayText ?? ''; 
      if (key) {
        tags[key] = value;
      }
    });
  };

  handleTags();
  return (
    <View style={{marginBottom: 12}}>
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
    <View style={styles.textContainer}>
        <ImageBackground
          source={{uri: featruedEvent?.thumbnailImage?.src}}
          style={styles.event}
          imageStyle={{
            borderTopRightRadius: 2,
            borderTopLeftRadius: 2,
            transform:
              appLanguage === LanguageEnum.AR ? [{scaleX: -1}] : [{scaleX: 1}],
          }}>
          <View
            style={[
              $flexDirection(appLanguage),
              {
                marginTop: 16,
                justifyContent: 'space-between',
                marginHorizontal: 12,
              },
            ]}>
            <View
              style={[
                styles.imgtxt,
                $flexDirection(appLanguage),
                {
                  flexWrap: 'wrap',
                },
                // {
                //   paddingLeft: appLanguage === 'en' ? 12 : 0,
                //   paddingRight: appLanguage === 'en' ? 0 : 12,
                // },
              ]}>
              {tags?.popular && <Badge title={tags?.popular} appLanguage={appLanguage} />}

              {featruedEvent?.eventCategory?.properties?.displayText && (
                <Badge
                  title={featruedEvent?.eventCategory?.properties?.displayText}
                  appLanguage={appLanguage}
                />
              )}
            </View>
            <TouchableOpacity>
              <Image
                source={images?.heartBlur}
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={[styles.content, $flexDirection(appLanguage)]}>
          {featruedEvent?.heading && <Text style={styles.contenttxt}>{featruedEvent?.heading}</Text>}
          <TouchableOpacity style={styles.contentIcon}>
            <SvgRender
              src={EventArrow}
              style={{
                height: 20,
                width: 20,
                transform: 
                  appLanguage === LanguageEnum.AR
                    ? [{scaleX: -1}]
                    : [{scaleX: 1}],
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.content1,
            $flexDirection(appLanguage),
            {alignItems: 'center'},
          ]}>
          <SvgRender
            src={Clock}
            style={{height: 16, width: 16, marginEnd: 9}}
          />

          {featruedEvent?.dateInfo && (
            <Text
              style={[
                styles.contenttxt1,
                $textAlign(appLanguage),
                {marginEnd: 4},
              ]}>
              {featruedEvent?.dateInfo}
            </Text>
          )}

          <Image
            source={images.line}
            style={{width: 1, height: 14, marginHorizontal: 4}}
          />

          {featruedEvent?.locationInfo && (
            <Text
              style={[
                styles.contenttxt1,
                $textAlign(appLanguage),
                {marginEnd: 1},
              ]}>
              {featruedEvent?.locationInfo}
            </Text>
          )}

          <Image
            source={images.line}
            style={{width: 1, height: 14, marginHorizontal: 4}}
          />

          {tags?.free && <Text style={[styles.contenttxt1, $textAlign(appLanguage)]}>
            {tags?.free}
          </Text>}
        </View>
      </View>
      <View style={{paddingTop: 12, marginHorizontal: 16}}>
        {/* <Separator /> */}
        {IsValidArray(data?.events) &&
          data?.events?.map((item: any, index: number) => {
            const it = item?.properties;
            return (
              <React.Fragment key={index}>
                <Card
                  image={it?.thumbnailImage?.src}
                  title={it?.heading}
                  date={it?.dateInfo}
                  desc={it?.locationInfo}
                />
                {/* {index < cards.length - 1 && <Separator />} */}
              </React.Fragment>
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 32,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // covers entire image
  },
  txt: {
    fontFamily: 'Charter',
    fontSize: 18,
    fontWeight: '400',
  },
  textContainer: {
    backgroundColor: 'rgba(252, 251, 251, 0.60)',
    marginTop:20,
    marginHorizontal: 16,
    borderRadius:2,
  },
  event: {
    width: '100%',
    height: 169,
  },
  imgtxt: {
    // flexDirection: 'row',
    // paddingTop: 20,
    // paddingStart: 12,
    gap: 8,
    width: '80%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    // paddingRight: 8,
    marginHorizontal: 12,
  },
  contenttxt: {
    fontSize: 18,
    fontFamily: 'Charter',
  },
  contentIcon: {
    // backgroundColor: 'white',
    height: 34,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  content1: {
    paddingTop: 11,
    paddingBottom:16,
    paddingHorizontal: 12,
  },
  contenttxt1: {
    paddingHorizontal: 3,
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Sakkal Majalla',
    color: '#000',
  },
  imgContainer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 26,
    gap: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    // fontWeight: 700,
    fontFamily: 'Charter',
  },
  desc: {
    // marginTop: 16,
    fontSize: 20,
    fontWeight: 400,
    color: 'white',
    fontFamily: 'Sakkal Majalla',
    // marginVertical: 16,
    lineHeight: 20,
  },
  outerMap: {
    padding: 3,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(139, 139, 139, 0.50)',
    alignSelf: 'flex-start',
  },

  mapCard: {
    borderRadius: 2,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.30)',
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
  },

  blurLayer: {
    ...StyleSheet.absoluteFillObject,
  },

  mapContent: {
    paddingVertical: 11,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});

export default Event;
