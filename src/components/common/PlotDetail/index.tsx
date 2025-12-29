import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@theme/colors";

interface PlotDetailProps {
  label: string;
  value: string;
  rtl?: boolean;
}

export const PlotDetail = ({ label, value, rtl = false }: PlotDetailProps) => {
  return (
    <View style={[styles.row, rtl && { flexDirection: "row-reverse" }]}>
      <Text style={[styles.label, rtl && { textAlign: "right" }]}>
        {label}
      </Text>

      <Text style={[styles.value, rtl && { textAlign: "left" }]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: "center",
  },

  label: {
    fontFamily: "Sakkal Majalla",
    fontSize: 26,
    lineHeight: 26,
    color: colors.palette.dullText,
    opacity: 0.6,
    fontWeight: "400",
  },

  value: {
    fontFamily: "Sakkal Majalla",
    fontSize: 26,
    lineHeight: 26,
    color: colors.textPrimary,
    fontWeight: "400",
  },
});
