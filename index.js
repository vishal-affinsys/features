/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-reanimated';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerHeadlessTask('SomeTaskName', () =>
  require('./SomeTaskName'),
);
AppRegistry.registerComponent(appName, () => App);
