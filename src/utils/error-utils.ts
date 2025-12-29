import { FLASH_MESSAGE_DURATION } from '../constants';
import { colors } from '../theme/colors';
import { $flashMessage } from '../theme/view';
import { TouchableOpacity } from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import React from 'react';

export const showErrorMsg = (msgStr: string): void =>
    showMessage({
        message: msgStr,
        type: 'danger',
        duration: FLASH_MESSAGE_DURATION,
    });

export const showWarningMsg = (msgStr: string): void =>
    showMessage({
        message: msgStr,
        type: 'warning',
        duration: FLASH_MESSAGE_DURATION,
    });

export const showSuccessMsg = (
    flashMessageIcon?: JSX.Element,
    title?: string,
    subTitle?: string,
): void => {
    return showMessage({
        position: 'top',
        backgroundColor: colors.palette.success600,
        titleStyle: {
            color: 'transparent',
        },
        hideOnPress: false,
        textStyle: { fontFamily: 'AvenirNext-Regular' },
        style: $flashMessage,
        autoHide: false,
        message: 'message',
    });
};

export const showUnFavoriteMsg = (
    flashMessageIcon?: JSX.Element,
    title?: string,
    subTitle?: string,
): void => {
    return showMessage({
        position: 'top',
        backgroundColor: '#D92D20',
        titleStyle: {
            color: 'transparent',
        },
        hideOnPress: false,
        textStyle: { fontFamily: 'AvenirNext-Regular' },
        style: $flashMessage,
        autoHide: false,
        message: 'message',
    });
};
