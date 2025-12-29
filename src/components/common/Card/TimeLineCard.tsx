import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { colors } from "@theme/colors";
import DottedSvg from "assets/images/svgs/dottedLine.svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

const IMAGE_SIZE = scale(55);
const OVERLAP_OFFSET = IMAGE_SIZE * 0.5;

interface TimeLineCardProps {
  title: string;
  subtitle: string;
  images?: any[];
  rtl?: boolean;
}

const TimelineCard: React.FC<TimeLineCardProps> = ({
  title,
  subtitle,
  images = [],
  rtl = false,
}) => {
  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          rtl && { flexDirection: "row-reverse" },
        ]}
      >
        <View
          style={[
            styles.textWrapper,
            rtl && {
              paddingRight: 0,
              paddingLeft: scale(20),
            },
          ]}
        >
          <Text style={[styles.title, rtl && { textAlign: "right" }]}>
            {title}
          </Text>
          <Text style={[styles.subtitle, rtl && { textAlign: "right" }]}>
            {subtitle}
          </Text>
        </View>

        <View style={[
          styles.clusterWrapper,
          rtl ? { marginRight: scale(20) } : { marginLeft: scale(20) }
        ]}>
          <View style={styles.imagesWrapper}>
            {images[0] && (
              <Image
                source={typeof images[0] === "string" ? { uri: images[0] } : images[0]}
                style={[
                  styles.circleImage,
                  { zIndex: 1 },
                  rtl ? { right: 0 } : { left: 0 },
                ]}
              />
            )}

            {images[1] && (
              <View
                style={[
                  styles.maskCircle,
                  { zIndex: 2, width: IMAGE_SIZE * 1.1, height: IMAGE_SIZE * 1.1, borderRadius: (IMAGE_SIZE * 1.4) / 2 },
                  rtl
                    ? { right: OVERLAP_OFFSET * 0.90 }
                    : { left: OVERLAP_OFFSET * 0.90 },
                ]}
              />
            )}

            {images[1] && (
              <Image
                source={typeof images[1] === "string" ? { uri: images[1] } : images[1]}
                style={[
                  styles.circleImage,
                  { zIndex: 3 },
                  rtl ? { right: OVERLAP_OFFSET * 1 } : { left: OVERLAP_OFFSET * 1 },
                ]}
              />
            )}

            {images[2] && (
              <View
                style={[
                  styles.maskCircle,
                  { zIndex: 4, width: IMAGE_SIZE * 1.1, height: IMAGE_SIZE * 1.1, borderRadius: (IMAGE_SIZE * 1.1) / 2 },
                  rtl
                    ? { right: OVERLAP_OFFSET * 1.90 }
                    : { left: OVERLAP_OFFSET * 1.90 },
                ]}
              />
            )}

            {images[2] && (
              <Image
                source={typeof images[2] === "string" ? { uri: images[2] } : images[2]}
                style={[
                  styles.circleImage,
                  { zIndex: 5 },
                  rtl ? { right: OVERLAP_OFFSET * 2 } : { left: OVERLAP_OFFSET * 2 },
                ]}
              />
            )}
          </View>

          <View style={styles.lineWrapper}>
            <DottedSvg width={scale(72)} height={scale(6)} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TimelineCard;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: scale(16),
    marginTop: scale(10),
    marginBottom: scale(20),
  },

  container: {
    backgroundColor: colors.palette.timeLineBackground,
    borderRadius: 4,
    paddingHorizontal: scale(16),
    paddingVertical: scale(17),
    minHeight: scale(160),
    flexDirection: "row",
    alignItems: "center",
  },

  clusterWrapper: {
    // width: scale(130),
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: scale(18),
  },

  imagesWrapper: {
    width: IMAGE_SIZE + (OVERLAP_OFFSET * 2),
    height: scale(70),
    position: "relative",
    justifyContent: "center",
    marginBottom: scale(2),
  },

  circleImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    position: "absolute",
  },

  maskCircle: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    backgroundColor: colors.palette.timeLineBackground,
    position: "absolute",
  },

  lineWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  textWrapper: {
    flex: 1,
    justifyContent: "center",
    gap: 12
  },

  title: {
    fontSize: 20,
    fontFamily: "Charter",
    fontStyle: "normal",
    // fontWeight: "400",
    color: colors.palette.textPrimary,
    // marginBottom: 8,
    lineHeight: 26,
  },

  subtitle: {
    fontSize: 20,
    fontFamily: "Sakkal Majalla",
    fontStyle: "normal",
    fontWeight: "400",
    color: colors.palette.textPrimary,
    lineHeight: 20,
  },
});
