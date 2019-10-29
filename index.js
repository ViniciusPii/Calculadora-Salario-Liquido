import {AppRegistry} from 'react-native';
import App from './src/containers/App';
import './src/config/StatusBar';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
