import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';

const NotificationsScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        You have no new notifications
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default NotificationsScreen;
