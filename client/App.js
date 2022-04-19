import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './redux/store';
import EntryScreen from './components/EntryScreen';

// import * as Sentry from 'sentry-expo';

// Sentry.init({
//   dsn: 'https://e7f5b63f16064f8ab196786fa33d6e06@o1139897.ingest.sentry.io/6196553',
//   enableInExpoDevelopment: true,
//   debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
// });

// if (Platform.OS === 'android') {
//   // only android needs polyfill
//   require('intl'); // import intl object
//   require('intl/locale-data/jsonp/en-IN'); // load the required locale details
// }

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FBFBFB',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer theme={MyTheme}>
          <EntryScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
