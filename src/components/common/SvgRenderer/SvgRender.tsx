import React from 'react';
import { Image, ImageProps, StyleProp, ImageStyle } from 'react-native';
import { SvgUri } from 'react-native-svg';

// Avoid directly extending ImageProps because some projects/type defs include a
// conflicting `src` prop on ImageProps. Omit it and re-declare `src` with the
// desired union type.
interface SvgRendererProps extends Omit<ImageProps, 'src'> {
  src: string | React.ComponentType<any>;
  style?: StyleProp<ImageStyle>;
}

const SvgRenderer: React.FC<SvgRendererProps> = ({ src, style, ...props }) => {
  const isSvgUrl = typeof src === 'string' && src.toLowerCase().endsWith('.svg');
  const flatStyle: any = style;

  // For remote SVG URIs we only pass the props accepted by SvgUri. Spreading
  // the incoming Image-related props into SvgUri caused a type mismatch
  // (notably `onError`) because the signatures differ between Image and SvgUri.
  if (isSvgUrl) {
    return <SvgUri uri={src} style={style} />;
  }

  if (typeof src !== 'string') {
    const SvgComponent = src;
    return (
      // Some svg components expect width/height props or style. We forward
      // style and basic width/height extracted from the style object.
      <SvgComponent style={flatStyle} width={flatStyle?.width} height={flatStyle?.height} {...props} />
    );
  }

  return <Image source={{ uri: src }} style={style} {...props} />;
};

export default SvgRenderer;