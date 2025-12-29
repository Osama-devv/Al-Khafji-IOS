import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import ImageLoader from '@components/common/Image-loader'; // Keeping original import
import FastImage from 'react-native-fast-image';
import { images } from 'assets/images'; // Keeping original import
import { $textAlign } from '@theme/view';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';
import { LanguageEnum } from '@appTypes/enums';
import { colors } from '@theme/colors';



const CommunityCard = ({ item, appLanguage }: any) => {
  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.9}>
      <View style={styles.imageWrapper}>
        <ImageLoader
          style={styles.image}
        />

       
      </View>

        <Text style={[styles.title, $textAlign(appLanguage)]} numberOfLines={1}>
          {item.title}
        </Text>
    </TouchableOpacity>
  );
};

export default CommunityCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 214,
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    borderRadius: 2,
    overflow: 'hidden', 
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 100, 
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 2
  },
  title: {
    fontSize: 16,
    color: colors.palette.black,
    fontFamily: 'Charter',
    lineHeight: 21,
    padding: 12,
  },
});