import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors} from '@theme/colors';
import HeartIcon from '@assets/images/svgs/heart.svg';
import PercentageIcon from '@assets/images/svgs/percentageCircle.svg';
import CalendarIcon from '@assets/images/svgs/calendar.svg';
import SeparateLine from '@assets/images/svgs/SeparateLine.svg';
import { RESIDENCE_DETAILS } from '@navigators/navigation-routes';
import SvgRenderer from '../SvgRenderer/SvgRender';

// const DATA = [
//   { id: '1', title: 'Favorites', icon: 'heart' },
//   { id: '2', title: 'Personal Offers', icon: 'percent' },
//   { id: '3', title: 'Special Events', icon: 'calendar' },
// ];

const AutoSlider = ({DATA, rtl = false}: {DATA: any; rtl?: boolean}) => {
  const navigation = useNavigation();


  // const getIcon = (type: string) => {
  //   switch (type) {
  //     case 'heart':
  //       return  <View style={{padding: 4}}><HeartIcon width={20} height={20} color={colors.palette.white} /></View>;
  //     case 'percent':
  //       return  <View style={{padding: 4}}><PercentageIcon width={20} height={20} color={colors.palette.white} /></View>;
  //     case 'calendar':
  //       return <View style={{padding: 4}}><CalendarIcon width={20} height={20} color={colors.palette.white} /></View>;
  //     default:
  //       return null;
  //   }
  // };

  const handleItemPress = (itemId: string) => {
    if (itemId === '1') { // Favorites
      navigation.navigate(RESIDENCE_DETAILS as never);
    }
  };

const orderedData = Array.isArray(DATA) && DATA.length
  ? (rtl ? [...DATA].reverse() : DATA)
  : [];


  const renderItem = ({item}: any) => {
    const originalIndex = DATA.findIndex((d: any) => d.alias === item.alias);

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleItemPress(item.id)}
        style={styles.itemContainer}
      >
        <View style={styles.row}>
          {item?.properties?.svg?.src && (
            <SvgRenderer
              src={item?.properties?.svg?.src}
              style={styles.iconContainer}
            />
          )}

          {item?.properties?.label && (
            <Text style={styles.itemText}>{item?.properties?.label}</Text>
          )}
        </View>

        {originalIndex < DATA.length - 1 && (
          <View style={styles.separator}>
            <SeparateLine width={1} height={24} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={orderedData}
      horizontal
      inverted={rtl}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
      {flexDirection: 'row', paddingHorizontal:12}
      ]}
      renderItem={renderItem}
    />
  );
};

export default AutoSlider;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: colors.palette.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Charter',
    lineHeight: 20,
  },
  separator: {
    // paddingLeft: 10,
    // paddingRight: 2,
    paddingHorizontal: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
