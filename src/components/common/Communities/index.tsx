import {colors} from '@theme/colors';
import {IsValidArray} from '@utils/helpers';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgRenderer from '../SvgRenderer/SvgRender';

const {width} = Dimensions.get('window');

interface CommunityItem {
  properties: {
    communityName?: string;
    description?: string;
    image?: {
      src?: string;
      alt?: string;
    };
    svg: {
      src: string;
      alt?: string;
    };
  };
}

interface Props {
  data: CommunityItem[];
  rtl: boolean;
  onPress?: () => void;
}

const Communities: React.FC<Props> = ({data, rtl = false, onPress}) => {
  const orderedData = IsValidArray(data) && rtl ? [...data].reverse() : data;

  return (
    <FlatList
      horizontal
      data={orderedData}
      keyExtractor={(item, index) => index.toString()}
      inverted={rtl}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        {flexDirection: rtl ? 'row-reverse' : 'row', gap: 12},
      ]}
      renderItem={({item, index}) => {
        const p = item?.properties;
        return (
          <TouchableOpacity style={styles.card} key={index} onPress={onPress}>
            <ImageBackground
              source={{uri: p?.image?.src}}
              style={styles.image}
              imageStyle={styles.imageRadius}>
              {p?.svg?.src && (
                <View
                  style={[
                    styles.iconWrapper,
                    rtl ? {right: 16, left: 'auto'} : {left: 16, right: 'auto'},
                  ]}>
                  <SvgRenderer src={p?.svg?.src} />
                </View>
              )}

            <LinearGradient
              colors={[
                "rgba(0,0,0,0.20)",
                "rgba(0,0,0,0.20)",
              ]}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
              style={styles.fullOverlay}
            />
           

              <View
                style={[
                  styles.textWrapper,
                  rtl
                    ? {alignItems: 'flex-end', right: 16, left: 16}
                    : {alignItems: 'flex-start', left: 16, right: 16},
                ]}>
                {p?.communityName && (
                  <Text
                    style={[
                      styles.title,
                      rtl && {textAlign: 'right', alignSelf: 'flex-end'},
                    ]}>
                    {p?.communityName}
                  </Text>
                )}

                {p?.description && (
                  <Text
                    style={[
                      styles.description,
                      rtl && {textAlign: 'right', alignSelf: 'flex-end'},
                    ]}>
                    {p?.description}
                  </Text>
                )}
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Communities;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    // paddingBottom: 20,
    marginTop: 20,
    // marginBottom: 20,
  },

  card: {
    width: width * 0.85,
    height: 188,
    borderRadius: 2,
    overflow: 'hidden',
  },

  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  imageRadius: {
    borderRadius: 2,
  },

  iconWrapper: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 3,
  },

  fullOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },

  textWrapper: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    zIndex: 3,
    paddingLeft: 5,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Charter',
    fontStyle: 'normal',
    lineHeight: 31.2,
    fontWeight: '400',
    color: colors.palette.white,
    marginBottom: 6,
  },

  description: {
    fontSize: 20,
    fontFamily:"Sakkal Majalla",
    fontStyle:"normal",
    fontWeight: "400",
    color: colors.palette.white,
    lineHeight: 20,
    opacity: 0.8
  },
});
