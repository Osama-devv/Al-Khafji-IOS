import { DISTRICT_DETAIL } from '@navigators/navigation-routes';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme/colors';
import React from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import SvgRenderer from '../SvgRenderer/SvgRender';

const { width } = Dimensions.get('window');

interface DistrictItem {
  id: string;
  properties?: {
    logo?: { src: string };
  };
}

interface Props {
  data: any;
  rtl?: boolean;
}

const Districts: React.FC<Props> = ({ data = [], rtl = false }) => {
  const navigation = useNavigation();

  // Reverse data order for RTL if needed
  const orderedData = rtl ? [...data].reverse() : data;

  return (
    <FlatList
      horizontal
      data={orderedData}
      inverted={rtl}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        { flexDirection: rtl ? 'row-reverse' : 'row', gap: 12 },
      ]}
      renderItem={({ item }) => {
        const logoSrc = item?.properties?.logo?.src;
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate(DISTRICT_DETAIL as never)}
            style={styles.card}
          >
            <View style={[styles.imageWrapper, rtl && { alignItems: 'flex-end' }]}>
              {logoSrc && <SvgRenderer src={logoSrc} />}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Districts;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  card: {
    height: 160,
    width: 200,
    backgroundColor: colors.palette.white,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
