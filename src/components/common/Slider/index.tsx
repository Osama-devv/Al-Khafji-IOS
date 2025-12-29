// src/components/common/RangeSlider/index.tsx

import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { colors } from "@theme/colors";
import CurrencySvg from "@assets/images/svgs/currencySvg.svg";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 60;
const THUMB_SIZE = 26;
const TRACK_HEIGHT = 8;

interface RangeSliderProps {
  min: number;
  max: number;
  minValue?: number;
  maxValue?: number;
  onChange?: (v: { minValue: number; maxValue: number }) => void;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  minValue,
  maxValue,
  onChange,
}) => {
  const [displayValues, setDisplayValues] = useState({
    minValue: minValue ?? min,
    maxValue: maxValue ?? max,
  });

  const leftX = useSharedValue(0);
  const rightX = useSharedValue(SLIDER_WIDTH);

  // Initialize slider positions based on minValue and maxValue
  React.useEffect(() => {
    if (minValue !== undefined) {
      const progress = (minValue - min) / (max - min);
      leftX.value = progress * (SLIDER_WIDTH - THUMB_SIZE);
    }
    if (maxValue !== undefined) {
      const progress = (maxValue - min) / (max - min);
      rightX.value = progress * (SLIDER_WIDTH - THUMB_SIZE) + THUMB_SIZE;
    }
  }, [minValue, maxValue, min, max]);


  const leftGesture = Gesture.Pan().onChange((e) => {
    "worklet";
    const proposed = leftX.value + e.changeX;

    leftX.value = Math.min(
      Math.max(0, proposed),
      rightX.value - THUMB_SIZE 
    );
  });

  const rightGesture = Gesture.Pan().onChange((e) => {
    "worklet";
    const proposed = rightX.value + e.changeX;

    rightX.value = Math.max(
      Math.min(SLIDER_WIDTH, proposed),
      leftX.value + THUMB_SIZE 
    );
  });

  const leftValue = useDerivedValue(() => {
    const progress = leftX.value / (SLIDER_WIDTH - THUMB_SIZE);
    return Math.round(min + progress * (max - min));
  });

  const rightValue = useDerivedValue(() => {
    const progress =
      (rightX.value - THUMB_SIZE) / (SLIDER_WIDTH - THUMB_SIZE);
    return Math.round(min + progress * (max - min));
  });

  useAnimatedReaction(
    () => [leftValue.value, rightValue.value],
    ([l, r]) => {
      runOnJS(setDisplayValues)({ minValue: l, maxValue: r });
      if (onChange) runOnJS(onChange)({ minValue: l, maxValue: r });
    }
  );

  const leftStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftX.value - THUMB_SIZE / 2 }],
  }));

  const rightStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rightX.value - THUMB_SIZE / 2 }],
  }));

  const activeTrackStyle = useAnimatedStyle(() => {
    const start = leftX.value;
    const end = rightX.value;
    const width = Math.max(0, end - start);

    return {
      position: "absolute",
      height: TRACK_HEIGHT,
      left: start,
      width,
      backgroundColor: colors.palette.primaryColor,
      borderRadius: TRACK_HEIGHT / 2,
    };
  });

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>

        <View style={styles.labelsRow}>
          <View style={styles.valueWrapper}>
            <View style={styles.topIcon}>
              <CurrencySvg color={colors.palette.dullText} />
            </View>
            <Text style={styles.valueLabel}>
              {displayValues.minValue.toLocaleString()}
            </Text>
          </View>

          <View style={styles.valueWrapper}>
            <View style={styles.topIcon}>
              <CurrencySvg color={colors.palette.dullText} />
            </View>
            <Text style={styles.valueLabel}>
              {displayValues.maxValue.toLocaleString()}
            </Text>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            height: TRACK_HEIGHT,
            width: SLIDER_WIDTH,
            backgroundColor: colors.palette.sliderBackground,
            borderRadius: TRACK_HEIGHT / 2,
          }}
        />

        <Animated.View style={activeTrackStyle} />

        <GestureDetector gesture={leftGesture}>
          <Animated.View style={[styles.thumb, leftStyle]}>
            <View style={styles.outerRing}>
              <View style={styles.innerCircle} />
            </View>
          </Animated.View>
        </GestureDetector>

        <GestureDetector gesture={rightGesture}>
          <Animated.View style={[styles.thumb, rightStyle]}>
            <View style={styles.outerRing}>
              <View style={styles.innerCircle} />
            </View>
          </Animated.View>
        </GestureDetector>

        <View style={styles.labelsRowFix}>
          <View style={styles.valueWrapper}>
            <View style={styles.bottomIcon}>
              <CurrencySvg color={colors.palette.textPrimary} />
            </View>
            <Text style={styles.bottomLabel}>{min.toLocaleString()}</Text>
          </View>

          <View style={styles.valueWrapper}>
            <View style={styles.bottomIcon}>
              <CurrencySvg color={colors.palette.textPrimary} />
            </View>
            <Text style={styles.bottomLabel}>{max.toLocaleString()}</Text>
          </View>
        </View>

      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: SLIDER_WIDTH,
    height: 120,
    justifyContent: "center",
  },
  topIcon: {
    width: 12.52,
    height: 12.94,
  },
  bottomIcon: {
    top: 7,
    width: 14.31,
    height: 14.79,
  },

  thumb: {
    position: "absolute",
    height: THUMB_SIZE,
    width: THUMB_SIZE,
    justifyContent: "center",
    alignItems: "center",
    elevation: 0,
    top: (THUMB_SIZE / 2 - TRACK_HEIGHT / 2) * 5.2,
    zIndex: 2,
  },

  outerRing: {
    height: THUMB_SIZE,
    width: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: 0.7,
    borderColor: colors.palette.outerCircle,
    justifyContent: "center",
    alignItems: "center",
  },

  innerCircle: {
    height: THUMB_SIZE - 5,
    width: THUMB_SIZE - 5,
    borderRadius: (THUMB_SIZE - 5) / 2,
    backgroundColor: colors.palette.white,
  },

  labelsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 60,
    marginBottom: 12,
  },

  labelsRowFix: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    top: 20,
  },

  valueLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.palette.dullText,
  },

  valueWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  bottomLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.palette.textPrimary,
    marginTop: 10,
  },
});
