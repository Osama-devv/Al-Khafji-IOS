import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GuestBadge from '@components/GuestBadge';
import AutoSlider from '@components/common/AutoSlider';
import ColorFilledButton from '@components/common/ColorFilledButton';
import { colors } from '@theme/colors';
import { images } from 'assets/images';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';
import { LanguageEnum } from '@appTypes/enums';
import { $textAlign } from '@theme/view';
const { width } = Dimensions.get('window');

const GuestComponent = ({data} : any) => {
    const { options } = useSelector((state: IState) => state.startup);
  const { language } = options;
  const appLanguage = language ?? LanguageEnum.AR;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri:data?.backgroundImage?.src}}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.badgeContainer}>
             <GuestBadge guestLabel={data?.guestModeTag} isRTL={appLanguage === LanguageEnum.AR} />
            </View>
            <View>
            {data?.title && <View style={styles.centerContent}>
              <Text style={[styles.title, $textAlign(appLanguage)]}>
                {data?.title}
              </Text>
            </View>}

              <View style={[styles.sliderContainer,]}>
              <AutoSlider DATA={data?.features} rtl={appLanguage === LanguageEnum.AR} />
            </View>

              {data?.cta && <View style={styles.buttonContainer}>
                <ColorFilledButton
                  title={data?.cta}
                  onPress={() => {
                    console.log('Navigate to Auth');
                  }}
                  backgroundColor={colors.palette.primaryColor}
                  titleColor={colors.palette.white}

                />
              </View>}
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: colors.palette.secondaryColor,
  },
  backgroundImage: {
    width: '100%',
    height: 361,
  },
  imageStyle: {
    borderRadius: 2,
  },
  gradient: {
    flex: 1,
    // padding: 16, 
    justifyContent: 'space-between',
  },
  content: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  badgeContainer: {
    marginTop: 17,
    marginHorizontal: 12,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 12
  },
  title: {
    color: colors.palette.white,
    fontSize: 28,
    fontWeight: '400',
    fontStyle: "normal",
    fontFamily: 'Charter',
    lineHeight: 36.5,
  },
  sliderContainer: {
    marginTop: 24,
  },
  buttonContainer: {
    paddingTop: 24,
    marginHorizontal: 12,
    marginBottom: 24
  },
});

export default GuestComponent;
