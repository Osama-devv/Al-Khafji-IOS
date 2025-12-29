import { Dimensions, InteractionManager, PermissionsAndroid, Platform } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { delayExecution } from '@utils/helpers';
import { Buffer } from "buffer"; 

export const window = Dimensions.get('window');
export const windowWidth = window.width;
export const windowHeight = window.height;

export const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
        try {
            if (Platform.Version >= 33) {
                // ✅ Android 13+ → No storage permission needed for downloads using MediaStore
                return true;
            } else {
                // ✅ Android 12 and below → Request WRITE_EXTERNAL_STORAGE
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message: 'App needs access to your storage to download files',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    return true; // ✅ iOS does not require storage permissions
};

export const mergeDateDay = (day: string, date: string) => {
    if (day !== undefined && date !== undefined) {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            month: 'short', // Short month name (e.g., Oct)
            day: 'numeric', // Day of the month (e.g., 23)
        });

        const result = `${formattedDate}, ${day}`;
        console.log(result); // This will display "Oct 23, Day 2" in the console.
        return result;
    }
};

export const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};

export const useIsReady = () => {
    const [isReady, setIsReady] = useState(false);

    useFocusEffect(
        useCallback(() => {
            InteractionManager.runAfterInteractions(() => {
                delayExecution(() => setIsReady(true), 500);
            });

            return () => {
                delayExecution(() => {
                    setIsReady(false);
                }, 500);
            };
        }, []),
    );

    return isReady;
};

export function customEncrypt(plainText: string) {
    let SECRET_KEY = process.env.SECRET__KEY;
    let encryptedText = "";
    for (let i = 0; i < plainText.length; i++) {
        encryptedText += String.fromCharCode(plainText.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length));
    }
    
    return Buffer.from(encryptedText).toString("base64"); 
}
export function customDecrypt(encryptedText: string) {
    let SECRET_KEY = process.env.SECRET__KEY;
    let decodedText = Buffer.from(encryptedText, "base64").toString();
    let decryptedText = "";
    for (let i = 0; i < decodedText.length; i++) {
        decryptedText += String.fromCharCode(decodedText.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length));
    }
    return decryptedText;
}