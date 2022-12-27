/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-reanimated';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // onDisplayNotification({
  //   title: remoteMessage.notification.title,
  //   body: remoteMessage.notification.body,
  //   payload: remoteMessage.notification.android.imageUrl,
  // });
});

AppRegistry.registerHeadlessTask('SomeTaskName', () =>
  require('./SomeTaskName'),
);
AppRegistry.registerComponent(appName, () => App);
