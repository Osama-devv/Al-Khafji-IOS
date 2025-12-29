import { MaterialCardItem } from "@appTypes/type";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "@theme/colors";

interface Props {
  item: MaterialCardItem;
  onPress?: (item: MaterialCardItem) => void;
  rtl?: boolean;
}

const MaterialCard: React.FC<Props> = ({ item, onPress, rtl = false }) => {
  // Check if image is a number (local require) or string (URL)
  const imageSource = typeof item.image === 'number'
    ? item.image
    : { uri: item.image };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(item)}
      style={styles.card}
    >
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default MaterialCard;

const styles = StyleSheet.create({
  card: {
    width: 130,
    backgroundColor: colors.palette.buttonBackground,
    borderRadius: 2,
    padding: 8,
    alignItems: "center",
    height: 170,
  },
  image: {
    width: "100%",
    height: 80,
    borderRadius: 2,
  },
  title: {
    marginTop: 25,
    fontSize: 14,
    width: "70%",
    fontFamily: "Charter",
    fontWeight: "400",
    color: colors.palette.black,
    textAlign: "center",
    lineHeight: 17,
  },
});
