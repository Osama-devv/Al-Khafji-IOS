import React from 'react';
import { Platform, Text as RNText } from 'react-native';

export const MyCustomText = ({ style, children, ...rest }: any) => (
    <RNText style={style} {...rest}>
        {children}
        {Platform.OS === 'android' && style && style.lineHeight && (
            <RNText style={{ lineHeight: style.lineHeight + 0.001 }} />
        )}
    </RNText>
);