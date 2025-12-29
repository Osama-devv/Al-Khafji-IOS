import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OtpInput} from 'react-native-otp-entry';
import {Screen} from '@components/common/Screen/Screen';
import {images} from 'assets/images';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import Arrow from 'assets/images/svgs/blackArrow.svg';
import {colors} from '@theme/colors';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '@components/common/CustomButton';
import { HOME, SUCCESSINTEREST } from '@navigators/navigation-routes';
import { $directionRtl } from '@theme/view';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';
import { LanguageEnum } from '@appTypes/enums';

const OtpScreen = () => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;
  const navigation = useNavigation();
  const [otp, setOTP] = useState('');
  const [duration, setDuration] = useState(60); 
  const [startTime, setStartTime] = useState(Date.now());
  const [timer, setTimer] = useState(duration);

  const handleTextChange = (enteredOTP: string) => {
   if (/^[0-9]*$/.test(enteredOTP)) {
     setOTP(enteredOTP);
   } else {
     console.log('Invalid character');
   }
  };

  useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const elapsed = Math.floor((now - startTime) / 1000);
            const remaining = duration - elapsed;
    
            if (remaining > 0) {
                setTimer(remaining);
            } else {
                setTimer(0);
                // setIsResendDisabled(false);
                clearInterval(interval);
            }
        }, 1000);
    
        return () => clearInterval(interval);
    }, [startTime, duration]);


    const handleSubmit = () => {
      console.log("otp length: ", otp.length)
      if(otp.length === 5){
        navigation.reset({
          index: 1,
          routes: [
            {name: HOME as never}, // first screen in stack
            {name: SUCCESSINTEREST as never}, // current screen
          ],
        });

      }
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
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <SvgRenderer src={Arrow} style={{height: 24, width: 24}} />
          </TouchableWithoutFeedback>

          <View style={[styles.headerContainer, $directionRtl(appLanguage)]}>
            <Text style={styles.title}>Phone Verification</Text>
            <Text style={[styles.subTitle, 
            (appLanguage === LanguageEnum.AR && Platform.OS === 'ios') && {
                textAlign: 'left'
              }]}>
              We’ve sent a text message to 'Number' and your 'email'. Please
              enter your code below.
            </Text>
          </View>
          <View style={[styles.otpContainer, $directionRtl(appLanguage)]}>
            <OtpInput
              theme={{
                containerStyle: styles.inputContainer,
                pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: styles.inputStyles,
                placeholderTextStyle: styles.placeholderText,
                focusStickStyle: {backgroundColor: '#000'},
                focusedPinCodeContainerStyle: styles.focusInput,
              }}
              // placeholder="00000"
              numberOfDigits={5}
              type="numeric"
              onTextChange={handleTextChange}
            />
            {timer > 0 ? 
            <Text style={[styles.resendText, 
              (appLanguage === LanguageEnum.AR && Platform.OS === 'ios') && {
                textAlign: 'left'
              }]}>{`Resend code in ${timer} sec`}</Text>
              :
              <TouchableOpacity >
                <Text style={[styles.resendBtn, 
                (appLanguage === LanguageEnum.AR && Platform.OS === 'ios') 
                && {
                textAlign: 'left'
              }]}>
                  Resend code
                </Text>
              </TouchableOpacity>}
          </View>

          <View style={styles.btn}>
            <CustomButton
              title="Verify"
              size="lg"
              variant="primary"
              // disabled={isValid}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </ImageBackground>
    </Screen>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 17,
    flex: 1,
  },
  headerContainer: {
    paddingTop: 75,
    gap: 16,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Charter',
    color: '#000',
    textAlign: 'left',
    lineHeight: 39,
    fontWeight: '400'
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Sakkal Majalla',
    lineHeight: 20,
    color: colors.textSecondary,
  },
  resendText: {
    fontSize: 22,
    fontWeight: '400',
    fontFamily: 'Sakkal Majalla',
    lineHeight: 22,
    color: colors.textSecondary,
  },
  resendBtn: {
    color: colors.palette.primaryColor,
    fontFamily: 'Charter',
    lineHeight: 19,
    letterSpacing: 0.48,
  },
  otpContainer: {
    paddingHorizontal: 8,
    gap: 12,
  },
  inputContainer: {
    marginTop: 40,
    // justifyContent: 'space-between',
    // paddingHorizontal: 20,
    // paddingVertical: 40,
    gap: 16,
    // width: '50%'
    // width: '100%',
  },
  inputStyles: {
    // borderBottomWidth: 1,
    // borderWidth: 1,
    // borderColor: '#ffffff',
    // borderRadius: 4,
    // backgroundColor: '#333333',
    color: '#000',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Charter',
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 31,
  },
  pinCodeContainer: {
    // height: 72,
    // paddingHorizontal: 16,
    // paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.40)',
    backgroundColor: 'rgba(255, 255, 255, 0.40)',
  },
  placeholderText: {
    color: colors.placeholder,
    textAlign: 'center',
    fontFamily: 'Charter',
    fontSize: 28,
    lineHeight: 31,
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
  focusInput: {
    borderWidth: 0.5,
    borderColor: colors.palette.primaryColor
  }
});
