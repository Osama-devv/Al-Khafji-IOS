import { colors } from "@theme/colors";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface SimpleButtonProps {
  title: string;
  backgroundColor: string;
  onPress?: () => void;
}

const SimpleButton = ({ title, backgroundColor, onPress }: SimpleButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, { backgroundColor }]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "rgba(51, 58, 59, 0.40)",
    borderRadius: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontFamily: "Charter",
    fontSize: 12,
    color: colors.palette.textPrimary,
    textTransform: "uppercase",
    fontStyle: "normal",
    lineHeight: 14,
  },
});

export default SimpleButton;
