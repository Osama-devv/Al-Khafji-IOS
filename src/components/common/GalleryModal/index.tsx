import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity,
    Animated,
    StatusBar,
    Platform,
} from "react-native";

import Carousel from "react-native-reanimated-carousel";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";

import AnimatedReanimated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    useAnimatedScrollHandler,
} from "react-native-reanimated";

import { colors } from "@theme/colors";
import BackSvg from "assets/images/svgs/backIcon.svg";

const SCREEN_WIDTH = Dimensions.get("window").width;

const IMAGE_ASPECT_RATIO = 393 / 229;
const IMAGE_HEIGHT = SCREEN_WIDTH / IMAGE_ASPECT_RATIO;

const THUMB_WIDTH = 213;
const THUMB_MARGIN = 10;
const ACTIVE_LINE_WIDTH = 229;
const THUMB_PADDING = 8;

const UNDERLINE_OFFSET = 4;

export interface GalleryItem {
    image: string | number;
    title?: string;
    subtitle?: string;
}

interface GalleryModalProps {
    visible: boolean;
    items: GalleryItem[];
    initialIndex: number;
    onClose: () => void;
    rtl?: boolean;
    loop?: boolean; // Enable circular navigation with wrap-around
}

const GalleryModal: React.FC<GalleryModalProps> = ({
    visible,
    items,
    initialIndex,
    onClose,
    rtl = false,
    loop = false,
}) => {
    const [activeIndex, setActiveIndex] = useState(initialIndex);

    const opacityAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    const [fixedUnderlineWidth, setFixedUnderlineWidth] = useState(ACTIVE_LINE_WIDTH);

    useEffect(() => {
        if (visible) {
            setActiveIndex(initialIndex);
            underlineX.value = initialIndex * (THUMB_WIDTH + THUMB_MARGIN);

            Animated.parallel([
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            opacityAnim.setValue(0);
            scaleAnim.setValue(0.9);
        }
    }, [visible, initialIndex]);

    const mainCarouselRef = useRef<any>(null);
    const thumbRef = useRef<any>(null);

    const scale = useSharedValue(1);

    const pinch = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = e.scale;
        })
        .onEnd(() => {
            scale.value = withTiming(1, { duration: 150 });
        });

    const zoomStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }, { scaleX: rtl ? -1 : 1 }],
    }));

    const underlineX = useSharedValue(
        initialIndex * (THUMB_WIDTH + THUMB_MARGIN)
    );

    const scrollOffset = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollOffset.value = event.contentOffset.x;
        },
    });


    const containerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: rtl ? scrollOffset.value : -scrollOffset.value }
            ],
        };
    });

    const activeUnderlineStyle = useAnimatedStyle(() => {
        const centerOffset = (ACTIVE_LINE_WIDTH - THUMB_WIDTH) / 2;

        const targetPos = underlineX.value - centerOffset + THUMB_PADDING;

        if (rtl) {
            return {
                transform: [{ translateX: -targetPos }]
            };
        }

        return {
            transform: [{ translateX: targetPos }]
        };
    });

    const handleSnap = (index: number) => {
        setActiveIndex(index);

        underlineX.value = withTiming(
            index * (THUMB_WIDTH + THUMB_MARGIN),
            { duration: 200 },
        );

        thumbRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
        });
    };

    const calculateShortestPath = (currentIndex: number, targetIndex: number, isCircular: boolean = false): number => {
        const totalItems = items.length;

        if (currentIndex === targetIndex) {
            return targetIndex;
        }

        if (!isCircular) {
            return targetIndex;
        }

        const forwardDistance = targetIndex > currentIndex
            ? targetIndex - currentIndex
            : totalItems - currentIndex + targetIndex;

        const backwardDistance = currentIndex > targetIndex
            ? currentIndex - targetIndex
            : totalItems - targetIndex + currentIndex;

        return targetIndex;
    };

    const navigateToIndex = (targetIndex: number) => {
        const optimalTarget = calculateShortestPath(activeIndex, targetIndex, loop);

        mainCarouselRef.current?.scrollTo({
            index: optimalTarget,
            animated: false
        });

        setActiveIndex(optimalTarget);

        underlineX.value = withTiming(
            optimalTarget * (THUMB_WIDTH + THUMB_MARGIN),
            { duration: 300 },
        );

        thumbRef.current?.scrollToIndex({
            index: optimalTarget,
            animated: true,
            viewPosition: 0.5,
        });
    };

    const renderThumb = ({ item, index }: { item: GalleryItem; index: number }) => {
        const isActive = index === activeIndex;

        return (
            <TouchableOpacity
                disabled={index === activeIndex}
                onPress={() => {
                    navigateToIndex(index);
                }}
                style={{
                    width: THUMB_WIDTH,
                    [rtl ? "marginLeft" : "marginRight"]: THUMB_MARGIN,
                }}
            >
                <View>
                    <Image
                        source={typeof item.image === "string" ? { uri: item.image } : item.image}
                        style={styles.thumbImage}
                    />

                    <Text style={[styles.thumbTitle, { textAlign: rtl ? "right" : "left" }]}>
                        {item.title}
                    </Text>

                    <Text
                        style={[
                            styles.thumbSubtitle,
                            { textAlign: rtl ? "right" : "left" },
                        ]}
                    >
                        {item.subtitle}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };


    const totalWidth = items.length * (THUMB_WIDTH + THUMB_MARGIN) + THUMB_PADDING * 2;



    return (
        <Modal visible={visible} animationType="none">
            <StatusBar backgroundColor="black" barStyle="light-content" />

            <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
                <Animated.View
                    style={[styles.modalRoot, { transform: [{ scale: scaleAnim }] }]}
                >
                    <SafeAreaView style={{ backgroundColor: colors.palette.black }}>
                        <View
                            style={[
                                styles.header,
                                { flexDirection: rtl ? "row-reverse" : "row" },
                            ]}
                        >
                            <TouchableOpacity onPress={onClose}>
                                <View style={{ transform: [{ rotate: rtl ? "180deg" : "0deg" }] }}>
                                    <BackSvg width={15} height={15} />
                                </View>
                            </TouchableOpacity>

                            <Text style={styles.headerTitle}>Gallery</Text>

                            <Text style={styles.counter}>{activeIndex + 1} / {items.length}</Text>
                        </View>
                    </SafeAreaView>


                    <View style={styles.contentArea}>
                        <Animated.View
                            style={[
                                styles.imageWrapper,
                                {
                                    transform: [{ scaleX: rtl ? -1 : 1 }],
                                },
                            ]}
                        >
                            <Carousel
                                ref={mainCarouselRef}
                                width={SCREEN_WIDTH}
                                height={IMAGE_HEIGHT}
                                data={items}
                                defaultIndex={initialIndex}
                                onSnapToItem={handleSnap}
                                loop={loop}
                                renderItem={({ item }) => (
                                    <GestureDetector gesture={pinch}>
                                        <AnimatedReanimated.Image
                                            source={
                                                typeof item.image === "string"
                                                    ? { uri: item.image }
                                                    : item.image
                                            }
                                            style={[styles.mainImage, zoomStyle]}
                                        />
                                    </GestureDetector>
                                )}
                            />
                        </Animated.View>

                        <View style={styles.thumbnailBar}>
                            <AnimatedReanimated.View style={[
                                {
                                    width: totalWidth,
                                    height: 2,
                                    position: "absolute",
                                    bottom: 10,
                                    left: rtl ? undefined : 0,
                                    right: rtl ? 0 : undefined,
                                },
                                containerAnimatedStyle
                            ]}>
                                <View style={styles.inactiveFullLine} />
                                <AnimatedReanimated.View
                                    style={[
                                        styles.activeLine,
                                        {
                                            left: rtl ? undefined : 0,
                                            right: rtl ? 0 : undefined
                                        },
                                        activeUnderlineStyle
                                    ]}
                                />
                            </AnimatedReanimated.View>


                            <AnimatedReanimated.FlatList
                                ref={thumbRef}
                                horizontal
                                inverted={rtl}
                                data={items}
                                renderItem={renderThumb}
                                keyExtractor={(_, i) => i.toString()}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingHorizontal: THUMB_PADDING,
                                }}
                                onScroll={scrollHandler}
                                scrollEventThrottle={16}
                            />
                        </View>

                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

