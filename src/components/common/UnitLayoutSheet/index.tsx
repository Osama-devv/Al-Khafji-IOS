import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView, Dimensions } from "react-native";
import Sheet from "@components/common/sheet";
import CustomButton from "@components/common/CustomButton";
import { colors } from "@theme/colors";
import { images } from "assets/images";
import Separator from "@components/common/Separator";
import DownloadSvg from "@assets/images/svgs/download-black.svg";
import DownloadSvg2 from "@assets/images/svgs/download2-black.svg";

import CrossSvg from "@assets/images/svgs/cross.svg";
import { LanguageEnum } from "@appTypes/enums";

interface UnitLayoutSheetProps {
    show: boolean;
    onClose: () => void;
    appLanguage?: LanguageEnum;
}

const { width, height } = Dimensions.get("window");

const DATA = {
    "Ground Floor": {
        image: images.unitLg,
        items: [
            "Majlis and guest toilet",
            "Dining and family living",
            "Main kitchen & secondary prep area",
            "Maid's suite and service circulation",
            "Courtyard with pool",
            "Driver's suite and entry foyer",
        ],
    },
    "First Floor": {
        image: images.residentDetail,
        items: [
            "Master bedroom suite",
            "Children’s bedrooms",
            "Family living lounge",
            "Balcony and terrace spaces",
            "Staircase and storage area",
            "Family kitchenette",
        ],
    },
};

const TABS = Object.keys(DATA);

type TabKey = keyof typeof DATA;

const UnitLayoutSheet: React.FC<UnitLayoutSheetProps> = ({
    show,
    onClose,
    appLanguage = LanguageEnum.EN,
}) => {
    const [activeTab, setActiveTab] = useState<TabKey>(TABS[0] as TabKey);
    const isRtl = appLanguage === LanguageEnum.AR;

    return (
        <Sheet
            show={show}
            snapPoints={["95%"]}
            index={0}
            sheetHeaderText="Unit Layout"
            onSheetClosed={onClose}
            appLanguage={appLanguage}
            backgroundImage={images.residenceBg}
            centerHeader={true}
            rightIcon={CrossSvg}
            rightIconPress={onClose}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[styles.tabContainer, { flexDirection: isRtl ? "row-reverse" : "row" }]}>
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <CustomButton
                                key={tab}
                                title={tab}
                                variant="clear"
                                size="tabMd"
                                onPress={() => setActiveTab(tab as TabKey)}
                                backgroundColor={isActive ? colors.tabactive : "transparent"}
                                activeBorderColor={isActive ? "#92b9bb" : colors.borderColor}
                                style={[
                                    styles.tabButton,
                                    isActive ? { borderWidth: 1 } : { borderWidth: 0 },
                                ]}
                                textStyle={{
                                    fontFamily: "Charter",
                                    color: isActive ? colors.palette.white : colors.textPrimary,
                                }}
                            />
                        );
                    })}
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        source={DATA[activeTab].image}
                        style={styles.floorPlanImage}
                        resizeMode="cover"
                    />
                </View>

                <View style={[styles.actionButtonsContainer, { flexDirection: isRtl ? "row-reverse" : "row" }]}>
                    <TouchableOpacity style={styles.iconButton}>
                        <DownloadSvg width={20} height={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <DownloadSvg2 width={20} height={20} stroke="black" />

                    </TouchableOpacity>
                </View>

                <View style={styles.fullSeparator}>
                    <Separator />
                </View>

                <View style={styles.listContainer}>
                    {DATA[activeTab].items.map((item, index) => (
                        <View key={index}>
                            <View style={styles.listItem}>
                                <Text style={[styles.listItemText, { textAlign: isRtl ? "right" : "left" }]}>
                                    {item}
                                </Text>
                            </View>

                            {index < DATA[activeTab].items.length - 1 && (
                                <View style={styles.itemSeparator}>
                                    <Separator />
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </Sheet>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        alignItems: "center",
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: colors.palette.buttonBackground,
        borderRadius: 2,
        marginBottom: 24,
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    tabButton: {
        flex: 1,
        borderRadius: 2,
    },
    imageContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 16,
    },
    floorPlanImage: {
        width: width - 32,
        height: height * 0.45
    },
    actionButtonsContainer: {
        flexDirection: "row",
        gap: 16,
        marginBottom: 24,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 2,
        backgroundColor: colors.palette.white,
        justifyContent: "center",
        alignItems: "center",
        borderColor: colors.palette.greyBorderColor,
        borderWidth: 0.3,
    },
    fullSeparator: {
        width: width,
        marginLeft: -16,
        marginBottom: 8,
    },
    listContainer: {
        width: "100%",
    },
    listItem: {
        paddingVertical: 16,
    },
    listItemText: {
        fontSize: 26,
        fontFamily: "Sakkal Majalla",
        color: colors.textPrimary,
        textAlign: "left",
    },
    itemSeparator: {
        width: "97%",
    },
});

export default UnitLayoutSheet;
