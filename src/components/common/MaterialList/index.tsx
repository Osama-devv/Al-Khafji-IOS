import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { MaterialCardListProps } from "@appTypes/type";
import MaterialCard from "../MaterialCard";

interface Props extends MaterialCardListProps {
    rtl?: boolean;
}

const MaterialList: React.FC<Props> = ({ data, rtl = false }) => {
    return (
        <FlatList
            horizontal
            inverted={rtl}
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MaterialCard item={item} rtl={rtl} />}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            contentContainerStyle={styles.listContent}
        />
    );
};

export default MaterialList;

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: 16,
    },
});
