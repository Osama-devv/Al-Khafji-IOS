import { IBottomSheet } from "@appTypes/type";
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { $flexDirection, $textAlign } from "@theme/view";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, BackHandler, ImageBackground, Platform } from "react-native";
import SvgRenderer from "../SvgRenderer/SvgRender";
import Separator from "../Separator";
import { colors } from "@theme/colors";
import { LanguageEnum } from "@appTypes/enums";
import CustomBackDrop from "../CustomBackDrop";

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Sheet = ({
  show,
  snapPoints,
  children,
  onSheetOpened,
  onSheetClosed,
  sheetHeaderText,
  sheetHeaderDescription,
  index,
  leftIcon,
  bgColor = '#FFFFFF',
  appLanguage = LanguageEnum.EN,
  rightIcon,
  rightIconPress,
  leftIconPress,
  centerHeader = false,
  FooterComponent,
  backgroundImage,
  headerBackgroundColor,
  hideHeaderSeparator = false
}: IBottomSheet) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const open = () => {
    if (bottomSheetRef) {
      bottomSheetRef.current?.present();
      onSheetOpened ? onSheetOpened() : null;
    }
  };
  const close = () => {
    if (bottomSheetRef) {
      bottomSheetRef.current?.close();
      onSheetClosed ? onSheetClosed() : null;
    }
  };

  useEffect(() => {
    if (show) {
      open();
    } else {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  const insets = useSafeAreaInsets();


  useEffect(() => {
    const backAction = () => {
      if (show) {
        close();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [show]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={index}
      enablePanDownToClose={true}
      keyboardBehavior={'interactive'}
      overDragResistanceFactor={0}
      enableOverDrag={false}
      onDismiss={(): void => {
        close();
      }}
      topInset={insets.top}
      handleComponent={null}

      backgroundStyle={{
        backgroundColor: backgroundImage ? 'transparent' : bgColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      backdropComponent={props => <CustomBackDrop props={props} />}
    >
      <BottomSheetView style={{
        position: 'relative',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
      }}>
        {backgroundImage && (
          <ImageBackground
            source={backgroundImage}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        )}

        {centerHeader ? <View style={[styles.centerHeader, $flexDirection(appLanguage), headerBackgroundColor ? { backgroundColor: headerBackgroundColor } : {}]}>
          {leftIcon ? <TouchableOpacity onPress={leftIconPress} >
            <SvgRenderer
              src={leftIcon}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity> : null}
          <View style={styles.leftColumn}>


            <Text style={[styles.headerText, $textAlign(appLanguage)]}>{sheetHeaderText ?? ''}</Text>

            {sheetHeaderDescription ? <Text style={[styles.headerDescription, $textAlign(appLanguage)]}>{sheetHeaderDescription}</Text> : null}
          </View>
          {rightIcon ? <TouchableOpacity onPress={rightIconPress} >
            <SvgRenderer
              src={rightIcon}
              style={{ height: 24, width: 24, right: 6 }}
            />
          </TouchableOpacity> : null}
        </View>
          :
          <View style={[styles.headerContainer, $flexDirection(appLanguage), headerBackgroundColor ? { backgroundColor: headerBackgroundColor } : {}]}>

            <Text style={[styles.headerText, $textAlign(appLanguage)]}>{sheetHeaderText ?? ''}</Text>
            {rightIcon ? <TouchableOpacity onPress={rightIconPress} >
              <SvgRenderer
                src={rightIcon}
                style={{ height: 24, width: 24 }}
              />
            </TouchableOpacity> : null}
          </View>
        }
        {hideHeaderSeparator ? null : <Separator />}
        {/* <Box px={5}>
                    <Divider bg="grey.400" orientation="horizontal" mb={2} />
                </Box> */}
        <BottomSheetScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {children}
        </BottomSheetScrollView>

        {FooterComponent}

        <View style={styles.bottomHandleContainer}>
          <View style={styles.handleIndicator} />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default Sheet;

const styles = StyleSheet.create({
  centerHeader: {
    paddingHorizontal: 8,
    paddingVertical: 20,
    borderRadius: 16,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 8,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: 44,
    // marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 16,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Charter",
    fontWeight: "600",
  },

  headerDescription: {
    fontSize: 20,
    fontFamily: "Sakkal Majalla",
    marginTop: 4,
    color: colors.palette.textSecondary,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 20,
  },

  bottomHandleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  handleIndicator: {
    width: 36,
    height: 5,
    borderRadius: 2,
    backgroundColor: '#7F7F7F66',
  },
})
