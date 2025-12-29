import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors } from '@theme/colors';

interface ContentBlockProps {
  title?: string;
  description?: string;
  linkText?: string;
  seeLessText?:string
  onPressLink?: () => void;
  rtl?: boolean;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  description,
  linkText,
  seeLessText,
  onPressLink,
  rtl = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const CHARACTER_LIMIT = 100;
  const shouldTruncate = description && description.length > CHARACTER_LIMIT;

  const displayText = shouldTruncate && !isExpanded
    ? `${description.substring(0, CHARACTER_LIMIT)}...`
    : description;

  return (
    <View style={[styles.container, rtl && { alignItems: "flex-end" }]}>
      
      {title && <Text
        style={[
          styles.title,
          rtl && { textAlign: "right" },
        ]}
      >
        {title}
      </Text>}

      {description && <Text
        style={[
          styles.description,
          rtl && { textAlign: "right" },
        ]}
      >
        {displayText}
      </Text>}

{shouldTruncate && linkText && (
  <View style={[styles.linkWrapper, rtl && { alignSelf: "flex-end" }]}>
    {seeLessText && linkText &&
      <Text
      style={[styles.link, rtl && { textAlign: "right" }]}
      onPress={() => setIsExpanded(!isExpanded)}
    >
     {isExpanded ? seeLessText : linkText}
    </Text>}

    <View
      style={[styles.underline, rtl && { alignSelf: "flex-end" }]}
    />
  </View>
)}


    </View>
  );
};

export default ContentBlock;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    marginTop: 24,
    backgroundColor: 'transparent',
  },

  title: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.palette.textPrimary,
    lineHeight: 31.2,
    fontFamily: "Charter",
    height: Platform.OS == 'android' ? 120 : 93,
  },

  description: {
    fontSize: 22,
    lineHeight: 22,
    color: colors.palette.textSecondary,
    fontFamily: "Sakkal Majalla",
  },

  linkWrapper: {
    alignSelf: "flex-start",
    marginTop: 16,
  },

  link: {
    fontFamily: "Charter",
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: 0.48,
    color: colors.palette.primaryColor,
  },

  underline: {
    height: 2,
    backgroundColor: colors.palette.primaryColor,
    marginTop: 2,
    alignSelf: "stretch",
    marginBottom:24
  },
});
