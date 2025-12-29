import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import React from 'react';
import {$directionRtl, $flexDirection} from '@theme/view';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import {LanguageEnum} from '@appTypes/enums';
import {colors} from '@theme/colors';
import bellIcon from '@assets/images/svgs/bell.svg';
import homeMap from '@assets/images/svgs/homeMap.svg';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import {
  DISTRICT_DETAIL,
  REGISTER_INTEREST,
  SUCCESSINTEREST,
} from '@navigators/navigation-routes';

interface IHomeBannerProps {
  appLanguage: LanguageEnum;
  data: any; // Hero section and background
}

const HomeBanner = ({appLanguage, data}: IHomeBannerProps) => {
  const navigation = useNavigation();

  return (
    <View>
      {/* HEADER */}
      <View style={[styles.headerContainer, $directionRtl(appLanguage)]}>
        {(data?.heading || data?.description) && (
          <View style={{width: '85%', gap: 16}}>
            {data?.heading && (
              <Text style={styles.headerTitle}>{data?.heading}</Text>
            )}
            {data?.description && (
              <Text style={styles.headerDesc}>{data?.description}</Text>
            )}
          </View>
        )}

        <TouchableOpacity style={styles.headerIcon}>
          <BlurView
            style={styles.blurBg}
            blurType="light"
            blurAmount={12}
            //   overlayColor="transparent"
          />
          <View style={{zIndex: 5}}>
            <SvgRenderer src={bellIcon} style={{width: 20, height: 20}} />
          </View>
        </TouchableOpacity>
      </View>

      {/* HORIZONTAL LIST (STASHED VERSION) */}
      {/* HORIZONTAL LIST */}
      <FlatList
        data={data?.navigationsMenus} // stashed version
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 11,
          paddingHorizontal: 16,
        }}
        keyExtractor={(item, index) => index.toString()}
        inverted={appLanguage === LanguageEnum.AR}
        renderItem={({item}) => {
          const p = item?.properties; // stashed shortcut
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(REGISTER_INTEREST as never)}
              style={[
                styles.card,
                $flexDirection(appLanguage),
                {
                  paddingRight: appLanguage === LanguageEnum.AR ? 4 : 16,
                  paddingLeft: appLanguage === LanguageEnum.AR ? 16 : 4,
                },
              ]}>
              {p?.svg?.src && (
                <View style={[styles.iconBox, {backgroundColor: p?.bg}]}>
                  <SvgRenderer
                    src={p.svg.src}
                    style={{width: 20, height: 20}}
                  />
                </View>
              )}

              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {p?.label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* HERO IMAGE */}
      <View style={{marginTop: 6}}>
        <ImageBackground
          source={{uri: data?.backgroundImage?.src}}
          style={{height: 431, width: '100%'}}
          imageStyle={{
            borderRadius: 2,
            transform:
              appLanguage === LanguageEnum.AR ? [{scaleX: -1}] : [{scaleX: 1}],
          }}>
          <View
            style={[
              styles.imgContainer,
              appLanguage === LanguageEnum.AR && {direction: 'rtl'},
            ]}>
            {/* Heading */}
            {data?.heroSectionHeading && (
              <Text style={styles.titleBanner}>{data?.heroSectionHeading}</Text>
            )}

            {/* Description */}
            {data?.heroSectionDescription && (
              <Text style={styles.desc}>{data?.heroSectionDescription}</Text>
            )}

            {/* CTA */}
            {data?.heroSectionCta && (
              <TouchableOpacity style={styles.outerMap}>
                <View style={styles.mapCard}>
                  <BlurView
                    blurType="light"
                    blurAmount={12}
                  />

                  {data?.heroSectionCta && (
                    <View
                      style={[styles.mapContent, $flexDirection(appLanguage)]}>
                      <SvgRenderer
                        src={homeMap}
                        style={{height: 18, width: 18}}
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: 'Charter',
                          color: '#FFF',
                        }}>
                        {data?.heroSectionCta}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop:48,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'Charter',
    lineHeight: 39,
    width: 259,
  },
  headerDesc: {
    fontSize: 20,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'Sakkal Majalla',
    lineHeight: 24,
    color: colors.textSecondary,
  },
  headerIcon: {
    height: 40,
    width: 40,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(139, 139, 139, 0.50)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  blurBg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 15,
    zIndex: -1,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    paddingVertical: 4,
    borderRadius: 2,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.10)',
    gap: 13,
    width: 220,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.40)',
    padding: 2,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Charter',
    color: colors.textPrimary,
    fontStyle: 'normal',
    lineHeight: 16.8,
    letterSpacing: 0.42,
    maxWidth: 150,
  },
  imgContainer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 26,
    gap: 16,
  },
  titleBanner: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Charter',
  },
  desc: {
    fontSize: 20,
    fontWeight: 400,
    color: '#FFF',
    fontFamily: 'Sakkal Majalla',
    lineHeight: 20,
    opacity:0.7,
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
  mapContent: {
    paddingVertical: 11,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
