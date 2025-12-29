import React from 'react';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { BlurView } from '@react-native-community/blur';
import { Platform } from 'react-native';

export interface IProps {
    props: BottomSheetBackdropProps;
}

const CustomBackDrop = ({ props }: IProps) => {
    return (
        <>
            <BlurView
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
                blurType="light"
                blurAmount={1}
                reducedTransparencyFallbackColor="white"
            />
            <BottomSheetBackdrop
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior={'close'}
                opacity={Platform.OS === 'ios' ? 0.4 : 0.2}
                {...props}
            />
        </>
    );
};

export default CustomBackDrop;
