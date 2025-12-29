import {Dimensions, FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import { $flexDirection } from '@theme/view';
import { IDetailsImageSliderProps } from '@appTypes/type';

const {width} = Dimensions.get('window');

 const renderBannerItem = ({item, index}: any) => (
    <ImageBackground
      source={item.image}
      style={styles.bannerImage}
      resizeMode="cover"></ImageBackground>
  );
  

const DetailsImageSlider = ({data, isRTL, appLanguage}: IDetailsImageSliderProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <>
      <FlatList
        data={data?.bannerImages}
        renderItem={renderBannerItem}
        keyExtractor={item => item.id}
        inverted={isRTL}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentImageIndex(index);
        }}
      />
      <View style={{borderWidth: 1}}>
        <View style={[styles.paginationContainer, $flexDirection(appLanguage)]}>
        {data?.bannerImages.map((_ : any, index: any) =>
          index === currentImageIndex ? (
            <View
              key={index}
              style={[
                styles.wrapperDot,
                index === currentImageIndex && styles.activewrapperDot,
              ]}>
              <View
                style={[
                  styles.dot,
                  index === currentImageIndex && styles.activeDot,
                ]}
              />
            </View>
          ) : (
            <View
              style={[
                styles.dot,
                index === currentImageIndex && styles.activeDot,
              ]}
            />
          ),
        )}
      </View>
      </View>
    </>
  );
};

export default DetailsImageSlider;

const styles = StyleSheet.create({
    bannerImage: {
    width,
    height: '100%',
    // height: 300,
  },
   paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  wrapperDot: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 50,
    padding: 3,
  },
  activewrapperDot: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 50,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
  },
  activeDot: {
    backgroundColor: '#fff',
    // width: 20,
    borderRadius: 50,
  },
});
