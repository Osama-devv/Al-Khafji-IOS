import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import Arrow from "assets/images/svgs/arrow.svg";
import GreyPatternSvg from "assets/images/svgs/greyPattern.svg";
import { colors } from "@theme/colors";
import { platform } from "os";

interface DestinationCardProps {
  title: string;
  subtitle: string;
  onPress?: () => void;
  rtl?: boolean;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  title,
  subtitle,
  onPress,
  rtl = false,
}) => {
  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.cardContainer}
      >
        <View
          style={[
            styles.patternWrapper,
            rtl ? { left: 0, right: "auto", transform: [{ scaleX: -1 }] } : { right: 10, left: "auto" },
          ]}
        >
          <GreyPatternSvg width="106%" height="100%" preserveAspectRatio="xMaxYMax meet" />
        </View>

        <View
          style={[
            styles.arrowWrapper,
            rtl ? { left: 16, right: "auto" } : { right: 16, left: "auto" },
          ]}
        >
          <BlurView
            style={styles.blurCircle}
            blurType="light"
            blurAmount={12}
            reducedTransparencyFallbackColor="rgba(255,255,255,0.40)"
          />
          <View style={rtl ? { transform: [{ scaleX: -1 }] } : undefined}>
            <Arrow width={10} height={15} />
          </View>
        </View>

        <View
          style={[
            styles.textWrapper,
            rtl ? { alignItems: "flex-end" } : { alignItems: "flex-start" },
          ]}
        >
          <Text style={[styles.title, rtl && { textAlign: "right" }]}>
            {title}
          </Text>

          <Text style={[styles.subtitle, rtl && { textAlign: "right" }]}>
            {subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

};

export default DestinationCard;

const styles = StyleSheet.create({

  cardWrapper: {
    paddingHorizontal: 16,
    marginTop: 12
  },
  cardContainer: {
    width: "100%",
    alignSelf: 'stretch',
    height: 160,
    backgroundColor: colors.palette.destinationCardColor,
    borderRadius: 2,
    paddingVertical: 24,
    paddingHorizontal: 16,
    overflow: "hidden",
    marginVertical: 10,
    justifyContent: 'center',
  },

  textWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: Platform.OS == 'ios' ? 22 : 15
  },

  title: {
    fontSize: 20,
    fontStyle: "normal",
    fontFamily: "Charter",
    color: colors.palette.white,
    lineHeight: 26,
    maxWidth: '50%',
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "Sakkal Majalla",
    fontStyle: "normal",
    lineHeight: 20,
    maxWidth: '70%',
    color: colors.palette.white,
    opacity: 0.8,
  },

  patternWrapper: {
    position: "absolute",
    right: 0,
    bottom: -10,
    width: 230,
    height: 180,

  },

  arrowWrapper: {
    position: "absolute",
    top: 24,
    right: 0,
    height: 40,
    width: 40,
    padding: 2,
    borderRadius: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    gap: 10,
    borderWidth: 0.3,
    borderColor: colors.palette.greyBorderColor,

  },

  blurCircle: {
    ...StyleSheet.absoluteFillObject,
    // borderRadius: 40,
    backgroundColor:
      Platform.OS === "android"
        ? "rgba(0,0,0,0.15)"
        : "transparent",
  },
});
