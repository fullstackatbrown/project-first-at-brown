import axios from 'axios';
import config from './config';

// const { manifest } = Constants;
const uri = 'localhost'; // `http://${manifest.debuggerHost.split(`:`).shift().concat(`:80`)}`;

// https://stackoverflow.com/questions/57433401/react-native-expo-localhost-request-not-work-on-android-emulator

console.log(`${config.SERVER_URL || uri}`);

export default axios.create({
  baseURL: `${config.SERVER_URL || uri}`,
  headers: {
    'Content-type': 'application/json',
  },
});
