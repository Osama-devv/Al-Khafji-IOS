import React, { ErrorInfo } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
// import { $ladyBugImageStyle } from '@theme/image';
// import { Screen, Text } from '@components/index';
// import { colors, spacing } from '@theme/index';
// import { icons } from '@assets/images/icons';

export interface ErrorDetailsProps {
    error: Error;
    errorInfo?: ErrorInfo;
    onReset(): void;
}

export function ErrorDetails({}: ErrorDetailsProps) {
    return (
        // <Screen
        //     preset="fixed"
        //     safeAreaEdges={['top', 'bottom']}
        //     contentContainerStyle={$contentContainer}>
        //     <View style={$topSection}>
        //         <Image style={$ladyBugImageStyle} source={icons.ladyBug} />
        //         <Text
        //             style={$heading}
        //             preset="subheading"
        //             tx={'errorScreen.title'}
        //         />
        //         <Text tx={'errorScreen.subtitle'} />
        //     </View>
        // </Screen>
        <Text>Error Details Screen</Text>
    );
}

// const $contentContainer: ViewStyle = {
//     alignItems: 'center',
//     backgroundColor: colors.background,
//     paddingHorizontal: spacing.large,
//     paddingTop: spacing.extraLarge,
//     flex: 1,
// };

// const $topSection: ViewStyle = {
//     flex: 1,
//     alignItems: 'center',
// };

// const $heading: TextStyle = {
//     color: colors.error,
//     marginBottom: spacing.medium,
// };
