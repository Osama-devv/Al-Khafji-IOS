// CountryItem.js
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { $countryData, $flexDirection } from '@theme/view';
// import { $buttonFont, $textRight } from '@theme/text';
import { Text, View } from 'react-native';
import { LanguageEnum } from '@appTypes/enums';

const CountryItem = ({ item, appLanguage, setSelectedCountry }: IProps) => {
    return (
        <TouchableOpacity
            style={{ marginVertical: 2 }}
            onPress={() => {
                console.log('OnPressed');
                setSelectedCountry(item);
            }}>
            <View
                style={[$flexDirection(appLanguage), {gap: 8, paddingHorizontal: 12, paddingVertical: 12}]}>
                <FastImage
                    source={item.flag}
                    resizeMode={'cover'}
                    alt={item.name}
                    style={$countryData(appLanguage)}
                />
                <Text
                    // style={($textRight(appLanguage), $buttonFont)}
                    >{`+${item.callingCode}`}</Text>
                <Text
                    // style={($textRight(appLanguage), $buttonFont)}
                   >{`${item.name}`}</Text>
            </View>
        </TouchableOpacity>
    );
};

interface IProps {
    item: any;
    setSelectedCountry: (item: any) => void;
    appLanguage?: LanguageEnum;
}

export default memo(CountryItem);
