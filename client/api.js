import Constants from 'expo-constants';
import axios from 'axios';
import config from './config';

const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost
  .split(`:`)
  .shift()
  .concat(`:3000`)}`;

// https://stackoverflow.com/questions/57433401/react-native-expo-localhost-request-not-work-on-android-emulator

export default axios.create({
  baseURL: config.SERVER_URL || uri,
  headers: {
    'Content-type': 'application/json',
  },
});
