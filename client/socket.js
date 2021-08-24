import Constants from 'expo-constants';
import { io } from 'socket.io-client';

const { manifest } = Constants;
const URL = `http://${manifest.debuggerHost
  .split(`:`)
  .shift()
  .concat(`:3000`)}`;

const socket = io(URL, { autoConnect: false });

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

export default socket;
