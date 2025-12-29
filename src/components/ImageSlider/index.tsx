import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Text,
  ViewToken,
  StatusBar,
  Platform,
  Pressable,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import DynamicBlurredIcon from "../DynamicBlurredIcon";
import BackIcon from "../../../assets/images/svgs/backIcon.svg";
import HeartIcon from "../../../assets/images/svgs/heart.svg";
import DownloadIcon from "../../../assets/images/svgs/download.svg";
import { colors } from "@theme/colors";
import { BlurView } from "@react-native-community/blur";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ImageSliderProps {
  images: (string | number)[];
  onBack?: () => void;
  onFavorite?: () => void;
  onShare?: () => void;
  isFavorite?: boolean;
  onPressImage?: (index: number) => void;
  rtl?: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  onBack,
  onFavorite,
  onShare,
  onPressImage,
  isFavorite = false,
  rtl = false,
}) => {
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const total = images.length;

  let activeDot = 1;
  if (activeIndex === 0) activeDot = 0;
  else if (activeIndex === total - 1) activeDot = 2;

  return (
    <View style={[styles.container]}>
      <StatusBar translucent backgroundColor="transparent" />

      <FlatList
        data={images}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              console.log("Pressed image index:", index);
              onPressImage?.(index);
            }}
            style={styles.slideWrapper}
          >
            <Image
              source={typeof item === "string" ? { uri: item } : item}
              style={styles.image}
            />
          </Pressable>
        )}

        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={(_, index) => `img-${index}`}
        inverted={rtl}
      />

      <View
        style={[
          styles.topControls,
          { top: insets.top + 12, flexDirection: rtl ? "row-reverse" : "row" },
        ]}
      >
        <DynamicBlurredIcon onPress={onBack}>
          <View style={{ transform: [{ rotate: rtl ? "180deg" : "0deg" }] }}>
            <BackIcon width={20} height={20} stroke="#fff" />
          </View>
        </DynamicBlurredIcon>

        <View style={styles.rightControls}>
          <DynamicBlurredIcon onPress={onFavorite}>
            <HeartIcon width={20} height={20} stroke="#fff" />
          </DynamicBlurredIcon>
          <DynamicBlurredIcon onPress={onShare}>
            <DownloadIcon width={20} height={20} stroke="#fff" />
          </DynamicBlurredIcon>
        </View>
      </View>

      <View style={styles.bottomControls}>
        <View style={styles.dotsWrapper}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={styles.dotContainer}>
              {i === activeDot ? (
                <View style={styles.activeOuter}>
                  <View style={styles.activeInner} />
                </View>
              ) : (
                <View style={styles.inactiveDot} />
              )}
            </View>
          ))}
        </View>

        <View style={styles.counterWrapper}>
          <BlurView
            style={StyleSheet.absoluteFillObject}
            blurType="light"
            blurAmount={14}
            reducedTransparencyFallbackColor="rgba(0,0,0,0.30)"
          />
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: "rgba(255,255,255,0.04)" },
            ]}
          />
          <Text style={styles.counterText}>
            {activeIndex + 1} / {total}
          </Text>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    backgroundColor: "transparent",
  },

  slideWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.75,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  topControls: {
    position: "absolute",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 20,

  },

  rightControls: {
    flexDirection: "row",
    gap: 10,
  },

  bottomControls: {
    position: "absolute",
    bottom: 28,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
  },

  dotsWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  counterWrapper: {
    position: "absolute",
    right: 13,
    paddingHorizontal: 14,
    paddingVertical: 3,
    borderRadius: 2,
    backgroundColor: "rgba(0,0,0,0.25)",
    overflow: "hidden",
  },

  dotContainer: {
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  inactiveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgb(135,120,103)",
  },

  activeOuter: {
    width: 14,
    height: 14,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  activeInner: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#fff",
  },

  counterText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Charter",
  },
});

export default ImageSlider;
