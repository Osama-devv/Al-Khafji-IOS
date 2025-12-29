import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SvgRenderer from "@components/common/SvgRenderer/SvgRender";
import ChatLines from "@assets/images/svgs/chat-lines.svg";
import LanguageIcon from "@assets/images/svgs/language.svg";
import NavArrowRight from "@assets/images/svgs/nav-arrow-right.svg";
import { LanguageEnum } from "@appTypes/enums";
import { $flexDirection } from "@theme/view";
import { colors } from "@theme/colors";

interface Props {
    type?: "language" | "support";
    title?: string;
    appLanguage: LanguageEnum;
    onPress?: () => void;
}

const SettingItem = ({ type, title, appLanguage, onPress }: Props) => {
    const isRtl = appLanguage === LanguageEnum.AR;

    const leftIcon = type === "language" ? LanguageIcon : ChatLines;

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={[styles.container, $flexDirection(appLanguage)]}>

                <View
                    style={[
                        styles.leftContent,
                        isRtl && { flexDirection: "row-reverse" }
                    ]}
                >
                    <SvgRenderer
                        src={leftIcon}
                        style={{
                            height: 20,
                            width: 20,
                            marginRight: isRtl ? 0 : 8,
                            marginLeft: isRtl ? 8 : 0,
                        }}
                    />

                    <Text style={styles.title}>{title}</Text>
                </View>

                {type === "language" ? (
                    <View
                        style={[
                            styles.rightContent,
                            isRtl && { flexDirection: "row-reverse" }
                        ]}
                    >
                        <Text style={styles.langText}>
                            {appLanguage === LanguageEnum.EN ? "English" : "Arabic"}
                        </Text>

                        <NavArrowRight
                            width={20}
                            height={20}
                            style={[
                                isRtl && { transform: [{ scaleX: -1 }] },
                                isRtl ? { marginLeft: 2 } : { marginRight: 2 }
                            ]}
                        />
                    </View>
                ) : (
                    <NavArrowRight
                        width={20}
                        height={20}
                        style={[
                            isRtl && { transform: [{ scaleX: -1 }] },
                            isRtl ? { marginLeft: 2 } : { marginRight: 2 }
                        ]}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 16,
        justifyContent: "space-between",
        alignItems: "center",
    },

    leftContent: {
        flexDirection: "row",
        alignItems: "center",
    },

    rightContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    title: {
        fontFamily: "Charter",
        fontSize: 16,
        fontWeight: "600",
        color: colors.palette.black,
    },

    langText: {
        fontFamily: "Charter",
        fontSize: 16,
        fontWeight: "400",
        color: colors.palette.dullText,
    },
});

export default SettingItem;
