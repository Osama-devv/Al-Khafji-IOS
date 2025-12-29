import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {Screen} from '@components/common/Screen/Screen';
import {images} from 'assets/images';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import TickCircle from '@assets/images/svgs/tickCircle.svg';
import {colors} from '@theme/colors';
import CustomButton from '@components/common/CustomButton';
import { CommonActions, useNavigation } from '@react-navigation/native';

const SuccessInterest = () => {
  const navigation = useNavigation();
  const handleNavigation = ()=> {
    navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'BottomTabs', params: { screen: 'Home' } }],
          })
        );
  }
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={['bottom', 'top']}
      contentContainerStyle={{flexGrow: 1}}>
      <ImageBackground
        source={images.homeBg}
        style={{width: '100%', flexGrow: 1}}
        resizeMode="cover">
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.imageContainer}>
              <SvgRenderer
                src={TickCircle}
                style={{height: 53.293, width: 53.293}}
              />
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.title}>
                Thank you for registering interest!
              </Text>
              <Text
                style={
                  styles.subTitle
                }>{`We've received your message and\n will contact you soon.`}</Text>
            </View>
          </View>

          <View style={styles.btn}>
            <CustomButton
              title="Back to Home"
              size="lg"
              variant="primary"
              // disabled={isValid}
              onPress={handleNavigation}
            />
          </View>
        </View>
      </ImageBackground>
    </Screen>
  );
};

export default SuccessInterest;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 17,
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    paddingTop: 74,
    marginHorizontal: 9,
  },
  imageContainer: {
    width: 93.262,
    height: 93.262,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(0, 100, 110, 0.12);',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Charter',
    color: '#000',
    textAlign: 'center',
    lineHeight: 36,
    fontWeight: '400',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Sakkal Majalla',
    lineHeight: 20,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  textWrapper: {
    gap: 16,
  },
  btn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    // borderTopWidth: 1,
    // borderColor: '#E5E5E5',
  },
});
