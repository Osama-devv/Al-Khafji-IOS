import { LanguageEnum } from "@appTypes/enums";
import { TextStyle, ViewStyle } from "react-native";

export const $flexDirection = (appLanguage?: LanguageEnum): ViewStyle => {
    return {
        flexDirection: appLanguage === LanguageEnum.EN ? 'row' : 'row-reverse',
    };
};
export const $alignLeftRight = (appLanguage: string): ViewStyle => {
    return {
        justifyContent:
            appLanguage === LanguageEnum.EN ? 'flex-start' : 'flex-end',
    };
};
export const $alignItems = (appLanguage: string): ViewStyle => {
    return {
        alignItems: appLanguage === LanguageEnum.EN ? 'flex-start' : 'flex-end',
    };
};
export const $textAlign = (appLanguage: string): TextStyle => {
    return {
        textAlign: appLanguage === LanguageEnum.EN ? 'left' : 'right',
    };
};

export const $directionRtl = (appLanguage?: LanguageEnum): ViewStyle => {
    return {
        direction: appLanguage === LanguageEnum.EN ? 'ltr' : 'rtl',
    };
};


export const $countryData = (appLanguage: LanguageEnum): ViewStyle => {
    return {
        height: 20,
        width: 25,
        marginRight: appLanguage === LanguageEnum.EN ? 4 : undefined,
        marginLeft: appLanguage === LanguageEnum.AR ? 4 : undefined,
    };
};