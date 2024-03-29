import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.94792 18.0001L4.00006 22.0001V6.00006C4.00006 5.73484 4.10542 5.48049 4.29295 5.29295C4.48049 5.10542 4.73484 5.00006 5.00006 5.00006H21.0001C21.2653 5.00006 21.5196 5.10542 21.7072 5.29295C21.8947 5.48049 22.0001 5.73484 22.0001 6.00006V17.0001C22.0001 17.2653 21.8947 17.5196 21.7072 17.7072C21.5196 17.8947 21.2653 18.0001 21.0001 18.0001H8.94792Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.0001 18.0001V23.0001C10.0001 23.2653 10.1054 23.5196 10.293 23.7072C10.4805 23.8947 10.7348 24.0001 11.0001 24.0001H23.0522L28.0001 28.0001V12.0001C28.0001 11.7348 27.8947 11.4805 27.7072 11.293C27.5196 11.1054 27.2653 11.0001 27.0001 11.0001H22.0001" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default ({ color }) => {
  return <SvgXml xml={xml} stroke={color} width="100%" height="100%" />;
};
