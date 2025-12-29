import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid } from 'react-native';
import { isIos } from '@utils/helpers';
import { BOTTOM_TABS, HOME, NOTIFICATIONS } from '@navigators/navigation-routes';
import { storage } from '@utils/storage';
import { navigate } from '@navigators/navigationService';

export async function requestUserPermission(topic: string): Promise<boolean> {
    if (!isIos()) {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
    }

    await messaging().registerDeviceForRemoteMessages();

    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        if (topic) {
            await messaging().subscribeToTopic(topic);
        }
        await getFCMToken();
        return true; // ✅ Notify caller that permission was granted
    }

    return false; // ❌ Permission denied
}


export async function getFCMToken() {
    try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        return token;
    } catch (error) {
        // console.error('FCM Token Error:', error);
    }
}

export function listenForNotifications() {
    // Foreground notifications
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
        console.log('foreground notification:', remoteMessage);
        Alert.alert(
            remoteMessage.notification?.title || 'New Message',
            remoteMessage.notification?.body || 'You have a new notification'
        );
    });

    // Background & Quit state - when user taps the notification
    const unsubscribeOpened = messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('background');
        handleNotificationRedirect(remoteMessage);
    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log('quit');
                handleNotificationRedirect(remoteMessage);
            }
        });

    return () => {
        unsubscribeForeground();
        unsubscribeOpened();
    };
}

async function handleNotificationRedirect(remoteMessage: any) {
    console.log(remoteMessage, "__________________________________");
    try {
        const chatSpaceIdRaw = remoteMessage?.data?.chatSpaceId;
        const isLoggedIn = storage.getString('isLoggedIn');

        if (!chatSpaceIdRaw) {
            navigate(NOTIFICATIONS);
            return;
        }

        // If user is not logged in but chat data exists → Go to Home
        if (isLoggedIn !== 'true') {
            navigate(BOTTOM_TABS, { screen: HOME });
            return;
        }

        const chatSpaceId = JSON.parse(chatSpaceIdRaw);

        console.log(chatSpaceId);
        if (chatSpaceId?.anotherUser && chatSpaceId?.zroom) {

            // navigate(CHATDETAIL, {
            //   otherUser: chatSpaceId?.anotherUser,
            //   zroom: chatSpaceId?.zroom,
            // });

        } else {

            navigate(NOTIFICATIONS);
        }
    } catch (error) {
        console.warn('Failed to handle notification redirect:', error);

    }
}