// import Constants from 'expo-constants';
import config from './config';
import { io } from 'socket.io-client';

// const { manifest } = Constants;
const uri = "localhost" //`http://${manifest.debuggerHost.split(`:`).shift().concat(`:3000`)}`;

const socket = io(`${config.SERVER_URL || uri}:3000`, { autoConnect: false });

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

export default socket;
