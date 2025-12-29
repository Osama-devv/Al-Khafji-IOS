import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import {Screen} from '@components/common/Screen/Screen';
import {colors} from '@theme/colors';
import {useSelector, useDispatch} from 'react-redux';
import {IState} from '@reducers/index';
import GuestComponent from '@components/GuestComponent';
import Separator from '@components/common/Separator';
import SupportComponent from '@components/common/SupportComponent';
import BottomCard from '@components/BottomCard/BottomCard';
import Sheet from '@components/common/sheet';
import Cross from '@assets/images/svgs/cross.svg';

import {LanguageEnum} from '@appTypes/enums';

import {emptySplitApi} from '@services/emptySplitApi';
import {SERVICE_TAGS} from '@constants/index';
import {delayExecution, IsValidArray} from '@utils/helpers';
import {changeLanguage} from '@i18n/translate';
import {setStartupOptions} from '@reducers/startup/startup-slice';
import Splash from '@screens/splash';
import LanguageToggle from '@components/common/LanguageToggle.tsx';
import {BlurView} from '@react-native-community/blur';
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import ProfileSettingItem from '@components/common/SettingsItems';
import SettingItem from '@components/common/SettingsItems';
import {$textAlign} from '@theme/view';
import {images} from 'assets/images';
import {useProfileQuery} from '@services/profile/profileApi';
import ContactField from '@components/ContactField/ContactField';
import MessageField from '@components/MessageField/MessageField';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {options} = useSelector((state: IState) => state.startup);
  const {language, isLanguageProcessing} = options;
  const appLanguage = language ?? LanguageEnum.AR;

  const isFocused = useIsFocused();
  let {data} = useProfileQuery(undefined, {skip: !isFocused});
  const components = data?.data?.components;
  const navbarTitle = data?.data?.navBarTitle;

  const profileBanner = IsValidArray(components)
    ? components.find((item: any) => item.alias === 'guestModeSignInWidget')
        ?.properties
    : undefined;

  const bottomSheetData = IsValidArray(components)
    ? components.find(
        (item: any) => item.alias === 'headingWithImageBlockWithPicker',
      )?.properties
    : undefined;
  type SheetType = 'none' | 'language' | 'support';
  const [activeSheet, setActiveSheet] = useState<SheetType>('none');
  const [showMessageField, setShowMessageField] = useState(false);

  const handleLoading = () => {
    delayExecution(() => {
      dispatch(setStartupOptions({isLanguageProcessing: false}));
    }, 1500);
  };

  const languageToggle = (langCode: LanguageEnum) => {
    if (langCode === appLanguage) {
      setActiveSheet('none');
      return;
    }
    dispatch(emptySplitApi.util?.resetApiState());
    dispatch(emptySplitApi.util.invalidateTags(SERVICE_TAGS));
    handleLoading();
    dispatch(
      setStartupOptions({
        language: langCode,
        isLanguageProcessing: true,
      }),
    );
    changeLanguage(langCode);
  };

  if (isLanguageProcessing) return <Splash />;

  // Extract Get in Touch links
  const getInTouchLinks =
    bottomSheetData?.cardBlocks?.find(
      (item: any) => item.alias === 'labelWithSvgDescriptionWithCta',
    )?.properties?.mobileGetInTouchPopup?.[0]?.properties?.links || [];
  const sendMessageHeading = bottomSheetData?.cardBlocks
    ?.find((item: any) => item.alias === 'labelWithSvgDescriptionWithCta')
    ?.properties?.mobileGetInTouchPopup?.[0]?.properties?.links?.find(
      (x: any) => x.alias === 'mobileGetInTouchFormPopup',
    )?.properties?.label;

  const getInTouchHeading = bottomSheetData?.cardBlocks?.find(
    (item: any) => item.alias === 'labelWithSvgDescriptionWithCta',
  )?.properties?.label;
  const cardBlocks = bottomSheetData?.cardBlocks || [];

  // Separate them by alias
  const labelWithRepeatableStrings = cardBlocks.find(
    (block: any) => block.alias === 'labelWithRepeatableStrings',
  );

  const labelWithSvgDescriptionWithCta = cardBlocks.find(
    (block: any) => block.alias === 'labelWithSvgDescriptionWithCta',
  );

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Screen
        preset="fixed"
        safeAreaEdges={['bottom']}
        style={{backgroundColor: 'transparent'}}
        StatusBarProps={{
          translucent: true,
          backgroundColor: 'transparent',
        }}
        backgroundColor="transparent">
        <ImageBackground
          source={images.homeBg}
          style={styles.textureBackground}
          resizeMode="cover">
          {activeSheet !== 'none' && (
            <BlurView
              style={styles.blurBackground}
              blurType="light"
              blurAmount={1}
              reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.43)"
            />
          )}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {navbarTitle && (
              <View style={styles.header}>
                <Text style={[styles.text, $textAlign(appLanguage)]}>
                  {navbarTitle}
                </Text>
              </View>
            )}

            <Separator />

            <GuestComponent data={profileBanner} />

            {bottomSheetData?.heading && (
              <Text style={[styles.supportText, $textAlign(appLanguage)]}>
                {/* Settings */}
                {bottomSheetData?.heading}
              </Text>
            )}

            <SettingItem
              type="language"
              title={labelWithRepeatableStrings?.properties?.label}
              appLanguage={appLanguage}
              onPress={() => setActiveSheet('language')}
            />
            <Separator style={styles.separator} />

            <SettingItem
              type="support"
              title={labelWithSvgDescriptionWithCta?.properties?.label}
              appLanguage={appLanguage}
              onPress={() => setActiveSheet('support')}
            />
          </ScrollView>

          {activeSheet !== 'none' && (
            <Sheet
              show={activeSheet !== 'none'}
              snapPoints={
                activeSheet === 'language'
                  ? ['43%']
                  : showMessageField
                  ? ['80%', '98%']
                  : ['43%', '55%']
              }
              onSheetClosed={() => {
                setActiveSheet('none');
                setShowMessageField(false);
              }}
              bgColor="#EFEDE9"
              sheetHeaderText={
                activeSheet === 'language'
                  ? 'Language'
                  : showMessageField
                  ? sendMessageHeading
                  : getInTouchHeading
              }
              appLanguage={appLanguage}
              rightIcon={Cross}
              rightIconPress={() => {
                setActiveSheet('none');
                setShowMessageField(false);
              }}>
              <View>
                {activeSheet === 'language' && (
                  <View>
                    <BottomCard
                      title="English"
                      variant="radio"
                      isSelected={appLanguage === LanguageEnum.EN}
                      onPress={() => {
                        languageToggle(LanguageEnum.EN);
                        setActiveSheet('none');
                      }}
                    />

                    <BottomCard
                      title="Arabic"
                      variant="radio"
                      isSelected={appLanguage === LanguageEnum.AR}
                      onPress={() => {
                        languageToggle(LanguageEnum.AR);
                        setActiveSheet('none');
                      }}
                    />
                  </View>
                )}

                {activeSheet === 'support' && !showMessageField && (
                  <View>
                    {getInTouchLinks.map((link: any, index: number) => {
                      const alias = link.alias;
                      const props = link.properties;
                      const svg = link?.properties?.svg?.src;

                      if (alias === 'LabelWithSvgWithCta') {
                        return (
                          <BottomCard
                            key={index}
                            title={props.label}
                            svg={svg}
                          />
                        );
                      }

                      if (alias === 'mobileGetInTouchFormPopup') {
                        return (
                          <BottomCard
                            key={index}
                            title={props.label}
                            svg={svg}
                            onPress={() => setShowMessageField(true)}
                          />
                        );
                      }

                      return null;
                    })}
                  </View>
                )}

                {activeSheet === 'support' && showMessageField && (
                  <MessageField
                    data={
                      getInTouchLinks.find(
                        (l: any) => l.alias === 'mobileGetInTouchFormPopup',
                      )?.properties
                    }
                  />
                )}
              </View>
            </Sheet>
          )}
        </ImageBackground>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  textureBackground: {
    flex: 1,
    width: '100%',
    minHeight: SCREEN_HEIGHT,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    marginTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  text: {
    fontFamily: 'Charter',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 32,
    color: colors.palette.textPrimary,
  },
  separator: {
    marginHorizontal: 20,
    marginBottom: 6,
  },
  supportText: {
    marginHorizontal: 20,
    marginVertical: 5,
    paddingBottom: 5,
    fontFamily: 'Charter',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 20,
    color: colors.palette.textPrimary,
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.43)',
  },
});

export default Profile;
