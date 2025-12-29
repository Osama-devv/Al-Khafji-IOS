import {HeaderProps} from '@appTypes/type';
import {$flexDirection} from '@theme/view';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';

const Header = ({
  title,
  onIconPress,
  showBadge = false,
  containerStyle,
  titleStyle,
  icon,
  appLanguage,
  transparent,
}: HeaderProps) => {
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        $flexDirection(appLanguage),
        transparent && {
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
        },
      ]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={onIconPress}
        activeOpacity={0.7}>
        {icon ? (
          <FastImage
            style={{height: 24, width: 24}}
            source={icon}
            resizeMode={'cover'}
          />
        ) : null}
        {showBadge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}></Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop:48,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#00000033',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Charter',
  },
  iconContainer: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 3,
    right: 3,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
});
