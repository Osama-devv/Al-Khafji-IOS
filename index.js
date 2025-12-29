/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging'; // 🔥 import this
import App from './src/App';
import {name as appName} from './app.json';

// ✅ Handle background/quit-state messages (for data-only payloads)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📩 Background message received:', remoteMessage);
  // Optional: save it to local storage, show a local notification, etc.
});

AppRegistry.registerComponent(appName, () => App);
