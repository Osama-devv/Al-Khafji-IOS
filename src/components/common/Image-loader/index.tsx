import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageStyle, StyleSheet, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import { ImageHelper } from '@utils/helpers';
import { images } from 'assets/images';
import { Text } from 'react-native-gesture-handler';
import { LanguageEnum } from '@appTypes/enums';

const ImageLoader = ({
    imageUrl,
    appLanguage,
    style,
    type,
    spinner,
    scale = 1, // New scale prop
}: IProps & { scale?: number }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isSvg, setIsSvg] = useState<boolean>(false);

    useEffect(() => {
        if (imageUrl && imageUrl.toLowerCase().endsWith('.svg')) {
            setIsSvg(true);
        }
    }, []);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <View
            style={[
                styles.container,
                { transform: [{ scale }] }, // Apply scale transformation
            ]}>
            {isSvg ? (
                <SvgUri
                    // style={$logoSpacing(appLanguage)}
                    preserveAspectRatio='xMinYMin meet'
                    height={200}
                    // source={{ uri: ImageHelper(imageUrl) }}
                    onLoad={handleImageLoad}
                    uri={ImageHelper(imageUrl)}
                />
            ) : (
                <FastImage
                    source={
                        !imageUrl
                            ? images.cardbg
                            : { uri: ImageHelper(imageUrl) }
                    }
                    style={style}
                    width={'100%'}
                    resizeMode={'cover'}
                    onLoad={handleImageLoad}
                />
            )}

            {spinner && loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
            ) : null}

            {loading && !spinner && (
                <View style={styles.loader}>
                    {/* <Skeleton style={style} backgroundColor={'gray.50'} />
                     */}
                     <Text>Loading Image...</Text>
                </View>
            )}
        </View>
    );
};
interface IProps {
    appLanguage?: LanguageEnum;
    imageUrl?: string;
    style?: ImageStyle;
    type?: 'speakerListing' | 'partnerListing';
    spinner?: boolean;
}

const styles = StyleSheet.create({
    containerFull: {
        position: 'relative', // Relative positioning for the container
        width: '100%', // Set the width as needed
    },
    container: {
        position: 'relative', // Relative positioning for the container
    },
    loader: {
        position: 'absolute', // Absolute positioning for the loader container
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ImageLoader;
