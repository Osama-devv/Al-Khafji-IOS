import React, {useMemo, useState} from 'react';
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomInput from '@components/common/CustomInput';
import {Screen} from '@components/common/Screen/Screen';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import {images} from 'assets/images';
import {colors} from '@theme/colors';
import Arrow from 'assets/images/svgs/blackArrow.svg';
import {$flexDirection} from '@theme/view';
import {delayExecution, IsValidArray} from '@utils/helpers';
import {COUNTRY_CODES_NEW} from '@constants/app-contants';
import {useSelector} from 'react-redux';
import {IState} from '@reducers/index';
import {LanguageEnum} from '@appTypes/enums';
import {CounterSelector} from '@components/common/CounterSelector';
import CustomTextArea from '@components/common/CustomTextArea';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomButton from '@components/common/CustomButton';
import RenderCountryPickerScrollView from '@components/common/RenderCountryPickerScrollView';
import {useDebounce} from '@helpers/index';
import Sheet from '@components/common/sheet';
import {OTP_SCREEN} from '@navigators/navigation-routes';
import {useRegisterInterestQuery} from '@services/register-interest/registerInterestApi';

const RegisterInterest = () => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;
  const navigation = useNavigation();

  const [charLimit] = useState(300); // Set the character limit (matches validation)
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [sheetLoading, setSheetLoading] = useState<boolean>(false);
  const [currentCharCount, setCurrentCharCount] = useState(charLimit);
  // const [fieldValue, setFieldValue] = useState();
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    COUNTRY_CODES_NEW && COUNTRY_CODES_NEW.length > 0
      ? COUNTRY_CODES_NEW[0]
      : null,
  );
  const [countryCodesNew, setCountryCodesNew] = useState(
    COUNTRY_CODES_NEW && COUNTRY_CODES_NEW.length > 0 ? COUNTRY_CODES_NEW : [],
  );
  const [filteredCountryList, setFilteredCountryList] =
    useState(countryCodesNew);
  const isFocused = useIsFocused();
  let {data} = useRegisterInterestQuery(undefined, {skip: !isFocused});
  const components = data?.data?.components;
  const formData =
    IsValidArray(components) &&
    components?.find((item: any) => item.alias === 'mobileRegisterInterest')
      ?.properties;
  console.log('components', formData);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
      .trim()
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
        'Invalid email format',
      ),
    propertyType: Yup.string().required('Property Type is required'),
    phoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(/^[0-9]+$/, 'Only digits allowed')
      .min(7, 'Phone number too short')
      .max(20, 'Max 20 characters allowed'),
    message: Yup.string().trim(),
    // bedrooms: Yup.number()
    //   .nullable()
    //   .required('Bedrooms is required')
    //   .min(1, 'Bedrooms must be at least 1'),
  });

  const handleSubmitForm = async (values: any, {resetForm}: any) => {
    try {
      console.log('API Payload: ', values);

      navigation.navigate(OTP_SCREEN as never);
      resetForm();
      //   alert('Form submitted!');
    } catch (error) {
      console.log('Error submitting form:', error);
    }
  };

  //   const increaseBedrooms = (setFieldValue: any) => {
  //   setBedrooms(prev => {
  //     const updated = prev === null ? 1 : prev + 1;
  //     setFieldValue("bedrooms", updated);
  //     return updated;
  //   });
  // };

  // const decreaseBedrooms = (setFieldValue: any) => {
  //   setBedrooms(prev => {
  //     let updated = prev === null ? null : prev === 1 ? null : prev - 1;
  //     setFieldValue("bedrooms", updated);
  //     return updated;
  //   });
  // };
  const renderLeftElement = () => {
    return (
      <View
        style={[
          $flexDirection(appLanguage),
          {height: '100%', alignItems: 'center'},
        ]}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setIsVisible(true);
            setSheetLoading(true);
            delayExecution(() => {
              setSheetLoading(false);
            }, 1500);
          }}>
          <View
            style={[
              $flexDirection(appLanguage),
              {
                alignItems: 'center',
                gap: 8,
                paddingRight: appLanguage === LanguageEnum.EN ? 16 : 0,
                paddingLeft: appLanguage === LanguageEnum.AR ? 16 : 0,
                borderRightWidth: appLanguage === LanguageEnum.EN ? 1 : 0,
                borderLeftWidth: appLanguage === LanguageEnum.AR ? 1 : 0,
                borderColor: '#dcdcdc',
                height: '100%',
              },
            ]}>
            <Image
              source={selectedCountryCode?.flag}
              resizeMode={'cover'}
              style={{
                height: 20,
                width: 30,
              }}
            />
            <Image
              style={{height: 8, width: 8}}
              source={images.downArrow}
              resizeMode="center"
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            paddingLeft: appLanguage === LanguageEnum.EN ? 12 : 0,
            paddingRight: appLanguage === LanguageEnum.AR ? 12 : 0,
            fontSize: 22,
            fontFamily: 'Sakkal Majalla',
            fontWeight: '400',
            // paddingTop: 3,
          }}>
          {`+${selectedCountryCode?.callingCode}`}
        </Text>
      </View>
    );
  };

  const isCountryPickerVisible = useDebounce(isVisible, 150);
  const RenderCountryPickerSheet = useMemo(() => {
    return (
      <Sheet
        show={isCountryPickerVisible}
        snapPoints={['90%', '95%']}
        onSheetClosed={() => {
          setIsVisible(false);
          // searchHandler('');
        }}
        onSheetOpened={() => setIsVisible(true)}
        centerHeader={true}
        sheetHeaderText={'Countries'}>
        {/* {sheetLoading ? <Loader type={'inner'} color={'black'} /> : null} */}
        {/* {sheetLoading ? null : RenderCountryPickerSearch} */}
        {/* {sheetLoading ? null : ( */}
        <RenderCountryPickerScrollView
          setSheetLoading={setSheetLoading}
          filteredCountryList={filteredCountryList}
          setSelectedCountryCode={setSelectedCountryCode}
          setIsVisible={setIsVisible}
          appLanguage={appLanguage}
        />
        {/* )} */}
      </Sheet>
    );
  }, [
    // RenderCountryPickerSearch,
    appLanguage,
    filteredCountryList,
    // searchHandler,
    sheetLoading,
    isCountryPickerVisible,
  ]);

  return (
    <Screen preset="fixed" safeAreaEdges={['bottom', 'top']}>
      <ImageBackground
        source={images.homeBg}
        style={{width: '100%', flexGrow: 1}}
        resizeMode="cover">
        {/* FORM */}
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            propertyType: 'Signature Villa',
            message: '',
            bedrooms: null,
          }}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={handleSubmitForm}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            setFieldValue,
            isSubmitting,
          }) => (
            <>
              <ScrollView contentContainerStyle={{paddingBottom: 100}}>
                <View style={styles.container}>
                  {/* Header */}
                  <View style={styles.headerContainer}>
                    <TouchableWithoutFeedback
                      onPress={() => navigation.goBack()}>
                      <SvgRenderer
                        src={Arrow}
                        style={{height: 24, width: 24}}
                      />
                    </TouchableWithoutFeedback>
                    {formData?.title && (
                      <Text style={styles.title}>{formData?.title}</Text>
                    )}
                    {formData?.description && (
                      <Text style={styles.subTitle}>
                        {formData?.description}
                      </Text>
                    )}
                  </View>

                  <View style={{gap: 24, marginTop: 32}}>
                    {/* First Name */}
                    <CustomInput
                      label={formData?.firstNameLabel}
                      required
                      placeholder={formData?.firstNamePlaceholder}
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      error={touched.firstName && errors.firstName}
                      isRegisterInterest={true}
                    />

                    {/* Last Name */}
                    <CustomInput
                      label={formData?.lastNameLabel}
                      required
                      placeholder={formData?.lastNamePlaceholder}
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      error={touched.lastName && errors.lastName}
                      isRegisterInterest={true}
                    />

                    {/* Email */}
                    <CustomInput
                      label={formData?.emailLabel}
                      required
                      placeholder={formData?.emailPlaceholder}
                      keyboardType="email-address"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      error={touched.email && errors.email}
                      isRegisterInterest={true}
                    />

                    <CustomInput
                      label={formData?.mobileLabel}
                      required
                      placeholder={formData?.mobilePlaceholder}
                      InputLeftElement={
                        appLanguage === LanguageEnum.EN
                          ? renderLeftElement()
                          : null
                      }
                      InputRightElement={
                        appLanguage === LanguageEnum.EN
                          ? null
                          : renderLeftElement()
                      }
                      value={values.phoneNumber}
                      keyboardType={'phone-pad'}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      error={touched.phoneNumber && errors.phoneNumber}
                      isRegisterInterest={true}
                    />

                    <CustomInput
                      label={formData?.propertyTypeLabel}
                      required
                      placeholder={'Select the property'}
                      InputLeftElement={
                        appLanguage === LanguageEnum.EN ? null : (
                          <View>
                            <Image
                              style={{height: 20, width: 20}}
                              source={images.chevronDown}
                              resizeMode="center"
                            />
                          </View>
                        )
                      }
                      InputRightElement={
                        appLanguage === LanguageEnum.EN ? (
                          <View>
                            <Image
                              style={{height: 20, width: 20}}
                              source={images.chevronDown}
                              resizeMode="center"
                            />
                          </View>
                        ) : null
                      }
                      value={values.propertyType}
                      isReadOnly={true}
                      onChangeText={handleChange('propertyType')}
                      onBlur={handleBlur('propertyType')}
                      error={touched.propertyType && errors.propertyType}
                      isRegisterInterest={true}
                    />

                    <CounterSelector
                      label={formData?.bedRoomLabel}
                      required
                      value={values.bedrooms} // <-- safe
                      onIncrease={() => {
                        const current = values.bedrooms ?? 0;
                        setFieldValue('bedrooms', current + 1);
                      }}
                      onDecrease={() => {
                        const current = values.bedrooms ?? 0;
                        setFieldValue(
                          'bedrooms',
                          current > 1 ? current - 1 : null,
                        );
                      }}
                      appLanguage={appLanguage}
                      isRegisterInterest={true}
                      desc={formData?.bedRoomPlaceholder}
                      anyLabel={formData?.anyLabel}
                      // error={touched.bedrooms && errors.bedrooms}
                    />

                    {/* Subject */}
                    <View style={{gap: 8}}>
                      <CustomTextArea
                        headerPlacholder={formData?.commentsLabel}
                        placeholder={formData?.commentsPlaceholder}
                        value={values.message}
                        onChangeText={text => {
                          setFieldValue('message', text);
                          setCurrentCharCount(charLimit - text.length);
                        }}
                        multiline
                        numberOfLines={4}
                        maxLimit={charLimit}
                        isInvalid={!!(touched.message && errors.message)}
                        errorMessage={
                          touched.message ? errors.message : undefined
                        }
                      />
                      <Text
                        style={[
                          styles.charCount,
                          appLanguage === LanguageEnum.EN
                            ? {textAlign: 'right'}
                            : {textAlign: 'left'},
                        ]}>
                        {`${values.message.length}/${charLimit}`}
                      </Text>
                    </View>

                    {/* Submit Button */}
                    {/* <CustomButton
                  title="Submit"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                /> */}
                  </View>
                </View>
              </ScrollView>
              <View style={styles.btn}>
                <CustomButton
                  title={formData?.submitButtonText}
                  size="lg"
                  variant="primary"
                  disabled={!isValid}
                  onPress={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>

        {RenderCountryPickerSheet}
      </ImageBackground>
    </Screen>
  );
};

export default RegisterInterest;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 17,
    paddingBottom: 28,
  },
  headerContainer: {
    gap: 16,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Charter',
    color: '#000',
    textAlign: 'left',
    lineHeight: 39,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Sakkal Majalla',
    lineHeight: 20,
    color: colors.textSecondary,
  },
  charCount: {
    fontSize: 22,
    fontFamily: 'Sakkal Majalla',
    fontWeight: '400',
    color: '#333A3B',
    lineHeight: 22,
  },
  btn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    //   height: 109,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
  },
});
