import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 20C14.5899 20 17.5 17.0899 17.5 13.5C17.5 9.91015 14.5899 7 11 7C7.41018 7 4.50003 9.91015 4.50003 13.5C4.50003 17.0899 7.41018 20 11 20Z" stroke-width="2" stroke-miterlimit="10"/>
<path d="M19.4266 7.24215C20.3206 6.99026 21.2582 6.93287 22.1763 7.07386C23.0944 7.21486 23.9716 7.55095 24.7488 8.0595C25.526 8.56805 26.1853 9.23726 26.6821 10.022C27.1789 10.8068 27.5018 11.689 27.629 12.6091C27.7562 13.5291 27.6848 14.4658 27.4195 15.3559C27.1542 16.2461 26.7013 17.069 26.0911 17.7694C25.481 18.4697 24.7279 19.0312 23.8825 19.416C23.0371 19.8008 22.1191 19.9999 21.1903 20"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.99951 24.6746C3.01468 23.2306 4.36238 22.052 5.92882 21.2384C7.49527 20.4248 9.23448 20.0001 10.9996 20C12.7648 19.9999 14.504 20.4246 16.0705 21.238C17.637 22.0515 18.9848 23.23 20.0001 24.6739" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.1902 20C22.9555 19.9987 24.6952 20.4228 26.2618 21.2364C27.8284 22.05 29.176 23.2291 30.1903 24.6739" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default ({ color }) => {
  return <SvgXml xml={xml} stroke={color} width="100%" height="100%" />;
};
