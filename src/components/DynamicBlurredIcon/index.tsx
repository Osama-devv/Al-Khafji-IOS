import React from "react";
import { TouchableOpacity, StyleSheet, View, Platform } from "react-native";
import { BlurView } from "@react-native-community/blur";

interface Props {
  onPress?: () => void;
  children: React.ReactNode;
  blurAmount?: number;
}

const DynamicBlurredIcon: React.FC<Props> = ({ onPress, children, blurAmount }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.wrapper}>
      <BlurView
        style={styles.blurBackground}
        blurType="light"
        blurAmount={blurAmount ? blurAmount : 8}
        reducedTransparencyFallbackColor="rgba(0,0,0,0.20)"
      />
      <View style={styles.content}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 40,
    height: 40,
    borderRadius: 2,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#807064",
  },

  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Platform.OS === "android" ? "rgba(0,0,0,0.20)" : "transparent",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DynamicBlurredIcon;
