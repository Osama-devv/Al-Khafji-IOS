import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "assets/images/svgs/backIcon.svg";
import { colors } from "@theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { IState } from "@reducers/index";
import { LanguageEnum } from "@appTypes/enums";

interface TransparentHeaderProps {
  title?: string;
  titleColor?: string;
  icon?: React.ReactNode;
  showBackButton?: boolean;
  showSeparator?: boolean;
  rtl?: boolean;
}

const TransparentHeader: React.FC<TransparentHeaderProps> = ({
  title,
  titleColor = colors.palette.white,
  icon,
  showBackButton = true,
  showSeparator = false,
  rtl,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { options } = useSelector((state: IState) => state.startup);
  const { language } = options;
  const appLanguage = language ?? LanguageEnum.AR;
  const isRtl = rtl ?? (appLanguage === LanguageEnum.AR);

  const topPadding =
    Platform.OS === "android"
      ? (StatusBar.currentHeight ?? 0) + 8
      : insets.top + 8;

  return (
    <View style={[styles.container, { paddingTop: topPadding }]}>

      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <View style={styles.headerRow}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles.backButton,
              isRtl ? { right: 7.5, left: undefined } : { left: 7.5, right: undefined },
            ]}
            hitSlop={styles.hitSlop}
          >
            <View style={isRtl ? { transform: [{ scaleX: -1 }] } : undefined}>
              {icon ? icon : <BackIcon width={8} height={14} stroke={'#000'} />}
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>

      {showSeparator && (
        <View style={styles.separatorWrapper}>
          <View style={styles.separator} />
        </View>
      )}

    </View>

  );
};

export default TransparentHeader;

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 16,
  },

  headerRow: {
    height: 50,
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    top: 14,
    padding: 6,
    zIndex: 5,
  },

  hitSlop: {
    top: 8,
    bottom: 8,
    left: 8,
    right: 8,
  },

  titleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  title: {
    fontSize: 20,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "center",
    fontFamily: 'Charter',
    lineHeight: 26,

  },
  separatorWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 0.5,
    justifyContent: "center",
  },

  separator: {
    height: 0.5,
    backgroundColor: '#bcc6d1',
  },
});
