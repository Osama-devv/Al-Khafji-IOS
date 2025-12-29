import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import CustomButton from "@components/common/CustomButton";
import { colors } from "@theme/colors";
import CurrencySvg from "assets/images/svgs/currencySvg.svg";

interface PriceCTAProps {
    price: string | number;
    onPress?: () => void;
    rtl?: boolean;
}

const PriceCTA: React.FC<PriceCTAProps> = ({ price, onPress, rtl = false }) => {
    return (
        <View style={[styles.container, rtl && { flexDirection: "row-reverse" }]}>
            <View style={[styles.left, rtl && { alignItems: "flex-end" }]}>
                <Text style={styles.label}>From</Text>
                <View style={[styles.priceRow, rtl && { flexDirection: "row-reverse" }]}>
                    <CurrencySvg width={14} height={16} />
                    <Text style={styles.price}>{price}</Text>
                </View>
            </View>

            <View style={[styles.right, rtl && { alignItems: "flex-start", marginRight: "auto" }]}>
                <CustomButton
                    title="Register Interest"
                    onPress={onPress}
                    variant="outline"
                    size="md"
                    backgroundColor={colors.palette.primaryColor}
                    textStyle={styles.buttonText}
                />
            </View>
        </View>
    );
};

export default PriceCTA;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: colors.palette.white,
        paddingVertical: 14,
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        transform: [
            { translateY: Platform.OS === "ios" ? - 8 : 0 }]

    },

    left: {
        width: "50%",
        alignItems: "flex-start",
        justifyContent: "center",

    },

    label: {
        fontSize: 16,
        color: "#666",
        fontFamily: "Charter",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 24,
    },

    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,

    },

    price: {
        fontSize: 18,
        color: colors.textPrimary,
        fontFamily: "Charter",
    },

    right: {
        width: "50%",
        justifyContent: "center",
        alignItems: "flex-end",
    },

    // button: {
    //     width: "100%",
    //     borderRadius: 2,
    //     borderColor: colors.tabactive,
    //     paddingVertical: 0,
    //     height: 44,
    // },

    buttonText: {
        color: colors.palette.white,
        fontSize: 14,
        fontWeight: "600",
    },
});
