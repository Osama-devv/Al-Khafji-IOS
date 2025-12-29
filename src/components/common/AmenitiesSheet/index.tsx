import React from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import Sheet from "@components/common/sheet";
import Separator from "@components/common/Separator";
import { colors } from "@theme/colors";
import { images } from "assets/images";
import { LanguageEnum } from "@appTypes/enums";
import CrossSvg from "@assets/images/svgs/cross.svg";
import GridSvg from "@assets/images/svgs/grid.svg";
import SparksSvg from "@assets/images/svgs/sparks.svg";
import HomeSvg from "@assets/images/svgs/home.svg";
import InfoSvg from "@assets/images/svgs/infoCircle.svg";
import ClosetSvg from "@assets/images/svgs/closet.svg";
import AirplaneSvg from "@assets/images/svgs/airplane-helix-45deg.svg";
import BathroomSvg from "@assets/images/svgs/bathroom.svg";
import LogOutSvg from "@assets/images/svgs/log-out.svg";
import SoapSvg from "@assets/images/svgs/soap.svg";

interface AmenitiesSheetProps {
    show: boolean;
    onClose: () => void;
    appLanguage?: LanguageEnum;
}

const SECTIONS = [
    {
        title: "Primary Bedroom",
        items: [
            { label: "Walk-in closet", icon: ClosetSvg },
            { label: "Ceiling fan", icon: AirplaneSvg },
            { label: "Full bath", icon: BathroomSvg },
            { label: "Outside access", icon: LogOutSvg },
        ]
    },
    {
        title: "Primary Bathroom",
        items: [
            { label: "Soaking tub", icon: BathroomSvg },
            { label: "Separate tub/shower", icon: BathroomSvg },
            { label: "Vanity", icon: SoapSvg },
        ]
    },
    {
        title: "Living Room",
        items: [
            { label: "Soaking tub", icon: ClosetSvg },
            { label: "Separate tub/shower", icon: AirplaneSvg },

        ]
    },
    {
        title: "Kitchen",
        items: [
            { label: "Kitchen Island", icon: GridSvg },
            { label: "Pantry", icon: HomeSvg },
        ]
    }
];

const AmenitiesSheet: React.FC<AmenitiesSheetProps> = ({
    show,
    onClose,
    appLanguage = LanguageEnum.EN,
}) => {
    const isRtl = appLanguage === LanguageEnum.AR;
  

    return (
        <Sheet
            show={show}
            snapPoints={["95%"]}
            index={0}
            sheetHeaderText="Features and Amenities"
            onSheetClosed={onClose}
            appLanguage={appLanguage}
            backgroundImage={images.residenceBg}
            rightIcon={CrossSvg}
            rightIconPress={onClose}
            hideHeaderSeparator={true}
            
        >
             <ScrollView
                contentContainerStyle={[
                    styles.container,
                ]}
                showsVerticalScrollIndicator={false}
            >
                {SECTIONS.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.section}>
                        <View style={styles.card}>
                            <Text style={[styles.sectionTitle, { textAlign: isRtl ? "right" : "left" }]}>
                                {section.title}
                            </Text>

                            <Separator />

                            {section.items.map((item, itemIndex) => (
                                <View key={itemIndex}>
                                    <View style={[styles.itemRow, { flexDirection: isRtl ? "row-reverse" : "row" }]}>
                                        <item.icon
                                            width={24}
                                            height={24}
                                            color={colors.palette.primaryColor}
                                            style={[styles.icon, isRtl ? { marginLeft: 16, marginRight: 0 } : { marginRight: 16 }]}
                                        />
                                        <Text style={[styles.itemText, { textAlign: isRtl ? "right" : "left" }]}>
                                            {item.label}
                                        </Text>
                                    </View>

                                    {itemIndex < section.items.length - 1 && (
                                        <Separator />
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
                <View style={{ height: 40 }} />
            </ScrollView>
        </Sheet>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 24,
        width: "100%",
    },
    sectionTitle: {
        fontFamily: "Charter",
        fontSize: 16,
        color: colors.textPrimary,
        marginBottom: 12,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    card: {
        backgroundColor: "#FCFBF9",
        borderRadius: 2,
        width: "100%",
        overflow: "hidden",
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    icon: {
        marginRight: 16,
    },
    itemText: {
        fontFamily: "Sakkal Majalla",
        fontSize: 22,
        color: colors.textPrimary,
    },
});

export default AmenitiesSheet;
