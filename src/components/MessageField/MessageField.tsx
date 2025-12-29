import { LanguageEnum } from '@appTypes/enums';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import { IState } from '@reducers/index';
import { $flexDirection, $textAlign } from '@theme/view';
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import Separator from '@components/common/Separator';
import CustomInput from '@components/common/CustomInput';
import { useMemo, useState } from 'react';
import { ICustomInputProps } from '@appTypes/type';
import Down from '../../../assets/images/svgs/chevronDown.svg';
import { images } from 'assets/images';
import { delayExecution } from '@utils/helpers';
import { COUNTRY_CODES_NEW } from '@constants/app-contants';
import CustomButton from '@components/common/CustomButton';
import { useDebounce } from '@helpers/index';
import Sheet from '@components/common/sheet';
import RenderCountryPickerScrollView from '@components/common/RenderCountryPickerScrollView';
import { Formik } from 'formik';
import * as Yup from 'yup';

const MessageField = ({data}:any) => {
  const { options } = useSelector((state: IState) => state.startup);
  const { language } = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [sheetLoading, setSheetLoading] = useState<boolean>(false);
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
    phoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(/^[0-9]+$/, 'Only digits allowed')
      .min(7, 'Phone number too short')
      .max(20, 'Max 20 characters allowed'),
    message: Yup.string()
      .required('Subject is required')
      .trim(),
    topic: Yup.string(),
  });

  const handleSubmitForm = async (values: any, { resetForm }: any) => {
    try {
      console.log('API Payload: ', values);
      // Handle submission logic here
      resetForm();
      // alert('Message sent!');
    } catch (error) {
      console.log('Error submitting form:', error);
    }
  };

  const renderLeftElement = () => {
    return (
      <View
        style={[
          $flexDirection(appLanguage),
          { height: '100%', alignItems: 'center' },
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
              style={{ height: 4, width: 7.5 }}
              source={images.downArrow}
              resizeMode="center"
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            paddingLeft: appLanguage === LanguageEnum.EN ? 12 : 0,
            paddingRight: appLanguage === LanguageEnum.AR ? 12 : 0,
            fontSize: 20,
            fontFamily: 'Sakkal Majalla',
            fontWeight: '400',
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
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
        topic: 'General Inquiries',
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
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
            <View style={{ paddingTop: 30, paddingHorizontal: 16, gap: 26, paddingBottom: 37 }}>
              <CustomInput
                label={data?.topicLabel}
                required
                placeholder={'Select the topic'}
                InputLeftElement={
                  appLanguage === LanguageEnum.EN ? null : (
                    <View>
                      <Image
                        style={{ height: 20, width: 20 }}
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
                        style={{ height: 20, width: 20 }}
                        source={images.chevronDown}
                        resizeMode="center"
                      />
                    </View>
                  ) : null
                }
                value={data?.topicOptions}
                isReadOnly={true}
                onChangeText={handleChange('topic')}
                onBlur={handleBlur('topic')}
                error={touched.topic && errors.topic}
                isRegisterInterest={true}
              />
              <Separator />
              <CustomInput
                label={data?.firstNameLabel}
                required
                placeholder={data?.firstNamePlaceholder}
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                error={touched.firstName && errors.firstName}
              />

              <CustomInput
                label={data?.lastNameLabel}
                required
                placeholder={data?.lastNamePlaceholder}
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                error={touched.lastName && errors.lastName}
              />

              <CustomInput
                label={data?.emailLabel}
                required
                placeholder={data?.emailPlaceholder}
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
              />

              <CustomInput
                label={data?.phoneNumberLabel}
                placeholder={data?.phoneNumberPlaceholder}
                InputLeftElement={
                  appLanguage === LanguageEnum.EN ? renderLeftElement() : null
                }
                InputRightElement={
                  appLanguage === LanguageEnum.EN ? null : renderLeftElement()
                }
                value={values.phoneNumber}
                keyboardType={'phone-pad'}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                error={touched.phoneNumber && errors.phoneNumber}
              />

              <CustomInput
                label={data?.subjectLabel}
                required
                placeholder={data?.subjectPlaceholder}
                value={values.message}
                onChangeText={handleChange('message')}
                onBlur={handleBlur('message')}
                error={touched.message && errors.message}
              />
            </View>
            <View style={styles.btn}>
              <CustomButton
                title={data?.submitButtonText}
                size="lg"
                variant='primary'
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </View>

            {RenderCountryPickerSheet}
          </ScrollView>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  txt: {
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'charter',
    fontSize: 20,
    fontWeight: '400',
  },
  input: {
    fontSize: 20,
    fontFamily: 'Sakkal Majalla',
    fontWeight: '400',
    color: 'rgba(38, 44, 44, 0.60)',
    marginHorizontal: 4,
  },
  inputBox: {
    width: '90%',
    height: 48,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 2,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 26,
    backgroundColor: '#fafafa',
    justifyContent: 'space-between',
  },
  down: {
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  titles: {
    marginTop: 16,
    marginHorizontal: 20,
    fontFamily: 'Sakkal Majalla',
    fontSize: 22,
    fontWeight: '400',
  },
  btn: {
    // marginTop:38,
    width: "100%",
    // height: 109,
    backgroundColor: "#FFF",
    // backgroundColor:"pink",
    paddingHorizontal: 16,
    paddingVertical: 16,
  }
});

export default MessageField;
