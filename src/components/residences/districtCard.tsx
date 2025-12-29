import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import { colors } from '@theme/colors';

type DistrictCardProp = {
  source: any;
  isDistrictDetails?: boolean,
  width?: number,
  height?: number,
  isSelected?: boolean;
  onPress?: () => void;
};

const DistrictCard = ({
  source,
  isDistrictDetails = false,
  width,
  height,
  isSelected,
  onPress
}: DistrictCardProp) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        isDistrictDetails ? styles.bgContainer : styles.cardContainer,
        isSelected && styles.selectedCard
      ]}
    >
      <View style={styles.svgContainer}>
        <SvgRenderer
          src={source}
          style={{ width: width ? width : 119, height: height ? height : 46 }}
        />
      </View>
    </Pressable>
  );
};

export default DistrictCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 90,
    width: '47%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: colors.palette.primaryColor, 
    borderWidth: 1,
    borderRadius: 2,
  },
  bgContainer: {
    width: 240,
    paddingHorizontal: 19,
    paddingVertical: 34,
    borderRadius: 2,
    backgroundColor: '#4D486C'
  },
  svgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
