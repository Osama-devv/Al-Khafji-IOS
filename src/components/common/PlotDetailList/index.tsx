import React from "react";
import { View } from "react-native";
import Separator from "@components/common/Separator";
import { PlotDetail } from "../PlotDetail";

export interface PlotDetailItem {
    label: string;
    value: string;
}

export interface PlotDetailListProps {
    data: PlotDetailItem[];
    rtl?: boolean;
}

const PlotDetailList: React.FC<PlotDetailListProps> = ({ data, rtl = false }) => {
    return (
        <View>
            {data.map((item, index) => (
                <View key={index}>
                    <PlotDetail label={item.label} value={item.value} rtl={rtl} />

                    {index !== data.length - 1 && (
                        <Separator
                            style={{
                                marginVertical: 4,
                                width: "98%",
                                alignSelf: "center",
                            }}
                        />
                    )}
                </View>
            ))}
        </View>
    );
};

export default PlotDetailList;
