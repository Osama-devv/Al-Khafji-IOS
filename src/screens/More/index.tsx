import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Screen} from '@components/common/Screen/Screen';
import MoreBanner from '@components/MoreBanner/MoreBanner';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import EventArrow from '../../../assets/images/svgs/eventArrow.svg';
import {useSelector} from 'react-redux';
import {IState} from '@reducers/index';
import {LanguageEnum} from '@appTypes/enums';
import {$flexDirection} from '@theme/view';
import Separator from '@components/common/Separator';
import {images} from 'assets/images';
import {useMoreQuery} from '@services/more/moreApi';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {IsValidArray} from '@utils/helpers';
import {
  IHeadingWithImageBlockWithPicker,
  IImageTitleWithTooltip,
  ITitleWithImageBlockWithPicker,
} from '@services/more/types';
import Sheet from '@components/common/sheet';
import ContactField from '@components/ContactField/ContactField';
import MoreCard from '@components/common/MoreCard';
import {useState} from 'react';
import Calculator from '../../../assets/images/svgs/moreCalculator.svg';
import GetInTouch from '@assets/images/svgs/chatLines.svg';
import Cross from '@assets/images/svgs/cross.svg';
import itenary from '@assets/images/svgs/itenary.svg';
import {BlurView} from '@react-native-community/blur';

const More = () => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const navigation = useNavigation();
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;
  const isFocused = useIsFocused();

  const {data} = useMoreQuery(undefined, {skip: !isFocused});
  const components = data?.data?.components;
  const navbarTitle = data?.data?.navBarTitle;
  const moreBannerData =
    IsValidArray(components) &&
    components?.find(
      (item: IImageTitleWithTooltip) => item.alias === 'imageTitleWithTootip',
    )?.properties;

  const arrowcardsData =
    IsValidArray(components) &&
    components?.find(
      (item: ITitleWithImageBlockWithPicker) =>
        item.alias === 'titleWithImageBlockWithPicker',
    )?.properties;
  const toolsAndAssistanceData =
    IsValidArray(components) &&
    components?.find(
      (item: IHeadingWithImageBlockWithPicker) =>
        item.alias === 'headingWithImageBlockWithPicker',
    )?.properties;
  const [showSheet, setShowSheet] = useState(false);

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
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 60}}>
          <ImageBackground source={images.morebg} style={{height: '100%'}}>
            {showSheet && (
              <BlurView
                style={styles.blurBackground}
                blurType="light"
                blurAmount={1}
                reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.43)"
              />
            )}
            <MoreBanner data={moreBannerData} navBarTitle={navbarTitle} />
            {IsValidArray(arrowcardsData?.cardBlocks) &&
              arrowcardsData?.cardBlocks?.map((item: any, index: number) => {
                const p = item?.properties;
                const navigateTo = p?.cta;
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate(navigateTo as never)}
                    key={index}
                    style={{gap: 16, marginBottom: 16, paddingHorizontal: 16}}>
                    <ArrowCard
                      title={p?.label}
                      backgroundColor={p?.bg}
                      icon={p?.svg?.src}
                      length={arrowcardsData?.cardBlocks?.length}
                      index={index}
                    />
                  </TouchableOpacity>
                );
              })}
            <Separator />
            <View>
              <View style={[styles.container, $flexDirection(appLanguage)]}>
                {toolsAndAssistanceData?.heading && (
                  <Text style={styles.txt}>
                    {toolsAndAssistanceData?.heading}
                  </Text>
                )}
              </View>

              {/* Group the small cards together */}
              <View
                style={[
                  $flexDirection(appLanguage),
                  {gap: 10, justifyContent: 'center'},
                ]}>
                {IsValidArray(toolsAndAssistanceData?.cardBlocks) &&
                  toolsAndAssistanceData?.cardBlocks
                    .filter(
                      (item: any) => item?.alias === 'LabelWithSvgWithCta',
                    )
                    .map((item: any, index: number) => {
                      const p = item?.properties;
                      return (
                        <MoreCard
                          key={index}
                          title={p?.label}
                          svg={p?.svg?.src}
                          backgroundColor={p?.bg}
                        />
                      );
                    })}
              </View>

              {/* Render the full-width card separately */}
              {IsValidArray(toolsAndAssistanceData?.cardBlocks) &&
                toolsAndAssistanceData?.cardBlocks
                  .filter(
                    (item: any) =>
                      item?.alias === 'labelWithSvgDescriptionWithCta',
                  )
                  .map((item: any, index: number) => {
                    const p = item?.properties;
                    return (
                      <MoreCard
                        key={index}
                        title={p?.label}
                        subtitle={p?.description}
                        svg={p?.svg?.src}
                        fullWidth={true}
                        backgroundColor={p?.bg}
                        pattern={images.pattern}
                        onPress={() => setShowSheet(true)}
                      />
                    );
                  })}

              {showSheet &&
                IsValidArray(toolsAndAssistanceData?.cardBlocks) &&
                toolsAndAssistanceData.cardBlocks
                  .filter(
                    (item: any) =>
                      item?.alias === 'labelWithSvgDescriptionWithCta',
                  )
                  .map((item: any, index: number) => {
                    const dt = item?.properties?.mobileGetInTouchPopup;
                    const contactData = dt?.[0]?.properties;
                    return (
                      <Sheet
                        key={index}
                        show={showSheet}
                        snapPoints={['50%', '60%']}
                        onSheetClosed={() => setShowSheet(false)}
                        bgColor="#EFEDE9"
                        sheetHeaderText={contactData?.heading}
                        appLanguage={appLanguage}
                        rightIcon={Cross}
                        rightIconPress={() => setShowSheet(false)}>
                        <ContactField data={contactData} />
                      </Sheet>
                    );
                  })}
            </View>
          </ImageBackground>
        </ScrollView>
      </Screen>
    </>
  );
};

export const ArrowCard = ({index, length, ...props}: any) => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;

  return (
    <>
      <View style={[styles.main, $flexDirection(appLanguage)]}>
        <View style={[$flexDirection(appLanguage)]}>
          <View
            style={[styles.calender, {backgroundColor: props.backgroundColor}]}>
            <View style={styles.iconBox}>
              {props.icon && (
                <SvgRenderer src={props.icon} style={{height: 22, width: 21}} />
              )}
            </View>
          </View>

          {props?.title && <Text style={styles.title}>{props.title}</Text>}
        </View>

        <View style={styles.eventArrow}>
          <SvgRenderer
            src={EventArrow}
            style={{
              width: 18,
              height: 18,
              transform: [{scaleX: appLanguage === LanguageEnum.AR ? -1 : 1}],
            }}
          />
        </View>
      </View>

      {/* ✅ Separator logic */}
      {length > 1 && index < length - 1 && <Separator />}
    </>
  );
};

export default More;

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calender: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    borderRadius: 2,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    fontFamily: 'Charter',
  },
  eventArrow: {
    paddingVertical: 26,
  },
  container: {
    marginTop: 24,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    fontSize: 18,
    fontFamily: 'Charter',
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.43)',
  },
});
