import React from 'react';
import { useWindowDimensions, Linking, Image } from 'react-native';
import RenderHTML, { MixedStyleRecord } from 'react-native-render-html';

interface RichTextProps {
  html: string;
  style?: {
    base?: object;
    tags?: MixedStyleRecord;
  };
  locale?: 'en' | 'ar';
}

const RichText = ({ html, style, locale = 'en' }: RichTextProps) => {
  const { width } = useWindowDimensions();
  const isRTL = locale === 'ar';

  return (
    <RenderHTML
      contentWidth={width}
      source={{ html }}
      baseStyle={{
        color: '#007bff',
        fontSize: 16,
        lineHeight: 24,
        textAlign: isRTL ? 'right' : 'left',
        writingDirection: isRTL ? 'rtl' : 'ltr',
        ...(style?.base || {}),
      }}
      tagsStyles={{
        h1: {
          fontSize: 24,
          fontWeight: '700',
          marginVertical: 10,
          textAlign: isRTL ? 'right' : 'left',
        },
        h2: {
          fontSize: 20,
          fontWeight: '600',
          marginVertical: 8,
          textAlign: isRTL ? 'right' : 'left',
        },
        p: {
          marginVertical: 6,
          textAlign: isRTL ? 'right' : 'left',
        },
        a: {
          color: '#007bff',
          textDecorationLine: 'underline',
          textAlign: isRTL ? 'right' : 'left',
        },
        ul: {
          marginVertical: 6,
          paddingLeft: isRTL ? 0 : 20,
          paddingRight: isRTL ? 20 : 0,
          writingDirection: isRTL ? 'rtl' : 'ltr',
        },
        li: {
          textAlign: isRTL ? 'right' : 'left',
          writingDirection: isRTL ? 'rtl' : 'ltr',
        },
        ...(style?.tags || {}),
      }}
      renderers={{
        img: ({ tnode }: any) => {
          const src = tnode.attributes.src;
          return (
            <Image
              source={{ uri: src }}
              style={{
                width: width - 40,
                height: 200,
                borderRadius: 8,
                marginVertical: 10,
                alignSelf: 'center',
              }}
              resizeMode="cover"
            />
          );
        },
      }}
      renderersProps={{
        a: {
          onPress: (_, href) => Linking.openURL(href),
        },
      }}
    />
  );
};

export default RichText;
