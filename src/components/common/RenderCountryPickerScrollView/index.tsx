import React, { memo, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, Text, View } from 'react-native';
import { delayExecution } from '@utils/helpers';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';
import { LanguageEnum } from '@appTypes/enums';
import CountryItem from '../CountryItem';

const RenderCountryPickerScrollView = ({
    filteredCountryList,
    setSheetLoading,
    setSelectedCountryCode,
    setIsVisible,
    appLanguage,
}: IProps) => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [renderedData, setRenderedData] = useState(
        filteredCountryList.slice(0, itemsPerPage),
    );

    const handlePagination = () => {
        const nextPage = currentPage + 1;
        const endIndex = nextPage * itemsPerPage;
        const newData = filteredCountryList.slice(0, endIndex);
        setRenderedData(newData);
        setCurrentPage(nextPage);
    };

    useEffect(() => {
        handlePagination(); // Initial data load
        //@ts-ignore
    }, [filteredCountryList]); // Note: It's safe to use useEffect here

    const NoRecordFound = () => {
        return (
            <View>
                <Text
                    style={[
                        {
                            fontFamily: 'SuisseIntl-Bold',
                            fontSize: 18,
                            color: '#000',
                            textAlign: 'center',
                            width: '100%',
                            textTransform: 'uppercase',
                            lineHeight: 34,
                            includeFontPadding: true,
                            paddingHorizontal: 20,
                        },
                    ]}>
                    {'labels.noRecordsFound'}
                </Text>
            </View>
        );
    }

    return (
        <ScrollView>
            {/* <View> */}
                <FlatList
                    data={renderedData}
                    ListEmptyComponent={<NoRecordFound />}
                    renderItem={({ item }) => (
                        <CountryItem
                            item={item}
                            appLanguage={appLanguage}
                            setSelectedCountry={() => {
                                setSheetLoading(true);
                                delayExecution(() => {
                                    setIsVisible(false);
                                    delayExecution(() => {
                                        setSelectedCountryCode(item);
                                    }, 1500);
                                }, 1000);
                            }}
                        />
                    )}
                    keyExtractor={(item, index) => item.alpha2Code || `country-${index}`}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    windowSize={20} // Number of items to keep in the render window
                    initialNumToRender={itemsPerPage}
                    maxToRenderPerBatch={itemsPerPage}
                    onEndReached={handlePagination}
                    onEndReachedThreshold={0.1} // Trigger onEndReached when reaching 10% from the bottom
                />
            {/* </View> */}
        </ScrollView>
    );
};

interface ICountry {
    name: string;
    name_ar: string;
    flag: any;
    alpha2Code: string;
    callingCode: string;
    FIELD6?: null;
    FIED6?: null;
    FIEL6?: null;
    FILD6?: null;
    [key: string]: any; // Allow additional properties
}

interface IProps {
    filteredCountryList: ICountry[] | any[];
    setSheetLoading: (value: boolean) => void;
    setIsVisible: (value: boolean) => void;
    setSelectedCountryCode: (item: any) => void;
    appLanguage?: LanguageEnum;
}

export default memo(RenderCountryPickerScrollView);
