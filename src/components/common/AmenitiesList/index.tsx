import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import GridIcon from "@assets/images/svgs/grid.svg";
import { AmenitiesListProps, AmenityItem } from "@appTypes/type";
import Separator from "../Separator";
import { colors } from "@theme/colors";
import SvgRenderer from "../SvgRenderer/SvgRender";
import { $flexDirection } from "@theme/view";

const AmenitiesList: React.FC<AmenitiesListProps> = ({
    data,
    appLanguage,
    iconColor = colors.palette.primaryColor,
}) => {
    return (
        <View style={styles.container}>
            {data.map((item: AmenityItem, index: number) => (
                <View key={item.id}>
                    <View style={[styles.row, $flexDirection(appLanguage)]}>
                        {item?.icon ?
                        <SvgRenderer src={item.icon} style={{width: 24, height: 24}} />
                        :
                        <GridIcon
                            width={24}
                            height={24}
                            color={iconColor}
                        />}

                        <Text style={styles.title}>{item.title}</Text>
                    </View>

                    {index !== data.length - 1 && <Separator style={styles.divider} />}
                </View>
            ))}
        </View>
    );
};

export default AmenitiesList;

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    row: {
        width: "100%",
        paddingVertical: 14,
        paddingHorizontal: 5,
        alignItems: "center",
        gap: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: "400",
        color: colors.palette.textSecondary,
        fontFamily: "Sakkal Majalla",
    },
    divider: {
        marginLeft: 6,
    },
});