export default GalleryModal;

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.95)" },
    modalRoot: { flex: 1, backgroundColor: colors.palette.black },

    header: {
        backgroundColor: colors.palette.black,
        borderBottomWidth: 1,
        borderBottomColor: "#2C2C2C",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },

    headerTitle: { color: colors.palette.white, fontSize: 20, fontWeight: "400", fontFamily: "Charter", fontStyle: "normal", },
    counter: { color: colors.palette.white, fontSize: 16, fontFamily: "Charter", fontStyle: "normal" },

    contentArea: { flex: 1 },

    imageWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    mainImage: {
        width: SCREEN_WIDTH,
        height: IMAGE_HEIGHT,
    },

    thumbnailBar: {
        backgroundColor: "#212121",
        borderTopWidth: 1,
        borderTopColor: "#2C2C2C",
        paddingVertical: 10,
        marginVertical: Platform.OS == "ios" ? 20 : undefined,
    },

    thumbImage: {
        width: 213,
        height: 125,
        borderRadius: 2,
    },

    thumbTitle: {
        color: colors.palette.white,
        marginTop: 6,
        fontSize: 14,
        fontFamily: "Charter",
        fontStyle: "normal",
        letterSpacing: -0.24,
    },

    thumbSubtitle: {
        color: "#666",
        fontSize: 14,
        fontFamily: "Charter",
        fontStyle: "normal",
        letterSpacing: -0.,
        marginTop: 2,
        marginBottom: 10,
    },

    underlineContainer: {
        width: THUMB_WIDTH,
        height: 2,
        marginTop: 6,
        position: "relative",
    },

    inactiveLine: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: "#5A5A5A",

    },

    underlineOverlay: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 10,
        height: 2,
        overflow: "visible",
    },

    inactiveFullLine: {
        position: "absolute",
        width: "100%",
        height: 0.5,
        backgroundColor: "#5A5A5A",
    },

    activeLine: {
        position: "absolute",
        width: ACTIVE_LINE_WIDTH,
        height: 1,
        backgroundColor: colors.palette.white,
    },



});
