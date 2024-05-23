/**
 * @format
 */

import {decode, encode} from 'base-64';
import {AppRegistry, LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import {name as appName} from './app.json';
import App from './src/App';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
